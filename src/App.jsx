import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import DashboardPage from "./components/dashboard/DashboardPage";
import DepositPage from "./components/Deposit/DepositPage";
import InvestPage from "./components/Invest/InvestPage";
import WithdrawPage from "./components/Withdraw/WithdrawPage";
import StarterPlanInvF from "./components/ForexInvestForms/StarterPlanInvF";
import ProfessionalPlanInvF from "./components/ForexInvestForms/ProfessionalPlanInvF";
import MasterPlanInvF from "./components/ForexInvestForms/MasterPlanInvF";
import StarterPlanInvC from "./components/CryptoInvestForms/StarterPlanInvC";
import ProfessionalPlanInvC from "./components/CryptoInvestForms/ProfessionalPlanInvC";
import MasterPlanInvC from "./components/CryptoInvestForms/MasterPlanInvC";
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
import { useSelector } from "react-redux";
import Redirect from "./components/Redirect";
import Page404 from "./pages/Page404";
import useAuth from "./hooks/useAuth";
import Profile from "./components/dashboard/profile/Profile";
import Investment from "./components/dashboard/investment/Investment";
import LegalDocument from "./components/dashboard/legalDocument/LegalDocument";
import Help from "./components/dashboard/help/Help";

const App = () => {
  const [theme] = useState(createTheme());
  const [snackbar, setSnackbar] = useState({});

  // defualt prop = user

  let { state: locState, pathname } = useLocation();
  locState = locState || {};

  const { isLoggedIn } = useAuth(locState.user);

  const closeSnackBar = useCallback(() => {
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
        message: "You need to login!"
      },
      close
    ) => {
      setSnackbar({
        open: true,
        ...(snackbar.message
          ? snackbar
          : {
              message: snackbar,
              close
            })
      });
    },
    []
  );

  useEffect(() => {
    if (pathname) closeSnackBar();
  }, [pathname, closeSnackBar]);

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
      <Provider value={{ setSnackBar, locState }}>
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
              <Route path="*" element={<Redirect to="/auth/login" />} />
            )}
          </Route>

          {/* <Route path="dashboard" element={<DashboardPage />} /> */}

          <Route path="/profile/Profile" Component={Profile} />

          <Route path="/investment/Investment" Component={Investment} />

          <Route
            path="/legalDocument/LegalDocument"
            Component={LegalDocument}
          />

          <Route path="/help/Help" Component={Help} />

          <Route path="/Deposit/DepositPage" Component={DepositPage} />
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
            Component={MasterPlanInvC}
          />
          <Route
            path="/CryptoInvestForms/ProfessionalPlanInvC"
            Component={ProfessionalPlanInvC}
          />
          <Route
            path="/CryptoInvestForms/StarterPlanInvC"
            Component={StarterPlanInvC}
          />
          <Route
            path="/ForexInvestForms/MasterPlanInvF"
            Component={MasterPlanInvF}
          />
          <Route
            path="/ForexInvestForms/ProfessionalPlanInvF"
            Component={ProfessionalPlanInvF}
          />
          <Route
            path="/ForexInvestForms/StarterPlanInvF"
            Component={StarterPlanInvF}
          />
          <Route path="/Withdraw/WithdrawPage" Component={WithdrawPage} />
          <Route path="/Invest/InvestPage" Component={InvestPage} />
          <Route path="/Deposit/DepositPage" Component={DepositPage} />
          <Route
            path="/DepositForm/DepositsForm"
            exact
            Component={DepositsForm}
          />

          <Route path="/" element={<Navigate to="/u/dashboard" />} />
        </Routes>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={
            snackbar.autoHideDuration ||
            (snackbar.severity === "success" ? 5000 : 10000)
          }
          onClose={snackbar.close ? closeSnackBar : undefined}
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
