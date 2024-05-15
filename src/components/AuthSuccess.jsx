import { useEffect } from "react";
import AuthLayout from "../components/AuthLayout";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "../components/CountdownTimer";
import useAuth from "../hooks/useAuth";
import { useCtx } from "../context";
import { updateUser } from "../context/reducers/userReducer";
import { useDispatch } from "react-redux";

const AuthSuccess = ({ reason = "account", message = "" }) => {
  const isPwd = reason === "password";

  message = `Congratulations! Your ${
    isPwd ? "password has been reset" : "account has been verified"
  } successfully.`;

  const {
    locState: { hasResetPwd },
  } = useCtx();

  const { accVerified } = useAuth();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authProps = (isPwd ? hasResetPwd : accVerified)
    ? {
        title: isPwd ? "Password Reset" : "Account Verification",
        btnTitle: "Login",
        onBtnClick: () => navigate("/auth/login"),
        preInputsEl: <Typography sx={{ my: 3 }}>{message}</Typography>,
      }
    : {
        title: "Forbidden access!",
        preInputsEl: (
          <Typography sx={{ textAlign: "center" }}>
            You aren't authorize to view this page and will be redirected in{" "}
            <CountdownTimer
              delay={10}
              onTimeUp={() => navigate(`/auth/token-verification/${reason}`)}
            />
          </Typography>
        ),
      };

  useEffect(() => {
    dispatch(
      updateUser({
        _sentTokenVerification: true,
      })
    );
  }, [dispatch]);

  return <AuthLayout {...authProps} />;
};

export default AuthSuccess;
