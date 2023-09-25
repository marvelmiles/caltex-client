import React, { useState, useEffect, useCallback } from "react";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate
} from "react-router-dom";
import DashboardPage from "./DashboardPage";
import DepositPage from "./components/Deposit/DepositPage";
import InvestPage from "./components/Invest/InvestPage";
import CaltexCompBrief from "./components/CaltexCompanyBrief/CaltexCompBrief";
import WithdrawPage from "./components/Withdraw/WithdrawPage";
import StarterplanForex from "./components/ForexDetails/StarterplanForex";
import professionalplanForex from "./components/ForexDetails/professionalplanForex";
import masterplanForex from "./components/ForexDetails/masterplanForex";
import starterplanCrypto from "./components/CryptoDetails/starterplanCrypto";
import professionalplanCrypto from "./components/CryptoDetails/professionalplanCrypto";
import masterplanCrypto from "./components/CryptoDetails/masterplanCrypto";
import DepositsForm from "./components/DepositForm/DepositsForm";
import LoginAndOut from "./pages/LoginAndOut";
import {
  ThemeProvider,
  CssBaseline,
  GlobalStyles,
  IconButton
} from "@mui/material";
import { createTheme, fontFamily } from "./styled/theme";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RecoverPwd from "./pages/RecoverPwd";
import TokenVerification from "./pages/TokenVerification";
import ResetPwd from "./pages/ResetPwd";
import AuthSuccess from "./components/AuthSuccess";
import { INPUT_AUTOFILL_SELECTOR } from "./styled";
import { Provider } from "./context";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { AiOutlineClose } from "react-icons/ai";
import Redirect from "./components/Redirect";
import Page404 from "./pages/Page404";
import useAuth from "./hooks/useAuth";
import http, { createRelativeUrl } from "./api/http";
import InvestTab from "./components/InvestTab";
import backarrow from "./images/backArrow.png";
import { HTTP_CODE_ACCOUNT_VERIFICATION_ERROR } from "./config/constants";

// WORKED ON THE INVEST AND PAYMENT SCREEN SOME COMPONENT ARE
// HAD TO BREAKDOWN UI INTO BIT OF COMPONENT BECAUSE OF THE CODE IS
// DIRTY AND REPITITIVE. MAJORLY THE INVESTMENT DASHBOARD AND PAYMENT
// SCREEN IS MEANT TO BE A REUSABLE UI OF FEW COMPONENT.

const App = () => {
  const [theme] = useState(createTheme());
  const [snackbar, setSnackbar] = useState({});

  let { state: locState = {}, pathname } = useLocation();
  locState = locState || {};

  const { isLoggedIn } = useAuth(locState.user);

  const navigate = useNavigate();

  const handleGoBack = useCallback(
    config => {
      navigate(-1, { state: locState, ...config });
    },
    [navigate, locState]
  );

  const renderBackArrow = () => (
    <IconButton
      onClick={() => handleGoBack({ replace: true })}
      sx={{ ml: -6, mt: 2 }}
    >
      <img src={backarrow} alt="backarrow" id="backArrow" />
    </IconButton>
  );

  const closeSnackBar = useCallback((e, reason) => {
    if (reason === "clickaway") return;

    setSnackbar(snackbar =>
      snackbar.open
        ? {
            ...snackbar,
            open: false
          }
        : snackbar
    );
  }, []);

  const setSnackBar = useCallback(
    (
      snackbar = {
        autoHideDuration: 10000,
        message: "Something went wrong!"
      },
      withDelay
    ) => {
      const config = {
        open: true,
        ...(snackbar.message
          ? snackbar
          : {
              message: snackbar
            })
      };
      if (withDelay) {
        const taskId = setTimeout(() => {
          setSnackBar(config);
          clearTimeout(taskId);
        }, 500);
      } else setSnackbar(config);
    },
    []
  );

  useEffect(() => {
    if (pathname) closeSnackBar();
  }, [pathname, closeSnackBar]);

  useEffect(() => {
    http.interceptors.response.use(
      res => res,
      err => {
        if (err.status === 403) {
          console.log(err, " in app 403 ");
          navigate(`/auth/login?redirect=${createRelativeUrl()}`, {
            state: locState
          });

          setSnackBar(
            err.code === HTTP_CODE_ACCOUNT_VERIFICATION_ERROR
              ? err.message
              : "You need to login! Session timeout.",
            true
          );
        }
        return Promise.reject(err);
      }
    );
  }, [locState, navigate, setSnackBar]); 

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "*": { fontFamily },
          svg: { cursor: "pointer" },
          a: { textDecoration: "none" },
          [INPUT_AUTOFILL_SELECTOR]: {
            backgroundColor: "transparent",
            transition: "background-color 5000s ease-in-out 0s",
            textFillColor: theme.palette.text.primary,
            caretColor: theme.palette.text.primary
          }
        }}
      />
      <Provider
        value={{ setSnackBar, locState, handleGoBack, renderBackArrow }}
      >
        <Routes>
          <Route path="/auth">
            <Route
              path="login"
              element={
                <LoginAndOut key="login">
                  <Login />
                </LoginAndOut>
              }
            />
            <Route
              path="signup"
              element={
                <LoginAndOut key="signup">
                  <Signup />
                </LoginAndOut>
              }
            />
            <Route
              path="account-success"
              element={<AuthSuccess key="account" />}
            />
            <Route path="recover-password" element={<RecoverPwd />} />
            <Route
              path="token-verification/:reason"
              element={<TokenVerification />}
            />
            <Route path="reset-password" element={<ResetPwd />} />
            <Route
              path="reset-password-success"
              element={
                <AuthSuccess key="reset-pwd-success" reason="password" />
              }
            />
            <Route path="*" element={<Page404 />} />
          </Route>
          <Route path="/u/*">
            {isLoggedIn ? (
              <>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="*" element={<Page404 />} />
              </>
            ) : (
              <Route path="*" Component={Redirect} />
            )}
          </Route>
          <Route
            path="/Deposit/DepositPage"
            Component={isLoggedIn ? DepositPage : Redirect}
          />

          <Route
            path="/CryptoDetails/masterplanCrypto"
            Component={masterplanCrypto}
          />
          <Route
            path="/CryptoDetails/professionalplanCrypto"
            Component={professionalplanCrypto}
          />
          <Route
            path="/CryptoDetails/starterplanCrypto"
            Component={starterplanCrypto}
          />
          <Route
            path="/ForexDetails/masterplanForex"
            Component={masterplanForex}
          />
          <Route
            path="/ForexDetails/professionalplanForex"
            Component={professionalplanForex}
          />
          <Route
            path="/ForexDetails/StarterplanForex"
            Component={StarterplanForex}
          />
          <Route
            path="/CryptoInvestForms/MasterPlanInvC"
            element={
              isLoggedIn ? (
                <InvestTab
                  investFormProps={{
                    maxAmount: Infinity,
                    minAmount: 101000,
                    duration: 30,
                    tradeType: "crypto",
                    roiPct: 4.0,
                    plan: "master"
                  }}
                />
              ) : (
                <Redirect />
              )
            }
          />
          <Route
            path="/CryptoInvestForms/ProfessionalPlanInvC"
            element={
              isLoggedIn ? (
                <InvestTab
                  investFormProps={{
                    minAmount: 16000,
                    maxAmount: 100000,
                    duration: 20,
                    tradeType: "crypto",
                    roiPct: 3.5,
                    plan: "professional"
                  }}
                />
              ) : (
                <Redirect />
              )
            }
          />
          <Route
            path="/CryptoInvestForms/StarterPlanInvC"
            element={
              isLoggedIn ? (
                <InvestTab
                  investFormProps={{
                    minAmount: 300,
                    maxAmount: 15000,
                    duration: 10,
                    tradeType: "crypto",
                    roiPct: 3.0
                  }}
                />
              ) : (
                <Redirect />
              )
            }
          />
          <Route
            path="/ForexInvestForms/MasterPlanInvF"
            element={
              isLoggedIn ? (
                <InvestTab
                  investFormProps={{
                    minAmount: 51000,
                    maxAmount: 100000,
                    duration: 21,
                    plan: "master"
                  }}
                />
              ) : (
                <Redirect />
              )
            }
          />
          <Route
            path="/ForexInvestForms/ProfessionalPlanInvF"
            element={
              isLoggedIn ? (
                <InvestTab
                  investFormProps={{
                    minAmount: 11000,
                    maxAmount: 50000,
                    duration: 14,
                    plan: "professional"
                  }}
                />
              ) : (
                <Redirect />
              )
            }
          />
          <Route
            path="/ForexInvestForms/StarterPlanInvF"
            element={isLoggedIn ? <InvestTab /> : <Redirect />}
          />
          <Route path="/Withdraw/WithdrawPage" Component={WithdrawPage} />
          <Route
            path="/Invest/InvestPage"
            Component={isLoggedIn ? InvestPage : Redirect}
          />
          <Route
            path="/CaltexCompanyBrief/CaltexCompBrief"
            Component={isLoggedIn ? CaltexCompBrief : Redirect}
          />
          <Route
            path="/Deposit/DepositPage"
            Component={isLoggedIn ? DepositPage : Redirect}
          />
          <Route
            path="/DepositForm/DepositsForm"
            exact
            Component={isLoggedIn ? DepositsForm : Redirect}
          />
          <Route path="/" element={<Navigate to="/u/dashboard" />} />
        </Routes>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={snackbar.autoHideDuration || 8000}
          onClose={
            snackbar.closeSnackBar === undefined ? closeSnackBar : undefined
          }
          sx={{
            maxWidth: snackbar.maxWidth || "400px",
            "&::first-letter": {
              textTransform: "uppercase"
            }
          }}
        >
          <Alert
            severity={snackbar.severity || "error"}
            action={
              <IconButton onClick={closeSnackBar}>
                <AiOutlineClose />
              </IconButton>
            }
            sx={{
              whiteSpace: "pre-line"
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
