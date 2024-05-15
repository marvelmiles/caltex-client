import { useState, useEffect, useCallback } from "react";
import useAuth from "../../../../hooks/useAuth";
import styles from "./HistoryTable.module.scss";
import http from "../../../../api/http";
import { useCtx } from "../../../../context";
import {
  MSG_DEFAULT_ERR,
  currencySymbols,
  DATE_FORMAT_TRANS_HIS,
} from "../../../../config/constants";
import Loading from "../../../Loading";
import { Link } from "react-router-dom";
import { formatToDecimalPlace } from "../../../../utils/normalizers";
import moment from "moment";
import useMediaQuery from "../../../../hooks/useMediaQuery";

const HistoryTable = ({ date, transactionType, status, paymentType }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

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
      const {
        transactionType = "",
        status = "",
        paymentType = "",
        date,
      } = config;

      try {
        setLoading(true);

        const response = await http.get(
          `/users/${id}/transactions?transactionType=${transactionType}&paymentType=${paymentType}&status=${status}&lteDate=${date}`,
          {
            withCredentials: true,
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
    fetchData({ date, paymentType, status, transactionType });
  }, [fetchData, paymentType, status, transactionType, date]);

  const renderTableHeader = () => {
    return (
      <thead className={styles.table_head}>
        <tr>
          <th id={styles.tableI}>
            {isMobile ? "Currency /Network" : "Currency/Network"}
          </th>
          <th id={styles.tableI}>Amount Invested</th>
          <th id={styles.tableI}>Payment type</th>
          <th id={styles.tableI}>Transaction type</th>
          <th id={styles.tableI}>Wallet</th>
          <th id={styles.tableI}>Transaction date</th>
          <th id={styles.tableI}>Status</th>
          <th id={styles.tableI}>File</th>
        </tr>
      </thead>
    );
  };

  const renderTableData = (arr = []) => {
    if (loading)
      return (
        <tr>
          <td colSpan={8}>
            <Loading />
          </td>
        </tr>
      );

    if (!arr.length) {
      return (
        <tr>
          <td colSpan="8">No data available</td>
        </tr>
      );
    }
    return arr.map((item, i) => {
      const sep = "----";

      const cur = item.localPayment?.currency || "";

      return (
        <tr key={i}>
          <td id={styles.table_data}>{item.currency}</td>
          <td id={styles.table_data}>
            {currencySymbols[cur.toUpperCase()] +
              formatToDecimalPlace(item.amount, true)}
          </td>
          <td id={styles.table_data}>{item.paymentType}</td>
          <td id={styles.table_data}>{item.transactionType || sep}</td>
          <td
            id={styles.table_data}
            style={{
              maxWidth: "200px",
              overflow: "auto",
            }}
          >
            {item.walletAddress || sep}
          </td>
          <td id={styles.table_data}>
            {moment(item.createdAt).format(DATE_FORMAT_TRANS_HIS)}
          </td>
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
  };

  return (
    <>
      <div
        className={styles.fixed_header_table}
        style={{
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <table>
          {renderTableHeader()}
          {!seeless && <tbody>{renderTableData(data.slice(0, 3))}</tbody>}
          {seemore && <tbody>{renderTableData(data)}</tbody>}
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
