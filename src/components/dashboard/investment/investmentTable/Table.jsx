import React, { useState, useEffect } from "react";
import useAuth from "../../../../hooks/useAuth";
import http from "../../../../api/http";
import { useCtx } from "../../../../context";
import {
  MSG_DEFAULT_ERR,
  DATE_FORMAT_TRANS_HIS
} from "../../../../config/constants";
import Loading from "../../../Loading";
import moment from "moment";
import styles from "./Table.module.scss";

const FixedHeaderTable = () => {
  const { setSnackBar } = useCtx();
  const { currentUser } = useAuth();
  const { id } = currentUser;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seemore, setSeemore] = useState(false);
  const [seeless, setSeeless] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get(`/users/${id}/investments`, {
          withCredentials: true
        });

        const updatedData = response.data.data.map(item => {
          const referrals = item.user.referrals
            ? item.user.referrals.length
            : 0;

          const baseROI = item.amount * 0.025;

          let referralBonus = 0;
          if (referrals >= 1) {
            referralBonus += item.amount * 0.15; // 15% for the first person
          }
          if (referrals >= 2) {
            referralBonus += item.amount * 0.1; // 10% for the second person
          }
          if (referrals >= 3) {
            referralBonus += item.amount * 0.07; // 7% for the third person
          }

          const updatedROI = baseROI + referralBonus;

          return { ...item, roi: updatedROI };
        });

        setData(updatedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setSnackBar(MSG_DEFAULT_ERR);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, setSnackBar]);

  const handleSeemore = () => {
    setSeemore(!seemore);
  };

  const handleSeeless = () => {
    setSeeless(seeless);
    setSeemore(!seemore);
  };

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
    if (loading)
      return (
        <tr>
          <td colSpan={6}>
            <Loading />
          </td>
        </tr>
      );

    if (!data.length) {
      return (
        <tr>
          <td colSpan="6">No data available</td>
        </tr>
      );
    }
    return data.slice(0, 1).map(item => (
      <tr key={item.id}>
        <td id={styles.table_data}>{item.plan}</td>
        <td id={styles.table_data}>{item.amount}</td>
        <td id={styles.table_data}>{item.roi}</td>
        <td id={styles.table_data}>{item.amount + item.roi}</td>
        <td id={styles.table_data}>
          {moment(item.startDate).format(DATE_FORMAT_TRANS_HIS)}
        </td>
        <td id={styles.table_data}>
          {moment(item.endDate).format(DATE_FORMAT_TRANS_HIS)}
        </td>
      </tr>
    ));
  };

  const renderTableData2 = () => {
    if (loading)
      return (
        <tr>
          <td colSpan={6}>
            <Loading />
          </td>
        </tr>
      );

    if (!data.length) {
      return (
        <tr>
          <td colSpan="6">No data available</td>
        </tr>
      );
    }
    return data.map(item => (
      <tr key={item?.id}>
        <td id={styles.table_data}>{item?.plan}</td>
        <td id={styles.table_data}>{item?.amount}</td>
        <td id={styles.table_data}>{item?.roi}</td>
        <td id={styles.table_data}>{item?.roiPct}</td>
        <td id={styles.table_data}>
          {moment(item?.startDate).format(DATE_FORMAT_TRANS_HIS)}
        </td>
        <td id={styles.table_data}>
          {moment(item?.endDate).format(DATE_FORMAT_TRANS_HIS)}
        </td>
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

export default FixedHeaderTable;
