import { createSlice } from "@reduxjs/toolkit";
import http from "../../api/http";

export const defaultUser = {};

const initialState = {
  currentUser: defaultUser
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    signinUser(state, { payload }) {
      state.currentUser = payload;
    },
    signoutUser(state, { payload }) {
      if (state.currentUser.isLogin)
        http
          .patch("/auth/signout", {}, { _noRefresh: true })
          .then(res => console.log("signed out successful!"))
          .catch(err => console.log(err));

      state.currentUser = {
        accountExpires: state.currentUser.accountExpires
      };
    }
  }
});

export const { signinUser, signoutUser } = userSlice.actions;

export default userSlice.reducer;
