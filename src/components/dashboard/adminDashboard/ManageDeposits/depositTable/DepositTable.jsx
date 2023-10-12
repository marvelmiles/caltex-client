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

const DepositTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [confirmed, setConfirmed] = useState({});
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
          "/transactions?required[transactionType]=deposit&required[status]=awaiting",
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

  const handleConfirmPayment = async (transId, e) => {
    try {
      const req = await http.patch(`/transactions/${transId}/confirm`, {
        withCredentials: true
      });

      if (req?.status === 200) {
        // Throw a success toast
        setConfirmed(confirmed => ({
          ...confirmed,
          [transId]: true
        }));
      }
    } catch (error) {
      // Throw an error toast
      setSnackBar("Failed to confirm deposit");
    } finally {
      (e.currentTarget || e.target).style.cursor = "default";
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
        const bool = data.status === "confirmed" || confirmed[data.id];
        return (
          <tr key={data?.id}>
            <td>{data?.user?.username}</td>
            <td>{data?.user?.email}</td>
            <td>
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
              <button
                type="button"
                id={bool ? styles.successBtn : styles.btn}
                style={{ cursor: bool ? "default" : "pointer" }}
                onClick={
                  bool
                    ? undefined
                    : e => {
                        e.currentTarget.disabled = true;
                        e.currentTarget.style.cursor = "not-allowed";

                        return handleConfirmPayment(data?.id, e);
                      }
                }
              >
                {bool ? "Successful" : "Confirm Payment"}
              </button>
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
