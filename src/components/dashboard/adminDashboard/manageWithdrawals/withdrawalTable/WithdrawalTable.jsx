import React, { useState, useEffect } from "react";
import styles from "./WithdrawalTable.module.scss";
import http from "../../../../../api/http";
import leftArrow from "../../../../../svgs/left-arrow.svg";
import rightArrow from "../../../../../svgs/right-arrow.svg";

const WithdrawalTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Adjust the number of items per page as needed
  const url =
    "https://caltex-api.onrender.com/api/transactions/request-withdrawal";

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await http.get(
          "https://caltex-api.onrender.com/api/users/",
          { withCredentials: true }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []); // The empty dependency array ensures this effect runs only once on mount

  const handleConfirmWithdrawal = async () => {
    try {
      const req = await http.post(url, { withCredentials: true });
      if (req.status === 200) {
        // Throw a success toast
      }
    } catch (error) {
      // Throw a failure Toast
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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderTableData = () => {
    return data.slice(startIndex, endIndex).map((item) => (
      <tr key={item.id}>
        <td>{item.username}</td>
        <td>{item.email}</td>
        <td>{item.amount}</td>
        <td>{item.paymentType}</td>
        <td>{item.status}</td>
        <td>
          <button
            type="button"
            id={styles.btn}
            onClick={handleConfirmWithdrawal}
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
