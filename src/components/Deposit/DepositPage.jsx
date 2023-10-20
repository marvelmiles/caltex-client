import React, { useRef, useMemo } from "react";
import { useState } from "react";

import Button from "@mui/material/Button";
import { Stack, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { GoCopy } from "react-icons/go";
import { BsCheck2 } from "react-icons/bs";
import UploadProof from "../UploadProof";

import { formatToDecimalPlace } from "../../utils/normalizers";
import { currencySymbols } from "../../config/constants";
import PaymentSelectLayout from "../PaymentSelectLayout";

const DepositPage = () => {
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

  const [currency, setCurrency] = useState("USD");
  const [cryptoNetwork, setCryptoNetwork] = useState("btc");
  const [amount, setAmount] = useState("");
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
      localPayment: {
        currency
      }
    }),
    [cryptoNetwork, amount, currency]
  );

  return (
    <PaymentSelectLayout title="Deposit Funds" subTitle="Crypto Payments">
      <div
        className="cryptoDeposit"
        id="cryptoDeposit"
        style={{ border: "none" }}
      >
        <div className="cryptodeposit">
          <div className="imp-instruction">
            <h4>Important instructions before making the payment</h4>
            <p>
              {" "}
              <i className="fa fa-circle" id="circle"></i> Payments with this
              method may at our request be subject to enhanced due dilligence
              and security checks to ensure that they are not fraudulent.
            </p>
            <p>
              {" "}
              <i className="fa fa-circle" id="circle"></i> Make sure you send
              the Crypto Payment within the 15 minutes before invoice
              expiration.
            </p>
            <p>
              {" "}
              <i className="fa fa-circle" id="circle"></i> Make sure you always
              add the Payment Destination Tag/Memo or ID before making the
              transaction.
            </p>
            <p>
              {" "}
              <i className="fa fa-circle" id="circle"></i> Please make sure you
              always use the updated payment details that will be presented to
              you after you click Deposit. Caltex will bear no responsibility
              for crediting and returning funds if you use invalid payment
              details.
            </p>
            <p>
              {" "}
              <i className="fa fa-circle" id="circle"></i> Only accepted
              cryptocurrencies are processed using this method. Other currencies
              or tokens are not supported.
            </p>
          </div>

          <form
            onSubmit={handleCryptoDeposit}
            id="crypto-form-deposit"
            style={{ display: showNext ? "none" : "block" }}
          >
            <div className="withdrawal-network" id="withdrawal-network">
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
                      btc: "bc1q6p3yppgffw08dkeau0cnnpxhemkadnr07p3jq0",
                      ltc: "ltc1qkkvf7vjwaxggdhh4nsnuclmfqfkrt9pv4dnrp2",
                      eth: "0xeD89AeaD1fF477311D27cDb87d411acCf07E17e1",
                      ustderc20: "0xeD89AeaD1fF477311D27cDb87d411acCf07E17e1",
                      usdttrc20: "TUvKjhievHG5V6D4FhnY94NsKx6jhRVi9F"
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
            <Stack sx={{ mb: 3 }}>
              <Typography variant="h4">Payment address</Typography>
              <Typography
                variant="caption"
                sx={{
                  "&:hover": { textDecoration: "underline" },
                  cursor: "pointer"
                }}
                onClick={() => setShowNext(false)}
              >
                Select network
              </Typography>
            </Stack>

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
              <input variant="h6" ref={addressRef} value={address} readOnly />

              <div>
                {copied ? (
                  <BsCheck2 />
                ) : (
                  <GoCopy onClick={handleCopyToClipboard} />
                )}
              </div>
            </Stack>
            <Box
              className="enter-amount"
              id="enter-amount"
              sx={{
                marginLeft: "0",
                "#number": {
                  width: "calc(100% - 90px)"
                }
              }}
            >
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
                onChange={e => setAmount(e.target.value)}
              />
            </Box>

            <UploadProof
              formData={uploadProofPlaceholders}
              message={
                amount
                  ? `Payment will be rejected if the transferred ${cryptoNetwork.toUpperCase()} isn't an equivalent of ${
                      currencySymbols[currency]
                    }${formatToDecimalPlace(amount, true)}`
                  : ""
              }
            />
          </Box>
        </div>
      </div>

      <div className="trans-pro-del">
        <div
          className="transaction-processings"
          id="transactionPro1"
          onClick={revealTransDetails}
        >
          <span>Transaction Processing And Security Of Funds</span>
          <span>
            <i className="fa fa-caret-down"></i>
          </span>
        </div>
        <div
          className="transaction-processings"
          id="transactionPro2"
          onClick={closeTransDetails}
        >
          <span>Transaction Processing And Security Of Funds</span>
          <span>
            <i className="fa fa-caret-up"></i>
          </span>
        </div>

        <div className="transaction-processing-details" id="trans-pro-det">
          <p>
            <i className="fa fa-circle" id="circle"></i> Manual deposits or
            refunds are credited to myWallet only. To transfer funds to your
            trading account, please proceed with an internal transfer from
            myWallet.
          </p>
          <p>
            <i className="fa fa-circle" id="circle"></i> The company is not
            liable for potential losses that may occur as a result of market
            moves during the time your deposit is being approved.
          </p>
          <p>
            <i className="fa fa-circle" id="circle"></i> CALTEX does not
            collect, store, or process any personal credit or debit Card
            information.All payment transactions are processed through our
            independent international payment processors.
          </p>
          <p>
            <i className="fa fa-circle" id="circle"></i> CALTEX shall not accept
            any deposits from any third-party to the customer's account.
          </p>
          <p>
            <i className="fa fa-circle" id="circle"></i> CALTEX does not accept
            cheque payments.
          </p>
          <p>
            <i className="fa fa-circle" id="circle"></i> Deposits are processed
            24/5 between 00:00 Server Time Monday to 00:00 Server Time Saturday.
          </p>
        </div>
      </div>

      <div className="depositFee-processingTime" id="depositFee-processingTime">
        <div className="depoFeeProTime">
          <div className="deposit-fee">
            <h4>Deposit Fee:</h4>
            <p>No Deposit Fee</p>
          </div>
          <div className="processingTime">
            <h4>Processing Time:</h4>
            <p>
              Up to 5 minutes, but it can take longer depending on the payment
              processor and blockchain network.
            </p>
          </div>
        </div>
      </div>
    </PaymentSelectLayout>
  );
};

export default DepositPage;
