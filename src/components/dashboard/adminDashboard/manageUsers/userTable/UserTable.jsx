import React, { useState, useEffect } from "react";
import styles from "./UserTable.module.scss";
import http from "../../../../../api/http";
import { useNavigate } from "react-router-dom";
import leftArrow from "../../../../../svgs/left-arrow.svg";
import rightArrow from "../../../../../svgs/right-arrow.svg";
import { MSG_DEFAULT_ERR } from "../../../../../config/constants";
import { useCtx } from "../../../../../context";
import Loading from "../../../../../components/Loading";

const UserTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10; // Adjust the number of items per page as needed
  const navigate = useNavigate();

  const { setSnackBar } = useCtx();

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await http.get("/users/", { withCredentials: true });
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setSnackBar(MSG_DEFAULT_ERR);
      } finally {
        setLoading(false);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [setSnackBar]); // The empty dependency array ensures this effect runs only once on mount

  const handleManageUser = previewUser => {
    navigate(`/userInformation/UserInformation/${previewUser.id}`, {
      state: { previewUser }
    });
  };

  const renderTableHeader = () => {
    return (
      <thead className={styles.table_head}>
        <tr>
          <th id={styles.tableU}>User Full Name</th>
          <th id={styles.tableU}>Email address</th>
          <th id={styles.tableU}>Status</th>
          <th id={styles.tableU}>Manage</th>
        </tr>
      </thead>
    );
  };

  // Calculate the start and end index based on the current page
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
      data.slice(startIndex, endIndex).map(item => (
        <tr key={item.id}>
          <td>{item.username}</td>
          <td>{item.email}</td>
          <td>
            {item.isLogin ? (
              <span style={{ color: "green" }}>Active</span>
            ) : (
              <span style={{ color: "red" }}>Offline</span>
            )}
          </td>
          <td>
            <button type="button" onClick={() => handleManageUser(item)}>
              Manage
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
          <img src={leftArrow} height={32} width={32} alt="arrow" />{" "}
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

export default UserTable;
