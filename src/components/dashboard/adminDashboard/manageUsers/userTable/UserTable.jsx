import React, { useState, useEffect } from "react";
import fakeData from "../fakeData";
import useAuth from "../../../../../hooks/useAuth";
import styles from "./UserTable.module.scss";
import http from "../../../../../api/http";

const UserTable = () => {
  const { currentUser } = useAuth();

  const { id } = currentUser;

  const [data, setData] = useState([]);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await http.get(
          `https://caltex-api.onrender.com/api/users/${id}`,
          { withCredentials: true }
        ); // Replace with your API endpoint
        setData(response.data); // Assuming the API returns an array of data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [data, id]); // The empty dependency array ensures this effect runs only once on mount

  const renderTableHeader = () => {
    return (
      <thead className={styles.table_head}>
        <tr>
          <th>User Full Name</th>
          <th>Email address</th>
          <th>Status</th>
          <th>
          Manage
          </th>
        </tr>
      </thead>
    );
  };
  // replace fakeData with data from the API
  const renderTableData = () => {
    return fakeData.map((item) => (
      <tr key={item.id}>
        <td>{item.username}</td>
        <td>{item.email}</td>
        <td>{item.status}</td>
        <td>
          <button type="button">Manage</button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <div className={styles.fixed_header_table}>
        <table>
          {renderTableHeader()}
          {renderTableData()}
        </table>
      </div>
    </>
  );
};

export default UserTable;
