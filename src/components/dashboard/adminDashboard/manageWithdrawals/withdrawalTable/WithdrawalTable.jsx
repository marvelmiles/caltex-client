import React, { useState, useEffect } from "react";
import styles from "./WithdrawalTable.module.scss";
import http from "../../../../../api/http";
import leftArrow from "../../../../../svgs/left-arrow.svg";
import rightArrow from "../../../../../svgs/right-arrow.svg";
import { useCtx } from "../../../../../context";

const WithdrawalTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Adjust the number of items per page as needed

  const { setSnackBar } = useCtx();

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await http.get(
          "https://caltex-api.onrender.com/api/transactions?required[transactionType]=withdrawal&required[status]=awaiting",
          { withCredentials: true }
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
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
        `https://caltex-api.onrender.com/api/transactions/${transId}/confirm`,
        {},
        { withCredentials: true }
      );
      if (req.status === 200) {
        setData(data => data.filter(tran => tran.id !== transId));
        setSnackBar(req.data.message);
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
          <th>User Full Name</th>
          <th>Email address</th>
          <th>Amount Requested</th>
          <th>Payment Method</th>
          <th>Status</th>
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
    return data.slice(startIndex, endIndex).map(item => (
      <tr key={item.id}>
        <td>{item.user.username}</td>
        <td>{item.user.email}</td>
        <td>{item.amount}</td>
        <td>{item.paymentType}</td>
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
    ));
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
