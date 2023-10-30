import React, { useState, useEffect } from "react";
import styles from "./AdminTable.module.scss";
import http from "../../../../../../api/http";
import leftArrow from "../../../../../../svgs/left-arrow.svg";
import rightArrow from "../../../../../../svgs/right-arrow.svg";
import { MSG_DEFAULT_ERR } from "../../../../../../config/constants";
import { useCtx } from "../../../../../../context";
import Loading from "../../../../../../components/Loading";

const AdminTable = () => {
  const { setSnackBar } = useCtx();
  const [data, setData] = useState([]);
  const [ids, setIds] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  const [loading, setLoading] = useState(true);

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get("/users?admin=true", {
          withCredentials: true
        });
        setData(response.data.data);
      } catch (error) {
        setSnackBar(MSG_DEFAULT_ERR);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setSnackBar]);

  const handleRemoveAdmin = async userId => {
    try {
      setIds(ids => ({ ...ids, [userId]: true }));

      await http.delete(`/users/${userId}`, {
        withCredentials: true
      });

      setData(prevData => prevData.filter(item => item.id !== userId));
    } catch (error) {
      console.error("Error removing admin:", error);
      setSnackBar("Sorry delete operation failed!");
    } finally {
      setIds(ids => {
        delete ids[userId];
        return { ...ids };
      });
    }
  };

  const renderTableHeader = () => {
    return (
      <thead className={styles.table_head}>
        <tr>
          <th id={styles.tableH}>Admin Username</th>
          <th id={styles.tableH}>Email address</th>
          <th id={styles.tableH}>Status</th>
          <th id={styles.tableH}>Manage</th>
        </tr>
      </thead>
    );
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

  const renderTableData = () => {
    return loading ? (
      <tr>
        <td colspan={4}>
          <Loading />
        </td>
      </tr>
    ) : (
      data.slice(startIndex, endIndex).map((item) => (
        <tr key={item.id}>
          <td id={styles.admin_td}>{item.username || item.firstname}</td>
          <td id={styles.admin_td}>{item.email}</td>
          <td id={styles.admin_td}>
            {item.isLogin ? (
              <span style={{ color: "green" }}>Active</span>
            ) : (
              <span style={{ color: "red" }}>Offline</span>
            )}
          </td>
          <td id={styles.admin_td}>
            <button
              disbaled={!!ids[item.id]}
              style={{ cursor: ids[item.id] ? "not-allowed" : "pointer" }}
              type="button"
              onClick={() => handleRemoveAdmin(item.id)}
            >
              Remove Admin
            </button>
          </td>
        </tr>
      ))
    );
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.fixed_header_table}>
        <table>
          {renderTableHeader()}
          <tbody>{renderTableData()}</tbody>
        </table>
      </div>

      <center className={styles.pagination}>
        <button
          type="button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          <img src={leftArrow} height={32} width={32} alt="arrow" />
        </button>

        <p>{currentPage + 1}</p>

        <button
          type="button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pageCount - 1}
        >
          <img src={rightArrow} height={22} width={22} alt="arrow" />
        </button>
      </center>
    </div>
  );
};

export default AdminTable;
