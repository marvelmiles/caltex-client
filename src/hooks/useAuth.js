import { useSelector } from "react-redux";
import { useCtx } from "../context";
import { useDispatch } from "react-redux";
import { signoutUser } from "../context/reducers/userReducer";

const useAuth = user => {
  const {
    locState: { user: locStateUser = {} },
    setSnackBar
  } = useCtx() || {
    locState: { user }
  };

  const currentUser = useSelector(({ user: { currentUser } }) => currentUser);

  const dispatch = useDispatch();

  const handleSignout = e => {
    if (e && (e.currentTarget || e.target).nodeNaem === "FORM") {
      e.preventDefault();
    }
    dispatch(signoutUser());
    setSnackBar("You have been logged out!", true);
  };

  return {
    currentUser,
    locStateUser,
    accVerified: currentUser.accountExpires === null || !!locStateUser,
    isLoggedIn: currentUser.isLogin || !!currentUser.id,
    handleSignout
  };
};

export default useAuth;
