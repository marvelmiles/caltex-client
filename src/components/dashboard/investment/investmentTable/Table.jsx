import React, { useState, useEffect } from "react";
import axios from "axios";
import fakeData from "../fakeData";
import styles from "./Table.module.scss";

const FixedHeaderTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.example.com/data"); // Replace with your API endpoint
        setData(response.data); // Assuming the API returns an array of data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []); // The empty dependency array ensures this effect runs only once on mount

  const renderTableHeader = () => {
    return (
      <thead className={styles.table}>
        <tr>
          <th>PLAN</th>
          <th>Amount Invested</th>
          <th>Return Of Investment</th>
          <th>ROI+Capital</th>
          <th>Date Of Investment</th>
          <th>Investment Last Till</th>
        </tr>
      </thead>
    );
  };

  const renderTableData = () => {
    return fakeData.map((item) => (
      <tr key={item.id}>
        <td>{item.column1}</td>
        <td>{item.column2}</td>
        <td>{item.column3}</td>
        <td>{item.column4}</td>
        <td>{item.column5}</td>
        <td>{item.column6}</td>
      </tr>
    ));
  };

  return (
    <div className="fixed-header-table">
      <table>
        {renderTableHeader()}
        <tbody>{renderTableData()}</tbody>
      </table>
    </div>
  );
};

export default FixedHeaderTable;
