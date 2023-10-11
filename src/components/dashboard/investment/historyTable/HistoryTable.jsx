import React, { useState, useEffect } from "react";
import useAuth from "../../../../hooks/useAuth";
import styles from "./HistoryTable.module.scss";
import http from "../../../../api/http";

const HistoryTable = () => {
  const { currentUser } = useAuth();

  const { id } = currentUser;

  const [data, setData] = useState([]);
  const [seemore, setSeemore] = useState(false);
  const [seeless, setSeeless] = useState(false);

  const handleSeemore = () => {
    setSeemore(!seemore);
  };

  const handleSeeless = () => {
    setSeeless(seeless);
    setSeemore(!seemore);
  };

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await http.get(
          `https://caltex-api.onrender.com/api/users/${id}/investments`,
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
          <th id={styles.tableI}>PLAN</th>
          <th id={styles.tableI}>Amount Invested</th>
          <th id={styles.tableI}>Return Of Investment</th>
          <th id={styles.tableI}>ROI+Capital</th>
          <th id={styles.tableI}>Date Of Investment</th>
          <th id={styles.tableI}>Matured Date</th>
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
    return data.slice(0, 1).map((item) => (
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
  // replace fakeData with data from the API
  const renderTableData2 = () => {
    if (!Array.isArray(data)) {
    // Handle the case when data is not an array
    return (
      <tr>
        <td colSpan="6">No data available</td>
      </tr>
    );
  }
    return data.map((item) => (
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
    <>
      <div className={styles.fixed_header_table}>
        <table>
          {renderTableHeader()}
          {!seeless && <tbody>{renderTableData()}</tbody>}
          {seemore && <tbody>{renderTableData2()}</tbody>}
        </table>
      </div>
      <span
        id={styles.see_more}
        className={seemore ? styles.hide : ""}
        onClick={handleSeemore}
      >
        View More
      </span>
      <span
        id={styles.see_less}
        className={!seemore ? styles.hide : ""}
        onClick={handleSeeless}
      >
        View less
      </span>
    </>
  );
};

export default HistoryTable;
