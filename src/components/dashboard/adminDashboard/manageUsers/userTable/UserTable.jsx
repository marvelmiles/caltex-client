import React, { useState, useEffect } from "react";
import styles from "./UserTable.module.scss";
import http from "../../../../../api/http";
import { useNavigate } from "react-router-dom";
import leftArrow from "../../../../../svgs/left-arrow.svg";
import rightArrow from "../../../../../svgs/right-arrow.svg";
import { MSG_DEFAULT_ERR } from "../../../../../config/constants";
import { useCtx } from "../../../../../context";
import Loading from "../../../../../components/Loading";
import SuccessModal from "../../../../successModal/SuccessModal";
import { Stack, Button, Typography } from "@mui/material";

const UserTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");
  const itemsPerPage = 10; // Adjust the number of items per page as needed
  const navigate = useNavigate();

  const { setSnackBar } = useCtx();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get("/users/", { withCredentials: true });
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setSnackBar(MSG_DEFAULT_ERR);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setSnackBar]);

  const updateUserStatus = async (userId, reason, kycType) => {
    try {
      setProcessing((processing) => ({
        ...processing,
        [userId]: true,
      }));

      const res = await http.patch(
        `/users/${userId}/kyc/${reason}?kycType=${kycType}`,
        null,
        {
          withCredentials: true,
        }
      );

      if (!res.success) throw res;

      setData((data) =>
        data.map((item) => (item.id === userId ? res.data : item))
      );
    } catch (error) {
      setSnackBar(`Failed to ${reason} KYC`);
    } finally {
      setProcessing((processing) => {
        delete processing[userId];

        return {
          ...processing,
        };
      });
    }
  };

  const handleViewProof = (kycDocs) => {
    const documentTypes = Object.keys(kycDocs);
    documentTypes.forEach((documentType) => {
      const proofUrl = kycDocs[documentType];
      console.log(`Document type: ${documentType}, URL: ${proofUrl}`);
    });

    if (documentTypes.length > 0) {
      setModalImageUrl(kycDocs[documentTypes[0]]);
      setModalIsOpen(true);
    }
  };


  const handleCloseModal = () => {
    setModalIsOpen(false);
    setModalImageUrl("");
  };

  const handleManageUser = (previewUser) => {
    navigate(`/userInformation/UserInformation/${previewUser.id}`, {
      state: { previewUser },
    });
  };

  const renderTableHeader = () => {
    return (
      <thead className={styles.table_head}>
        <tr>
          <th id={styles.tableU}>User Full Name</th>
          <th id={styles.tableU}>Email address</th>
          <th id={styles.tableU}>Status</th>
          <th id={styles.tableU}>KYC Proof</th>
          <th id={styles.tableU}>Manual Action</th>
          <th id={styles.tableU}>Elect Action</th>
          <th id={styles.tableU}>Manage</th>
        </tr>
      </thead>
    );
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderTableData = () => {
    return loading ? (
      <tr>
        <td colSpan={6}>
          <Loading />
        </td>
      </tr>
    ) : (
      data.slice(startIndex, endIndex).map((item) => {
        const kycStatus = item.status;
        // const hasProcessed = kycStatus !== "awaiting";
         const hasProcessed = kycStatus === "confirm" || kycStatus === "reject";
        const isProc = processing[item.id];
        const actionSx = {
          cursor: isProc ? "not-allowed" : hasProcessed ? "default" : "pointer",
          padding: "8px",
          width: "auto",
          font: "8px",
        };

        return (
          <tr key={item.id}>
            <td>{item.username}</td>
            <td>{item.email}</td>
            <td>
              {item.isLogin ? (
                <span style={{ color: "green" }}>Active</span>
              ) : (
                <span style={{ color: "red" }}>Offline</span>
              )}
            </td>
            <td>
              <span
                onClick={() => handleViewProof(item.kycDocs)}
                style={{ cursor: "pointer" }}
              >
                View
              </span>
            </td>
            <td>
              {hasProcessed ? (
                <Typography
                  sx={{
                    "&::first-letter": {
                      textTransform: "uppercase",
                    },
                  }}
                >
                  {kycStatus}
                </Typography>
              ) : (
                <Stack justifyContent="normal">
                  <Button
                    type="button"
                    color={"secondary"}
                    variant={"contained"}
                    sx={actionSx}
                    disabled={isProc}
                    onClick={() => updateUserStatus(item.id, "confirm", "file")}
                  >
                    Confirm
                  </Button>
                  {hasProcessed ? null : (
                    <Button
                      type="button"
                      color="error"
                      variant="contained"
                      sx={actionSx}
                      disabled={isProc}
                      onClick={() =>
                        updateUserStatus(item.id, "reject", "file")
                      }
                    >
                      Reject
                    </Button>
                  )}
                </Stack>
              )}
            </td>

            <td>
              {hasProcessed ? (
                <Typography
                  sx={{
                    "&::first-letter": {
                      textTransform: "uppercase",
                    },
                  }}
                >
                  {kycStatus}
                </Typography>
              ) : (
                <Stack justifyContent="normal">
                  <Button
                    type="button"
                    color="secondary"
                    variant="contained"
                    sx={actionSx}
                    disabled={isProc}
                    onClick={() => updateUserStatus(item.id, "confirm", "id")}
                  >
                    Confirm ID
                  </Button>
                  {hasProcessed ? null : (
                    <Button
                      type="button"
                      color="error"
                      variant="contained"
                      sx={actionSx}
                      disabled={isProc}
                      onClick={() => updateUserStatus(item.id, "reject", "id")}
                    >
                      Reject ID
                    </Button>
                  )}
                </Stack>
              )}
            </td>
            <td>
              <button
                id={styles.user_btn}
                type="button"
                onClick={() => handleManageUser(item)}
              >
                Manage
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
          icon={{ modalImageUrl }}
          Styles={styles.modal_btn}
          message={modalImageUrl ? "" : "No Image to display"}
          btnText="X"
        />
      )}
    </div>
  );
};

export default UserTable;
