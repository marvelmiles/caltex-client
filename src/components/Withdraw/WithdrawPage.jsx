import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import visa from "../../images/visa.png";
import mastercard from "../../images/mastercard.png";
import cryptovec from "../../images/cryptovector.png";
import btc from "../../images/Bitcoin.png";
import wallet from "../../images/wallet.png";
import creditcard from "../../images/creditcard.png";
import Button from "@mui/material/Button";
import PaymentSelectLayout from "../PaymentSelectLayout";
import { useCtx } from "../../context";
import http from "../../api/http";
import { Box } from "@mui/material";

const WithdrawPage = () => {
  function revealTransDetails() {
    document.getElementById("trans-pro-det").style.display = "block";
    document.getElementById("transactionPro2").style.display = "block";
    document.getElementById("transactionPro2").style.display = "flex";
    document.getElementById("transactionPro1").style.display = "none";
  }

  function closeTransDetails() {
    document.getElementById("trans-pro-det").style.display = "none";
    document.getElementById("transactionPro1").style.display = "block";
    document.getElementById("transactionPro1").style.display = "flex";
    document.getElementById("transactionPro2").style.display = "none";
  }

  function cryptoWithdrawal() {
    document.getElementById("crypto-options").style.display = "none";
    document.getElementById("crypto-payments").style.display = "none";
    document.getElementById("credit-options").style.display = "none";
    document.getElementById("credit-card-payments").style.display = "none";
    document.getElementById("cryptoWithdrawal").style.display = "block";
  }

  function showAll() {
    document.getElementById("crypto-options").style.display = "block";
    document.getElementById("crypto-payments").style.display = "block";
    document.getElementById("credit-options").style.display = "block";
    document.getElementById("credit-card-payments").style.display = "block";
    document.getElementById("cryptoWithdrawal").style.display = "none";
  }

  const { setSnackBar } = useCtx();

  const [currency, setCurrency] = useState("USD");
  const [cryptoNetwork, setCryptoNetwork] = useState("BTC");
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRequestWithdrawal = async e => {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      const res = await http.post("/transactions/request-withdrawal", {
        amount,
        walletAddress,
        currency: cryptoNetwork,
        localPayment: {
          currency
        },
        paymentType: "crypto"
      });

      setSnackBar({
        message: res.message,
        severity: "success"
      });
      setAmount("");
      setWalletAddress("");
      setCurrency("USD");
      setCryptoNetwork("BTC");
    } catch (err) {
      setSnackBar(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PaymentSelectLayout title="Withdraw Fund" subTitle="Crypto widthdraw">
      <div class="cryptoWithdrawal" id="cryptoWithdrawal">
        <div class="cryptowithdraw">
          <div class="imp-instruction">
            <h4>Important instruction for successful withdrawing</h4>
            <p>
              At caltex, we strive to make withdrawals quick, convenient and
              easy
            </p>
            <p>To withdraw successfully, ensure that:</p>
            <p>- Your withdrawals are proportional to your deposit.</p>
            <p>- Your account has suficient funds and is in good standing</p>
            <p>
              In the unlikely event of a withdrawal issue,please contact our
              friendly support team.Our team is always on hand to assist you.
            </p>
          </div>
          <form onSubmit={handleRequestWithdrawal}>
            <Box className="enter-amount">
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
                  EURO
                </option>
              </select>
              <input
                type="number"
                id="number"
                name=""
                placeholder=""
                value={amount}
                onChange={e => setAmount(e.currentTarget.value)}
              />
            </Box>

            <div class="withdrawal-network">
              <h4>Withdrawal Network</h4>
              <select
                id="withdraw-net"
                name="withdraw-net"
                size="1"
                value={cryptoNetwork}
                onChange={e => setCryptoNetwork(e.target.value)}
              >
                <option value="BTC" id="btc">
                  BTC - Bitcoin
                </option>
                <option value="ETH" id="eth">
                  ETH - Ethereum
                </option>
                <option value="LTC" id="ltc">
                  LTC - Litecoin
                </option>
                <option value="USDTERC20" id="usdtErc20">
                  USDT - ERC20
                </option>
                <option value="USDTTRC20" id="usdtTrc20">
                  USDT - TRC20
                </option>
                <option value="USDTBEP20" id="usdtBep20">
                  USDT - BEP20
                </option>
              </select>
            </div>

            <div class="wallet-address">
              <h4>Wallet Address</h4>
              <input
                type="text"
                id="wallet-addr"
                name="wallet-address "
                value={walletAddress}
                placeholder=" "
                onChange={e => setWalletAddress(e.target.value)}
              />
            </div>

            <Button
              variant="contained"
              type="submit"
              sx={{ ml: "20px", mt: "20px" }}
              disabled={isSubmitting}
            >
              Withdraw
            </Button>
          </form>

          <div class="depositFee-processingTime">
            <div class="depoFeeProTime">
              <div class="deposit-fee">
                <h4>Deposit Fee:</h4>
                <p>10% withdrawal Fee</p>
              </div>
              <div class="processingTime">
                <h4>Processing Time:</h4>
                <p>
                  Up to 5minutes, but it can take longer depending on the
                  payment processor and blockchain network.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="trans-pro-del" id="trans-pro-del">
        <div
          class="transaction-processing"
          id="transactionPro1"
          onClick={revealTransDetails}
        >
          <span>Transaction Processing And Security Of Funds</span>
          <span>
            <i class="fa fa-caret-down"></i>
          </span>
        </div>
        <div
          class="transaction-processing"
          id="transactionPro2"
          onClick={closeTransDetails}
        >
          <span>Transaction Processing And Security Of Funds</span>
          <span>
            <i class="fa fa-caret-up"></i>
          </span>
        </div>

        <div class="transaction-processing-details" id="trans-pro-det">
          <p>
            <i class="fa fa-circle" id="circle"></i> Manual deposits or refunds
            are credited to myWallet only. To transfer funds to your trading
            account, please proceed with an internal transfer from myWallet.
          </p>
          <p>
            <i class="fa fa-circle" id="circle"></i> The company is not liable
            for potential losses that may occur as a result of market moves
            during the time your deposit is being approved.
          </p>
          <p>
            <i class="fa fa-circle" id="circle"></i> CALTEX does not collect,
            store, or process any personal credit or debit Card information.All
            payment transactions are processed through our independent
            international payment processors.
          </p>
          <p>
            <i class="fa fa-circle" id="circle"></i> CALTEX shall not accept any
            deposits from any third-party to the customer's account.
          </p>
          <p>
            <i class="fa fa-circle" id="circle"></i> CALTEX does not accept
            cheque payments.
          </p>
          <p>
            <i class="fa fa-circle" id="circle"></i> Deposits are processed 24/5
            between 00:00 Server Time Monday to 00:00 Server Time Saturday.
          </p>
        </div>
      </div>

      <div class="congratulations" id="congratulations">
        <div class="congrats">
          <div class="congrat-text">
            <p>Congratulations, your payment has been approved</p>
            <div class="see-investment-btn">
              <span class=" " onclick=" ">
                <Link to="/" class="see-btn">
                  Trade More
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </PaymentSelectLayout>
  );
};

export default WithdrawPage;
