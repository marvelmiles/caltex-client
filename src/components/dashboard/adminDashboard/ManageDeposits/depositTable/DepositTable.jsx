import React, { useState, useEffect } from "react";
import styles from "./DepositTable.module.scss";
import http from "../../../../../api/http";
import leftArrow from "../../../../../svgs/left-arrow.svg";
import rightArrow from "../../../../../svgs/right-arrow.svg";
import imageIcon from "../../../../../svgs/image-icon.svg";
import SuccessModal from "../../../../successModal/SuccessModal";
import { useCtx } from "../../../../../context";
import { MSG_DEFAULT_ERR } from "../../../../../config/constants";
import Loading from "../../../../Loading";
import { formatToDecimalPlace } from "../../../../../utils/normalizers";
import { Stack, Button, Typography } from "@mui/material";

const DepositTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [processing, setProcessing] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");
  const itemsPerPage = 10; // Adjust the number of items per page as needed

  const [loading, setLoading] = useState(true);

  const { setSnackBar } = useCtx();

  useEffect(() => {
    // Function to fetch data from the API
    // This assumes that the users sent to this endpoint are those with pending deposits.
    const fetchData = async () => {
      try {
        const response = await http.get(
          "/transactions?required[transactionType]=deposit",
          { withCredentials: true }
        );

        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setSnackBar(MSG_DEFAULT_ERR);
      } finally {
        setLoading(false);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [setSnackBar]); // The empty dependency array ensures this effect runs only once on mount

  const updateTransStatus = async (transId, reason) => {
    try {
      setProcessing(processing => ({
        ...processing,
        [transId]: true
      }));

      const res = await http.patch(`/transactions/${transId}/${reason}`, {
        withCredentials: true
      });

      if (!res.success) throw res;

      setData(data =>
        data.map(item => (item.id === transId ? res.data : item))
      );
    } catch (error) {
      setSnackBar(`Failed to ${reason} deposit`);
    } finally {
      setProcessing(processing => {
        delete processing[transId];

        return {
          ...processing
        };
      });
    }
  };

  const handleViewProof = imageUrl => {
    setModalImageUrl(imageUrl);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setModalImageUrl("");
  };

  const renderTableHeader = () => {
    return (
      <thead className={styles.table_head}>
        <tr>
          <th id={styles.tableD}>User Full Name</th>
          <th id={styles.tableD}>Email address</th>
          <th id={styles.tableD}>Amount</th>
          <th id={styles.tableD}>Payment Proof</th>
          <th id={styles.tableD}>Action</th>
        </tr>
      </thead>
    );
  };

  // Calculate the start and end index based on the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

  const renderTableData = () => {
    return loading ? (
      <tr>
        <td colspan={5}>
          <Loading />
        </td>
      </tr>
    ) : (
      data.slice(startIndex, endIndex).map(data => {
        const hasProced = data.status !== "awaiting";
        const isProc = processing[data.id];

        const actionSx = {
          cursor: isProc ? "not-allowed" : hasProced ? "default" : "pointer",
          padding: "8px 15px",
          width: "auto"
        };

        return (
          <tr key={data?.id}>
            <td>{`${data.user?.firstname} ${data.user?.lastname}`}</td>
            <td>{data?.user?.email}</td>
            <td style={{ color: "#000" }}>
              {
                { usd: "$", eur: "€" }[
                  data.localPayment?.currency?.toLowerCase?.()
                ]
              }
              {formatToDecimalPlace(data?.amount, true)}
            </td>
            <td id={styles.td}>
              <img
                src={imageIcon}
                alt="Payment Proof"
                style={{ cursor: "pointer", borderRadius: "5px" }}
              />
              <span onClick={() => handleViewProof(data?.paymentProofUrl)}>
                View
              </span>
            </td>
            <td>
              {hasProced ? (
                <Typography
                  sx={{
                    "&::first-letter": {
                      textTransform: "uppercase"
                    }
                  }}
                >
                  {data.status}
                </Typography>
              ) : (
                <Stack justifyContent="normal">
                  <Button
                    type="button"
                    color={"secondary"}
                    variant={"contained"}
                    sx={actionSx}
                    disabled={isProc}
                    onClick={() => updateTransStatus(data.id, "confirm")}
                  >
                    Confirm
                  </Button>

                  {hasProced ? null : (
                    <Button
                      type="button"
                      color="error"
                      variant="contained"
                      sx={actionSx}
                      disabled={isProc}
                      onClick={() => updateTransStatus(data.id, "reject")}
                    >
                      Reject
                    </Button>
                  )}
                </Stack>
              )}
            </td>
          </tr>
        );
      })
    );
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

      {modalIsOpen && (
        <SuccessModal
          closeModal={handleCloseModal}
          icon={modalImageUrl}
          Styles={styles.modal_btn}
          message={modalImageUrl ? "" : "No Image to display"}
          btnText="X"
        />
      )}
    </div>
  );
};

export default DepositTable;
