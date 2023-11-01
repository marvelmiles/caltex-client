import React from "react";
import { useEffect, useState } from "react";
import closedeye from "./../../images/closedeye.png";
import openedeye from "./../../images/eye1.png";
import kyc from "./../../images/kyc.png";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useCtx } from "../../context";
import http from "../../api/http";
import { formatToDecimalPlace } from "../../utils/normalizers";
import Layout from "../Layout";
import "./dashboard.css";
import { Stack, Typography } from "@mui/material";
import StatCard from "../StatCard";
import SuccessModal from "../successModal/SuccessModal";
import styles from "./Sidebar.module.scss";

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const [openEye, setOpenEye] = useState(false);
  const [closeEye, setCloseEye] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isKYCNoticeOpen, setKYCNoticeOpen] = useState(false);

  const navigate = useNavigate();

  const {
    setSnackBar,
    setAppCtx,
    appCtx: {
      transactionMetrics: { balance }
    }
  } = useCtx();

  const { id, kycDocs, kycIds } = currentUser;

  const handleOpenEye = () => {
    setOpenEye(!openEye);
    setCloseEye(!closeEye);
  };

  const handleCloseEye = () => {
    setCloseEye(!closeEye);
    setOpenEye(!openEye);
  };

  const handleWithdrawClick = () => {
    if (isVerified) {
      setKYCNoticeOpen(true);
    } else {
      // Redirect to the withdrawal page
      navigate("/Withdraw/withdrawPage");
    }
  };

  const handleDepositClick = () => {
    if (isVerified) {
      setKYCNoticeOpen(true);
    } else {
      // Redirect to the deposit page
      navigate("/Deposit/DepositPage");
    }
  };

  const handleKycRrdirect = () => {
    setKYCNoticeOpen(false);
    navigate("/idVerificatonMethod/IdVerificationMethod");
  };

  useEffect(() => {
    (async () => {
      try {
        setIsVerified(
          !!(Object.keys(kycDocs).length || Object.keys(kycIds).length)
        );

        const res = await http.get(`/users/${id}/transaction-metrics`, {
          withCredentials: true
        });

        if (!res.success) throw res;

        setAppCtx(ctx => ({
          ...ctx,
          transactionMetrics: res.data
        }));
      } catch (err) {
        setSnackBar(err.message);
      }
    })();
  }, [setSnackBar, id, setAppCtx, kycIds, kycDocs]);

  return (
    <Layout>
      <div class="ct" id="ct">
        <div class="ct-inner">
          <div class="total-balance">
            <h5>Total Balance</h5>
            {!openEye && (
              <h3>
                {`${formatToDecimalPlace(balance.availableBalance, true) +
                  " USD"}`}
                <span class="bell-notification" id=" " onclick=" ">
                  <img
                    src={closedeye}
                    id="closedEye-icon"
                    alt="closedeye-icon"
                    onClick={handleOpenEye}
                  />
                </span>
              </h3>
            )}
            {closeEye && (
              <h3>
                ***********
                <span class="bell-notification" id=" " onclick=" ">
                  <img
                    src={openedeye}
                    height={26}
                    width={42}
                    id="closedEye-icon"
                    alt="closedeye-icon"
                    style={{ marginBottom: "2px" }}
                    onClick={handleCloseEye}
                  />
                </span>
              </h3>
            )}
          </div>
          <div
            className="total-balance"
            style={{ marginBottom: "24px !important" }}
          >
            <Typography variant="h3" sx={{ mb: 5 }}>
              Transaction summary
            </Typography>
            <Stack justifyContent="normal" gap={8} flexWrap="wrap">
              {[
                {
                  value: balance.confirmedTransactions,
                  label: "Confirmed Transactions"
                },
                {
                  value: balance.awaitingTransactions,
                  label: "Awaiting Transactions"
                },
                {
                  value: balance.rejectedTransactions,
                  label: "Rejected Transactions"
                }
              ].map((s, i) => (
                <StatCard key={i} {...s} />
              ))}
            </Stack>
          </div>
          <div class="monetary-options">
            <Link to="/Invest/InvestPage" className="invests">
              Invest{" "}
            </Link>

            <Link to="" className="deposits" onClick={handleDepositClick}>
              Deposit{" "}
            </Link>

            <Link to="" className="withdraws" onClick={handleWithdrawClick}>
              Withdraw{" "}
            </Link>

            <Link to="/investment/Investment " className="investments">
              Investment{" "}
            </Link>
          </div>
          <div class="ct-forex">
            <p>
              CTFOREX is an international online broker offering financial
              services in various financial instruments.
            </p>
            <p>
              The brand is authorized and regulated in various jur isdictions.
              CTFOREX (www.ctforex.com/eu) is regulated by the Singapore
              Securities and Exchange Commission wi th CIF license number
              195/12, licensed by the Financial Sector Conduct Authority (FSCA)
              of Singapore, with FSP No. 48914.
            </p>
            <p>
              The company is also registered with the Financial Conduct
              Authority of the UK with number 770475. The office is at 85, saint
              mellanby Tower, Donlads Castle, Manchester, UK.
            </p>
            <p>
              Caltex Trading is UK Limited is authorised and regulated by the
              Financial Conduct Authority, firm reference number 777911, and is
              situated at 30 Churchill Place, London, E14 5EU, UK.
            </p>
            <p>
              Your capital is at risk. You should not spend more than you can
              afford to lose and should ensure that you fully understand the
              risks involved. Using the products offered may not be suitable for
              everyone. Before you use these products, please take into
              consideration your level of experience, and financial objectives
              and seek independent advice if ne cessary. It is the
              responsibility of the Client to ascertain whether he/she is
              permitted to use the services of the CTFOREX brand based on the
              legal requ irements in his/her country of residence. Please read
              CTFOREX’S full Risk
            </p>
            <p>Disclosure © 2023</p>
          </div>
        </div>
      </div>
      {isKYCNoticeOpen && (
        <SuccessModal
          closeModal={handleKycRrdirect}
          icon={kyc}
          message="You have not been verified!!"
          btnText="Proceed to KYC verification!!"
          Styles={styles.modal_cont}
          modalStyle={styles.modal_main}
        />
      )}
    </Layout>
  );
};

export default DashboardPage;
