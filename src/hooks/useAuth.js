import { useSelector } from "react-redux";
import { useCtx } from "../context";

const useAuth = user => {
  const {
    locState: { user: locStateUser = {} }
  } = useCtx() || {
    locState: { user }
  };

  const currentUser = useSelector(({ user: { currentUser } }) => currentUser);

  return {
    currentUser,
    locStateUser,
    accVerified: currentUser.accountExpires === null || !!locStateUser,
    isLoggedIn: currentUser.isLogin || !!currentUser.id
  };
};

export default useAuth;
