import React, { useState, useEffect } from "react";
import styles from "./WithdrawalTable.module.scss";
import http from "../../../../../api/http";
import leftArrow from "../../../../../svgs/left-arrow.svg";
import rightArrow from "../../../../../svgs/right-arrow.svg";
import { useCtx } from "../../../../../context";
import Loading from "../../../../Loading";
import { MSG_DEFAULT_ERR } from "../../../../../config/constants";
import { formatToDecimalPlace } from "../../../../../utils/normalizers";

const WithdrawalTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 10; // Adjust the number of items per page as needed

  const { setSnackBar } = useCtx();

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await http.get(
          "/transactions?required[transactionType]=withdrawal&required[status]=awaiting",
          { withCredentials: true }
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(MSG_DEFAULT_ERR);
      } finally {
        setLoading(false);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []); // The empty dependency array ensures this effect runs only once on mount

  const handleConfirmWithdrawal = async (transId, e) => {
    const node = e.currentTarget || e.target;
    try {
      node.disabled = true;
      node.style.cursor = "not-allowed";

      const req = await http.patch(
        `/transactions/${transId}/confirm`,
        {},
        { withCredentials: true }
      );

      if (req.status === 200) {
        setData(data => data.filter(tran => tran.id !== transId));

        setSnackBar({
          message: req.message,
          severity: "success"
        });
      }
    } catch (error) {
      // Throw a failure Toast
      node.disabled = false;
      node.style.cursor = "pointer";
      setSnackBar(error.message);
    } finally {
    }
  };

  const renderTableHeader = () => {
    return (
      <thead className={styles.table_head}>
        <tr>
          <th id={styles.tableW}>User Full Name</th>
          <th id={styles.tableW}>Email address</th>
          <th id={styles.tableW}>Wallet Address</th>
          <th id={styles.tableW}>Amount Requested</th>
          <th id={styles.tableW}>Payment Method</th>
          <th id={styles.tableW}>Status</th>
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
        <td colspan={5}>
          <Loading />
        </td>
      </tr>
    ) : (
      data.slice(startIndex, endIndex).map(item => (
        <tr key={item.id}>
          <td>{item.user.username}</td>
          <td>{item.user.email}</td>
          <td>{item.walletAddress}</td>
          <td>{formatToDecimalPlace(item.amount, true)}</td>
          <td>{item.currency}</td>
          <td>{item.status}</td>
          <td>
            <button
              type="button"
              id={styles.btn}
              onClick={e => {
                handleConfirmWithdrawal(item.id, e);
              }}
            >
              Confirm Withdrawal
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

export default WithdrawalTable;
