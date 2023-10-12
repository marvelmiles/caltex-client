import React, { useState, useEffect } from "react";
import useAuth from "../../../../hooks/useAuth";
import styles from "./Table.module.scss";
import http from "../../../../api/http";

const FixedHeaderTable = () => {
  const { currentUser } = useAuth();
  const { id } = currentUser;
  const [data, setData] = useState([]);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await http.get(`/users/${id}/investments`, {
          withCredentials: true
        }); // Replace with your API endpoint
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
  // replace fakeData with data from the API
  const renderTableData = () => {
    if (!Array.isArray(data)) {
      // Handle the case when data is not an array
      return (
        <tr>
          <td colSpan="6">No data available</td>
        </tr>
      );
    }
    return data.map(item => (
      <tr key={item?.id}>
        <td>{item?.plan}</td>
        <td>{item?.amount}</td>
        <td>{item?.roi}</td>
        <td>{item?.roiPct}</td>
        <td>{item?.startDate}</td>
        <td>{item?.endDate}</td>
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
