import React, { useState, useEffect } from "react";
import useAuth from "../../../../hooks/useAuth";
import styles from "./Table.module.scss";
import http from "../../../../api/http";
import { useCtx } from "../../../../context";
import { MSG_DEFAULT_ERR } from "../../../../config/constants";
import Loading from "../../../Loading";
import moment from "moment";

const FixedHeaderTable = () => {
  const { setSnackBar } = useCtx();
  const { currentUser } = useAuth();
  const { id } = currentUser;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await http.get(`/users/${id}/investments`, {
          withCredentials: true
        }); // Replace with your API endpoint

        setData(response.data.data); // Assuming the API returns an array of data
      } catch (error) {
        console.error("Error fetching data:", error);
        setSnackBar(MSG_DEFAULT_ERR);
      } finally {
        setLoading(false);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [id, setSnackBar]); // The empty dependency array ensures this effect runs only once on mount

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
    const dateFormat = "MMM D, YYYY";

    if (loading)
      return (
        <tr>
          <td colspan={6}>
            <Loading />
          </td>
        </tr>
      );

    if (!data.length) {
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
        <td>{moment(item?.startDate).format(dateFormat)}</td>
        <td>{moment(item?.endDate).format(dateFormat)}</td>
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
