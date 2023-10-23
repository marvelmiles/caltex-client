import React, { useState, useRef } from "react";
import styles from "./Investment.module.scss";
import arrow from "../../../svgs/arrow-drop.svg";
import FixedHeaderTable from "./investmentTable/Table";
import HistoryTable from "./historyTable/HistoryTable";
import Layout from "../../Layout";
import { Box, Stack, IconButton } from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai";

const Investment = () => {
  
  const today = new Date();

  const yr = today.getFullYear();
  const mth = today.getMonth();
  const day = today.getDate();

  const [trans, setTrans] = useState(false);
  const [trans1, setTrans1] = useState(false);
  const [trans2, setTrans2] = useState(false);
  const [transType, setTransType] = useState("");
  const [status, setStatus] = useState("");
  const [paymentType, setPaymentType] = useState("");

  const [date, setDate] = useState(
    Date.UTC(
      yr,
      mth,
      day,
      today.getHours(),
      today.getMinutes(),
      today.getSeconds(),
      today.getMilliseconds()
    )
  );

  const dateRef = useRef();

  const handleTransType = e => {
    const { type, status, paymentType } = e.target.dataset;

    if (typeof type === "string") {
      setTransType(type);
      setTrans(false);
    }

    if (typeof status === "string") {
      setStatus(status);
      setTrans1(false);
    }

    if (typeof paymentType === "string") {
      setPaymentType(paymentType);
      setTrans2(false);
    }
  };

  const handleDateSelection = e => {
    const [yr, mth, day] = dateRef.current.value.split("-");

    const today = new Date();

    const date = Date.UTC(
      yr,
      mth,
      day,
      today.getHours(),
      today.getMinutes(),
      today.getSeconds(),
      today.getMilliseconds()
    );

    date && setDate(date);
  };

  return (
    <Layout>
      <div class={styles.main_cont}>
        <p id={styles.p_text}>My Investment</p>
        <FixedHeaderTable />

        <p id={styles.p_note}>
          Note: Your Return on Investment and capital will be added
          automatically to your dashboard balance once your investment is
          matured
        </p>
        <div className={styles.trans_history_main}>
          <h2>Transaction History</h2>
          <ul className={styles.date_cont}>
            <Stack
              sx={{
                flexWrap: {
                  // xs: "wrap-reverse",
                  // sm: "nowrap"
                }
              }}
            >
              <input
                type="date"
                className={styles.date_input}
                ref={dateRef}
                defaultValue={`${yr}-${mth.toString().padStart(2, "0")}-${day}`}
              />

              <IconButton
                onClick={handleDateSelection}
                sx={{
                  backgroundColor: "rgba(215, 215, 215, 0.2)"
                }}
              >
                <AiOutlineSearch style={{ fontSize: "20px" }} />
              </IconButton>
            </Stack>

            <li onClick={() => setTrans(!trans)}>
              <Box
                component="span"
                sx={{
                  "&::first-letter": {
                    textTransform: "uppercase"
                  }
                }}
              >
                {transType || "All"} type
              </Box>
              <span>
                <img src={arrow} height={10} width={10} alt="arrow" />
              </span>
            </li>
            <li onClick={() => setTrans1(!trans1)}>
              <Box
                component="span"
                sx={{
                  "&::first-letter": {
                    textTransform: "uppercase"
                  }
                }}
              >
                {status || "All"} status
              </Box>
              <span>
                <img src={arrow} height={10} width={10} alt="arrow" />
              </span>
            </li>
            <li>
              <Box
                component="span"
                sx={{
                  "&::first-letter": {
                    textTransform: "uppercase"
                  }
                }}
              >
                {paymentType || "Crypto"} payments
              </Box>
              {/* <span>
                <img src={arrow} height={10} width={10} alt="arrow" />
              </span> */}
            </li>
          </ul>
          {trans && (
            <ul
              className={styles.tans_ul}
              onMouseLeave={() => setTrans(!trans)}
            >
              <li data-type="" onClick={handleTransType}>
                All transaction
              </li>
              <li data-type="deposit" onClick={handleTransType}>
                Deposit
              </li>
              <li data-type="withdrawal" onClick={handleTransType}>
                Withdrawal
              </li>
            </ul>
          )}
          {trans1 && (
            <ul
              className={styles.tans_ul}
              id={styles.tans_ul2}
              onMouseLeave={() => setTrans1(!trans1)}
            >
              <li data-status="" onClick={handleTransType}>
                All status
              </li>
              <li data-status="awaiting" onClick={handleTransType}>
                Awaiting
              </li>
              <li data-status="confirmed" onClick={handleTransType}>
                Confirmed
              </li>
              <li data-status="rejected" onClick={handleTransType}>
                Rejected
              </li>
            </ul>
          )}
          {trans2 && (
            <ul
              className={styles.tans_ul}
              id={styles.tans_ul3}
              onMouseLeave={() => setTrans2(!trans2)}
            >
              <li data-payment-type="" onClick={handleTransType}>
                All
              </li>
              <li data-payment-type="crypto" onClick={handleTransType}>
                Crypto currency
              </li>
              <li data-payment-type="fiat" onClick={handleTransType}>
                Fiat currency
              </li>
            </ul>
          )}
          <HistoryTable
            date={date}
            status={status}
            paymentType={paymentType}
            transactionType={transType}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Investment;
