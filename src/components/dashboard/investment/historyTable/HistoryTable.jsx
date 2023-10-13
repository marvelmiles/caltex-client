import React, { useState, useEffect, useCallback } from "react";
import useAuth from "../../../../hooks/useAuth";
import styles from "./HistoryTable.module.scss";
import http from "../../../../api/http";
import { useCtx } from "../../../../context";
import { MSG_DEFAULT_ERR } from "../../../../config/constants";
import Loading from "../../../Loading";
import { Link } from "react-router-dom";

const HistoryTable = ({ transactionType, status, tradeType }) => {
  const { setSnackBar } = useCtx();

  const { currentUser } = useAuth();

  const { id } = currentUser;

  const [data, setData] = useState([]);
  const [seemore, setSeemore] = useState(false);
  const [seeless, setSeeless] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleSeemore = () => {
    setSeemore(!seemore);
  };

  const handleSeeless = () => {
    setSeeless(seeless);
    setSeemore(!seemore);
  };

  const fetchData = useCallback(
    async (config = {}) => {
      const { transactionType = "", status = "", tradeType = "" } = config;

      try {
        setLoading(true);

        const response = await http.get(
          `/users/${id}/transactions?transactionType=${transactionType}&tradeType=${tradeType}&status=${status}`,
          {
            withCredentials: true
          }
        );

        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setSnackBar(MSG_DEFAULT_ERR);
      } finally {
        setLoading(false);
      }
    },
    [id, setSnackBar]
  );

  useEffect(() => {
    fetchData({ tradeType, status, transactionType });
  }, [fetchData, tradeType, status, transactionType]);

  const renderTableHeader = () => {
    return (
      <thead className={styles.table_head}>
        <tr>
          <th id={styles.tableI}>Currency/Network</th>
          <th id={styles.tableI}>Amount Invested</th>
          <th id={styles.tableI}>Payment type</th>
          <th id={styles.tableI}>Transaction type</th>
          <th id={styles.tableI}>Wallet</th>
          <th id={styles.tableI}>Local currency</th>
          <th id={styles.tableI}>Status</th>
          <th id={styles.tableI}>File</th>
        </tr>
      </thead>
    );
  };

  const renderData = data =>
    data.map((item, i) => {
      const sep = "----";

      return (
        <tr key={i}>
          <td id={styles.table_data}>{item.currency}</td>
          <td id={styles.table_data}>{item.amount}</td>
          <td id={styles.table_data}>{item.paymentType}</td>
          <td id={styles.table_data}>{item.transactionType || sep}</td>
          <td id={styles.table_data}>{item.walletAddress || sep}</td>
          <td id={styles.table_data}>{item.localPayment?.currency || sep}</td>
          <td id={styles.table_data}>{item.status}</td>
          <td id={styles.table_data}>
            {item.paymentProofUrl ? (
              <Link
                to={item.paymentProofUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View file
              </Link>
            ) : (
              "----"
            )}
          </td>
        </tr>
      );
    });

  const renderTableData = () => {
    if (loading)
      return (
        <tr>
          <td colspan={8}>
            <Loading />
          </td>
        </tr>
      );

    if (!data.length) {
      return (
        <tr>
          <td colSpan="8">No data available</td>
        </tr>
      );
    }
    return renderData(data.slice(0, 1));
  };

  const renderTableData2 = () => {
    if (!data.length) {
      return (
        <tr>
          <td colSpan="6">No data available</td>
        </tr>
      );
    }
    return renderData(data);
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
