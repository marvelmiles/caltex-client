import React, { useState, useEffect } from "react";
import styles from "./DepositTable.module.scss";
import http from "../../../../../api/http";
import leftArrow from "../../../../../svgs/left-arrow.svg";
import rightArrow from "../../../../../svgs/right-arrow.svg";

const DepositTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [confirmed, setConfirmed] = useState({});
  const itemsPerPage = 5; // Adjust the number of items per page as needed

  useEffect(() => {
    // Function to fetch data from the API
    // This assumes that the users sent to this endpoint are those with pending deposits.
    const fetchData = async () => {
      try {
        const response = await http.get(
          "https://caltex-api.onrender.com/api/transactions?required[transactionType]=deposit&required[status]=awaiting",
          { withCredentials: true }
        );

        console.log(response, "...res");

        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []); // The empty dependency array ensures this effect runs only once on mount

  const handleConfirmPayment = async (transId, e) => {
    try {
      const req = await http.patch(
        `https://caltex-api.onrender.com/api/transactions/${transId}/confirm`,
        { withCredentials: true }
      );

      if (req?.status === 200) {
        // Throw a success toast
        setConfirmed(confirmed => ({
          ...confirmed,
          [transId]: true
        }));
      }
    } catch (error) {
      // Throw an error toast
    } finally {
      (e.currentTarget || e.target).style.cursor = "default";
    }
  };

  const renderTableHeader = () => {
    return (
      <thead className={styles.table_head}>
        <tr>
          <th>User Full Name</th>
          <th>Email address</th>
          <th>Amount</th>
          <th>Payment Method</th>
          <th>Action</th>
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
    return data.slice(startIndex, endIndex).map(data => {
      const bool = data.status === "confirmed" || confirmed[data.id];
      return (
        <tr key={data?.id}>
          <td>{data?.user?.username}</td>
          <td>{data?.user?.email}</td>
          <td>{data?.amount}</td>
          <td>{data?.paymentType}</td>
          <td>
            <button
              type="button"
              id={bool ? styles.successBtn : styles.btn}
              style={{ cursor: bool ? "default" : "pointer" }}
              onClick={
                bool
                  ? undefined
                  : e => {
                      e.currentTarget.disabled = true;
                      e.currentTarget.style.cursor = "not-allowed";

                      return handleConfirmPayment(data?.id, e);
                    }
              }
            >
              {bool ? "Successful" : "Confirm Payment"}
            </button>
          </td>
        </tr>
      );
    });
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

export default DepositTable;
