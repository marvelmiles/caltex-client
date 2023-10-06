import http from "../../api/http";
import React, { useRef, useMemo } from "react";
import ReactDoM from "react-dom";
import { useState } from "react";
import "../../components/Deposit/DepositPage.css";
import { Link } from "react-router-dom";
import caltexTrader from "../../images/caltexTrader.png";
import logo from "../../images/logo (1).png";
import forex from "../../images/forex.png";
import crypto from "../../images/crypto.png";
import withdraw from "../../images/withdraw.png";
import help from "../../images/help.png";
import profile from "../../images/profile.png";
import deposit from "../../images/deposit.png";
import legal from "../../images/legal.png";
import logout from "../../images/logout.png";
import visa from "../../images/visa.png";
import mastercard from "../../images/mastercard.png";
import cryptovec from "../../images/cryptovector.png";
import btc from "../../images/Bitcoin.png";
import wallet from "../../images/wallet.png";
import creditcard from "../../images/creditcard.png";
import dashboard from "../../images/dashboard (1).png";
import { BiSolidDashboard } from "react-icons/bi";

import useAuth from "../../hooks/useAuth";
import { useCtx } from "../../context";
import Button from "@mui/material/Button";
import { Stack, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { GoCopy } from "react-icons/go";
import { BsCheck2 } from "react-icons/bs";
import UploadProof from "../UploadProof";
import DashboardNav from "../dashboard/DashboardNav";
import Sidebar from "../dashboard/Sidebar";

const DepositPage = () => {
  const { setSnackBar } = useCtx();
  const { currentUser } = useAuth();

  function revealTransDetails() {
    document.getElementById("trans-pro-det").style.display = "block";
    document.getElementById("transactionPro2").style.display = "block";
    document.getElementById("transactionPro2").style.display = "flex";
    document.getElementById("transactionPro1").style.display = "none";
    document.getElementById("transactionPro2").style.backgroundColor =
      "rgba(30,30,30,0.05)";
  }

  function closeTransDetails() {
    document.getElementById("trans-pro-det").style.display = "none";
    document.getElementById("transactionPro1").style.display = "block";
    document.getElementById("transactionPro1").style.display = "flex";
    document.getElementById("transactionPro2").style.display = "none";
  }

  function showAll() {
    document.getElementById("crypto-options").style.display = "block";
    document.getElementById("crypto-payments").style.display = "block";
    document.getElementById("credit-options").style.display = "block";
    document.getElementById("credit-card-payments").style.display = "block";
    document.getElementById("cryptoDeposit").style.display = "none";
    document.getElementById("cdm").style.display = "none";
    document.getElementById("depositFee-processingTime").style.display = "none";
    document.getElementById("cardDeposit").style.display = "none";
  }

  function cardDeposit() {
    document.getElementById("crypto-options").style.display = "none";
    document.getElementById("crypto-payments").style.display = "none";
    document.getElementById("credit-options").style.display = "none";
    document.getElementById("credit-card-payments").style.display = "none";
    document.getElementById("cdm").style.display = "block";
    document.getElementById("depositFee-processingTime").style.display =
      "block";
    document.getElementById("cardDeposit").style.display = "block";
    document.getElementById("cryptoDeposit").style.display = "none";
  }

  function depositCryptoNow() {
    document.getElementById("copy-and-paste").style.display = "block";
    document.getElementById("withdrawNow").style.display = "none";
    document.getElementById("withdrawal-network").style.display = "none";
    document.getElementById("enter-amount").style.display = "none";
    document.getElementById("enter-id").style.display = "none";
  }

  function congratOnWithdraw() {
    document.getElementById("cryptoWithdrawal").style.display = "none";
    document.getElementById("withraw-limit-text").style.display = "none";
    document.getElementById("withdraw-options").style.display = "none";
    document.getElementById("transactionPro1").style.display = "none";
    document.getElementById("transactionPro2").style.display = "none";
    document.getElementById("trans-pro-del").style.display = "none";
    document.getElementById("congratulations").style.display = "block";
  }

  function openNav() {
    document.getElementById("sidenav").style.width = "70%";
  }

  function closeNav() {
    document.getElementById("sidenav").style.width = "0";
  }

  const [currency, setCurrency] = useState("USD");
  const [cryptoNetwork, setCryptoNetwork] = useState("btc");
  const [amount, setAmount] = useState("");
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [address, setAddress] = useState(
    "bc1q6p3yppgffw08dkeau0cnnpxhemkadnr07p3jq0"
  );
  const [showNext, setShowNext] = useState(false);

  const addressRef = useRef();

  const handleCryptoDeposit = async e => {
    e.preventDefault();

    setShowNext(true);
  };

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    photoUrl: "",
    address: ""
  });

  function cryptoDeposit() {
    document.getElementById("cryptoDeposit").style.display = "block";
    document.getElementById("cdm").style.display = "block";
    document.getElementById("cardDeposit").style.display = "none";
    document.getElementById("crypto-payments").style.display = "none";
    document.getElementById("crypto-options").style.display = "none";
    document.getElementById("credit-options").style.display = "none";
    document.getElementById("credit-card-payments").style.display = "none";
  }

  const handleCopyToClipboard = () => {
    const input = addressRef.current;
    navigator.clipboard.writeText(input.value);
    setCopied(true);
    const taskId = setTimeout(() => {
      setCopied(false);
      clearTimeout(taskId);
    }, 1000);
  };

  const uploadProofPlaceholders = useMemo(
    () => ({
      amount,
      paymentType: cryptoNetwork ? "crypto" : "fiat",
      currency: cryptoNetwork,
      localCurrency: currency
    }),
    [cryptoNetwork, amount, currency]
  );

  return (
    <div>
      <div className="dashboard-container">
        <div className="board">
          <Sidebar />

          <div className="dashboard-content">
            <div className="board-content">
              <DashboardNav />

              <div className="deposit-funds-container">
                <div className="deposit-funds">
                  <div className="deposit-fund-text">
                    <h3>Deposit Fund</h3>
                  </div>
                  <div className="deposit-content-container">
                    <div className="deposit-container">
                      <div className="deposit-limit-text">
                        <p>
                          Your deposit limit is $5,000 , get your account fully
                          verified to increase your deposit limit by
                          <span className="clicking-here">
                            {" "}
                            <b>clicking here</b>{" "}
                          </span>
                        </p>
                      </div>
                      <div className="deposit-options">
                        <div className="depo-options">
                          <div className="all" onClick={showAll}>
                            <img
                              src={wallet}
                              id="depo-icon"
                              alt="wallet-icon"
                            />
                            <p>All</p>
                          </div>
                          <div className="cryptos" onClick={cryptoDeposit}>
                            <img src={btc} id="depo-icon" alt="btc-icon" />
                            <span>Crypto</span>
                          </div>
                          <div className="credit-cards" onClick={cardDeposit}>
                            <img
                              src={creditcard}
                              id="depo-icon"
                              alt="creditCard-icon"
                            />
                            <span>Credit Cards</span>
                          </div>
                        </div>
                      </div>

                      {paymentDetails && (
                        <>
                          <h2>Payment Details</h2>
                          <p>Charge ID: {paymentDetails.chargeId}</p>
                          <p>Name: {paymentDetails.name}</p>
                        </>
                      )}

                      <div className="cdm" id="cdm" onClick={showAll}>
                        <span>
                          <i className="fa fa-arrow-left" id="CDM"></i>
                        </span>
                        <span>Change deposit mode</span>
                      </div>

                      <div className="crypto-options" id="crypto-options">
                        <h3 className="crypto-opt">Cryptos</h3>
                      </div>

                      <div
                        className="crypto-payments"
                        id="crypto-payments"
                        onClick={cryptoDeposit}
                      >
                        <div className="crypto-pay">
                          <span>
                            <b>Crypto Payments</b>
                          </span>
                          <span className="cp4">
                            <img src={cryptovec} alt="crypto-icon" />
                            Crypto
                          </span>
                        </div>
                      </div>

                      <div className="credit-options" id="credit-options">
                        <h3 className="credit-opt">Credit Card</h3>
                      </div>

                      <div
                        className="credit-card-payments"
                        id="credit-card-payments"
                        onClick={cardDeposit}
                      >
                        <div className="credit-pay">
                          <span className="interS">
                            <b>Stripe</b>
                          </span>
                          <span className="cp1">
                            <span className="visa">
                              <img src={visa} alt="visa-icon" />
                            </span>
                            <span className="master">
                              <img src={mastercard} alt="mastercard-icon" />
                            </span>
                          </span>
                        </div>
                      </div>

                      <div className="cryptoDeposit" id="cryptoDeposit">
                        <div className="cryptodeposit">
                          <div className="cryptoprefix">
                            <span>
                              <h3>Crypto Payments</h3>
                            </span>
                            <span className="cp2">
                              <h4>
                                <img src={cryptovec} /> Crypto
                              </h4>
                            </span>
                          </div>

                          <div className="imp-instruction">
                            <h4>
                              Important instructions before making the payment
                            </h4>
                            <p>
                              {" "}
                              <i className="fa fa-circle" id="circle"></i>{" "}
                              Payments with this method may at our request be
                              subject to enhanced due dilligence and security
                              checks to ensure that they are not fraudulent.
                            </p>
                            <p>
                              {" "}
                              <i className="fa fa-circle" id="circle"></i> Make
                              sure you send the Crypto Payment within the 15
                              minutes before invoice expiration.
                            </p>
                            <p>
                              {" "}
                              <i className="fa fa-circle" id="circle"></i> Make
                              sure you always add the Payment Destination
                              Tag/Memo or ID before making the transaction.
                            </p>
                            <p>
                              {" "}
                              <i className="fa fa-circle" id="circle"></i>{" "}
                              Please make sure you always use the updated
                              payment details that will be presented to you
                              after you click Deposit. HFM will bear no
                              responsibility for crediting and returning funds
                              if you use invalid payment details.
                            </p>
                            <p>
                              {" "}
                              <i className="fa fa-circle" id="circle"></i> Only
                              accepted cryptocurrencies are processed using this
                              method. Other currencies or tokens are not
                              supported.
                            </p>
                          </div>

                          <form
                            onSubmit={handleCryptoDeposit}
                            id="crypto-form-deposit"
                            style={{ display: showNext ? "none" : "block" }}
                          >
                            {/* <div className="enter-amount" id="enter-amount">
                              <h4>Enter amount</h4>
                              <select
                                disabled={isSubmitting}
                                id="currency"
                                name="currency"
                                size="1"
                                value={currency}
                                onChange={e => {
                                  const v = e.target.value;
                                  setCurrency(v);
                                }}
                              >
                                <option value="USD" id="usd">
                                  USD
                                </option>
                                <option value="EUR" id="euro">
                                  EUR
                                </option>
                              </select>
                              <input
                                readOnly={isSubmitting}
                                type="number"
                                id="number"
                                name="amount"
                                value={amount}
                                placeholder=" "
                                onChange={e => setAmount(e.target.value)}
                              />
                            </div> */}

                            <div
                              className="withdrawal-network"
                              id="withdrawal-network"
                            >
                              <h4>Accepted Cryptocurrencies</h4>
                              <select
                                id="withdraw-net"
                                name="Cryptocurrency-Network"
                                size="1"
                                value={cryptoNetwork}
                                onChange={e => {
                                  const v = e.target.value;
                                  setCryptoNetwork(v);
                                  setAddress(
                                    {
                                      btc:
                                        "bc1q6p3yppgffw08dkeau0cnnpxhemkadnr07p3jq0",
                                      ltc:
                                        "ltc1qkkvf7vjwaxggdhh4nsnuclmfqfkrt9pv4dnrp2",
                                      eth:
                                        "0xeD89AeaD1fF477311D27cDb87d411acCf07E17e1",
                                      ustderc20:
                                        "0xeD89AeaD1fF477311D27cDb87d411acCf07E17e1",
                                      usdttrc20:
                                        "TUUUgN9yTnm3g3BfzW59N9cv2ZTooeE9kK"
                                    }[v]
                                  );
                                }}
                                disabled={isSubmitting}
                              >
                                <option value="btc" id="btc">
                                  BTC - Bitcoin
                                </option>
                                <option value="eth" id="eth">
                                  ETH - Ethereum
                                </option>
                                <option value="ltc" id="ltc">
                                  LTC - Litecoin
                                </option>
                                <option value="usdterc20" id="usdtErc20">
                                  USDT - USDT ERC20
                                </option>
                                <option value="usdttrc20" id="usdtTrc20">
                                  USDT - USDT TRC20
                                </option>
                              </select>
                            </div>

                            <Button
                              variant="contained"
                              type="submit"
                              disabled={isSubmitting}
                              sx={{ ml: "20px", mt: "20px" }}
                            >
                              Continue
                            </Button>
                          </form>

                          <Box
                            id="address-selection"
                            sx={{
                              ml: "20px",
                              mt: 3,
                              width: "57%",
                              display: showNext ? "block" : "none"
                            }}
                          >
                            <Typography variant="h4" sx={{ mb: 3 }}>
                              Payment address
                            </Typography>

                            <Stack
                              sx={{
                                px: 1,
                                backgroundColor: "grey.main",
                                borderRadius: "5px",
                                width: "100%",
                                input: {
                                  width: "100%",
                                  border: 0,
                                  py: 2,
                                  background: "transparent",
                                  outline: 0,
                                  boxShadow: "none"
                                },
                                "& > div": {
                                  fontSize: "20px",
                                  margin: 0,
                                  "&  > *": {
                                    margin: "0 !important"
                                  }
                                }
                              }}
                            >
                              <input
                                variant="h6"
                                ref={addressRef}
                                value={address}
                                readOnly
                              />

                              <div>
                                {copied ? (
                                  <BsCheck2 />
                                ) : (
                                  <GoCopy onClick={handleCopyToClipboard} />
                                )}
                              </div>
                            </Stack>
                            <UploadProof formData={uploadProofPlaceholders} />
                          </Box>
                        </div>
                      </div>

                      <div className="cardDeposit" id="cardDeposit">
                        <div className="depositWithCard">
                          <div className="cryptoprefix">
                            <span>
                              <h3 className="intersw">STRIPE</h3>
                            </span>
                            <span className="cp3">
                              <img src={mastercard} />
                              <p>Credit Card</p>
                            </span>
                          </div>

                          <div className="imp-instructionForCard">
                            <h4>
                              Important instructions before making the payment
                            </h4>
                            <p>
                              {" "}
                              <i className="fa fa-circle" id="circle"></i>{" "}
                              Verification is important before completing the
                              transaction.
                            </p>
                          </div>

                          <div className="enter-amount" id="enter-amount">
                            <h4>Enter amount</h4>
                            <select
                              id="currency"
                              name="currency"
                              size="1"
                              value={currency}
                              onChange={e => setCurrency(e.target.value)}
                            >
                              <option value="USD" id="usd">
                                USD
                              </option>
                              <option value="EUR" id="euro">
                                EUR
                              </option>
                            </select>
                            <input
                              type="number"
                              id="number"
                              value={amount}
                              placeholder=" "
                              onChange={e => setAmount(e.target.value)}
                            />
                          </div>

                          <Link
                            to="/DepositForm/DepositsForm"
                            id="depositCard-Now"
                            state={{ payment: { amount, currency } }}
                          >
                            Deposit
                          </Link>
                        </div>
                      </div>

                      <div className="trans-pro-del">
                        <div
                          className="transaction-processings"
                          id="transactionPro1"
                          onClick={revealTransDetails}
                        >
                          <span>
                            Transaction Processing And Security Of Funds
                          </span>
                          <span>
                            <i className="fa fa-caret-down"></i>
                          </span>
                        </div>
                        <div
                          className="transaction-processings"
                          id="transactionPro2"
                          onClick={closeTransDetails}
                        >
                          <span>
                            Transaction Processing And Security Of Funds
                          </span>
                          <span>
                            <i className="fa fa-caret-up"></i>
                          </span>
                        </div>

                        <div
                          className="transaction-processing-details"
                          id="trans-pro-det"
                        >
                          <p>
                            <i className="fa fa-circle" id="circle"></i> Manual
                            deposits or refunds are credited to myWallet only.
                            To transfer funds to your trading account, please
                            proceed with an internal transfer from myWallet.
                          </p>
                          <p>
                            <i className="fa fa-circle" id="circle"></i> The
                            company is not liable for potential losses that may
                            occur as a result of market moves during the time
                            your deposit is being approved.
                          </p>
                          <p>
                            <i className="fa fa-circle" id="circle"></i> CALTEX
                            does not collect, store, or process any personal
                            credit or debit Card information.All payment
                            transactions are processed through our independent
                            international payment processors.
                          </p>
                          <p>
                            <i className="fa fa-circle" id="circle"></i> CALTEX
                            ahall not accept any deposits from any third-party
                            to the customer's account.
                          </p>
                          <p>
                            <i className="fa fa-circle" id="circle"></i> CALTEX
                            does not accept cheque payments.
                          </p>
                          <p>
                            <i className="fa fa-circle" id="circle"></i>{" "}
                            Deposits are processed 24/5 between 00:00 Server
                            Time Monday to 00:00 Server Time Saturday.
                          </p>
                        </div>
                      </div>

                      <div
                        className="depositFee-processingTime"
                        id="depositFee-processingTime"
                      >
                        <div className="depoFeeProTime">
                          <div className="deposit-fee">
                            <h4>Deposit Fee:</h4>
                            <p>No Deposit Fee</p>
                          </div>
                          <div className="processingTime">
                            <h4>Processing Time:</h4>
                            <p>
                              Up to 5 minutes, but it can take longer depending
                              on the payment processor and blockchain network.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositPage;
