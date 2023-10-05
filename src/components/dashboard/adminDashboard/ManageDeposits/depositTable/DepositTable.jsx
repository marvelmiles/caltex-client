import React, { useState, useEffect } from "react";
import useAuth from "../../../../../hooks/useAuth";
import styles from "./DepositTable.module.scss";
import http from "../../../../../api/http";
import { useNavigate } from "react-router-dom";
import leftArrow from "../../../../../svgs/left-arrow.svg";
import rightArrow from "../../../../../svgs/right-arrow.svg";
import fakeData from "./fakeData";
import { pendingDeposit } from "../../../../../config/fakeApi";

const DepositTable = () => {
  const { currentUser } = useAuth();
  const { id } = currentUser;
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Adjust the number of items per page as needed
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch data from the API
    // This assumes that the users sent to this endpoint are those with pending deposits.
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

  const handleConfirmPayment = async (userID) => {
    //caltex-api.onrender.com/api/transactions/651f0079b69491be50723071/confirm.
    try {
      const req = await http.post(
        `https://caltex-api.onrender.com/api/transactions/${userID}/confirm`,
        { withCredentials: true }
      );
    } catch (error) {
      
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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  console.log(data);

  const renderTableData = () => {
    // return data.slice(startIndex, endIndex).map((item) => (
    return pendingDeposit.slice(startIndex, endIndex).map(({data}) => (
      <tr key={data?.id}>
        <td>{data?.user?.username}</td>
        <td>{data?.user?.email}</td>
        <td>{data?.amount}</td>
        <td>{data?.paymentType}</td>
        <td>
          <button type="button" onClick={() => handleConfirmPayment(data?.id)}>
            Confirm Payment
          </button>
        </td>
      </tr>
    ));

    // return fakeData.map((item) => (
    //   <tr key={item.id}>
    //     <td>{item.username}</td>
    //     <td>{item.email}</td>
    //     <td>{item.amount}</td>
    //     <td>{item.paymentMethod}</td>
    //     <td>
    //       <button type="button" id={styles.btn} onClick={handleConfirmPayment}>
    //         Confirm Payment
    //       </button>
    //     </td>
    //   </tr>
    // ));
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
