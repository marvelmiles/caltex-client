import React, { useState, useEffect, useCallback } from "react";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate
} from "react-router-dom";
import DashboardPage from "./components/dashboard/DashboardPage";
import Congratulations from "./components/CongratulatoryMessage/Congratulations";
import DepositPage from "./components/Deposit/DepositPage";
import InvestPage from "./components/Invest/InvestPage";
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
import Profile from "./components/dashboard/profile/Profile";
import Investment from "./components/dashboard/investment/Investment";
import LegalDocument from "./components/dashboard/legalDocument/LegalDocument";
import Help from "./components/dashboard/help/Help";
import http, { createRelativeUrl } from "./api/http";
import InvestTab from "./components/InvestTab";
import backarrow from "./images/backArrow.png";
import {
  HTTP_CODE_ACCOUNT_VERIFICATION_ERROR,
  VERIFIC_TOKEN_TIMER,
  HOME_ORIGIN
} from "./config/constants";
import CaltexCompBrief from "./components/CaltexCompanyBrief/CaltexCompBrief";
import ManageUsers from "./components/dashboard/adminDashboard/manageUsers/ManageUsers";
import UserInformation from "./components/dashboard/adminDashboard/manageUsers/userInformation/UserInformation";
import ManageDeposits from "./components/dashboard/adminDashboard/ManageDeposits/ManageDeposits";
import ManageWithdrawals from "./components/dashboard/adminDashboard/manageWithdrawals/ManageWithdrawals";
import AddAdmin from "./components/dashboard/adminDashboard/addAdmin/AddAdmin";
import ManageAdmin from "./components/dashboard/adminDashboard/addAdmin/manageAdmin/ManageAdmin";
import { defaultUser } from "./context/reducers/userReducer";
import Loading from "./components/Loading";

// Added Layout component to give more layout structure
// All api to backend should be called with the http module and
// you don't have to directly call the https... the baseUrl is set

// by default. The only thing is you have to change the === to !== in
// devlopment within you computer and change it back to === when about
// to push to keep consitency and avoid recurring issues...

// added admin navigation to menubar
// it is important not to put error message in paragraph text...
// rather the setSnackBar fxn is their to give more better view

const App = () => {
  const [theme] = useState(createTheme());
  const [snackbar, setSnackbar] = useState({});

  const [appCtx, setAppCtx] = useState({
    transactionMetrics: {
      availBalance: 0,
      balance: {
        confirmedTransactions: 0,
        awaitingTransactions: 0,
        rejectedTransactions: 0
      }
    }
  });

  let { state: locState, pathname } = useLocation();
  locState = locState || {
    previewUser: defaultUser
  };

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
      sx={{ ml: -4, mt: 2 }}
    >
      <img src={backarrow} alt="backarrow" />
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
          navigate(
            `/auth/login?${
              window.location.pathname.indexOf("auth") > -1
                ? ""
                : `redirect=${createRelativeUrl()}`
            }`,
            {
              state: locState
            }
          );

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

  if (isLoggedIn) localStorage.removeItem(VERIFIC_TOKEN_TIMER);
  else if (pathname.toLowerCase().indexOf("auth") === -1) {
    window.location.href = HOME_ORIGIN;
    return <Loading fullSize />;
  }

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
            textFillColor: theme.palette.text.primary
          },
          button: {
            cursor: "pointer"
          }
        }}
      />
      <Provider
        value={{
          setSnackBar,
          locState,
          handleGoBack,
          renderBackArrow,
          appCtx,
          setAppCtx
        }}
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
              <Route path="*" element={<Redirect message="" />} />
            )}
          </Route>

          {/* admin routes starts*/}
          <Route
            path="/manageUsers/ManageUsers"
            Component={isLoggedIn ? ManageUsers : Redirect}
          />

          {/* <Route
            path="/userInformation/UserInformation"
            Component={!isLoggedIn ? UserInformation : Redirect}
          /> */}
          <Route
            path="/manageAdmin/ManageAdmin"
            Component={isLoggedIn ? ManageAdmin : Redirect}
          />
          {/* api routes */}

          <Route
            path="/userInformation/UserInformation/:id"
            Component={isLoggedIn ? UserInformation : Redirect}
          />

          <Route
            path="/manageDeposits/ManageDeposits"
            Component={isLoggedIn ? ManageDeposits : Redirect}
          />

          <Route
            path="/manageWithdrawals/ManageWithdrawals"
            Component={isLoggedIn ? ManageWithdrawals : Redirect}
          />

          <Route
            path="/addAdmin/AddAdmin"
            Component={isLoggedIn ? AddAdmin : Redirect}
          />

          <Route
            path="/profile/Profile"
            Component={isLoggedIn ? Profile : Redirect}
          />

          <Route
            path="/investment/Investment"
            Component={isLoggedIn ? Investment : Redirect}
          />

          <Route
            path="/legalDocument/LegalDocument"
            Component={isLoggedIn ? LegalDocument : Redirect}
          />

          <Route path="/help/Help" Component={isLoggedIn ? Help : Redirect} />

          <Route
            path="/CongratulatoryMessage/Congratulations"
            Component={isLoggedIn ? Congratulations : Redirect}
          />

          <Route
            path="/CryptoDetails/masterplanCrypto"
            Component={isLoggedIn ? masterplanCrypto : Redirect}
          />

          <Route
            path="/CryptoDetails/professionalplanCrypto"
            Component={isLoggedIn ? professionalplanCrypto : Redirect}
          />

          <Route
            path="/CryptoDetails/starterplanCrypto"
            Component={isLoggedIn ? starterplanCrypto : Redirect}
          />

          <Route
            path="/ForexDetails/masterplanForex"
            Component={isLoggedIn ? masterplanForex : Redirect}
          />

          <Route
            path="/ForexDetails/professionalplanForex"
            Component={isLoggedIn ? professionalplanForex : Redirect}
          />

          <Route
            path="/ForexDetails/StarterplanForex"
            Component={isLoggedIn ? StarterplanForex : Redirect}
          />

          <Route
            path="/Withdraw/WithdrawPage"
            Component={isLoggedIn ? WithdrawPage : Redirect}
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

          <Route
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
            path="CryptoInvestForms/masterPlanInvC"
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
