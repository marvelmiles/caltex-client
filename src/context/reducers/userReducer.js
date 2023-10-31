import { createSlice } from "@reduxjs/toolkit";
import http from "../../api/http";
import { deleteCookie } from "../../utils";
import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN
} from "../../config/constants";

export const defaultUser = {
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  phone: [],
  address: { city: "", zipCode: "" },
  referralCode: "",
  referredBy: null,
  roi: 0
};

const initialState = {
  currentUser: defaultUser
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    signinUser(state, { payload }) {
      state.currentUser = {
        ...payload,
        referralCode: payload.referralCode,
        referredBy: payload.referredBy
      };
    },
    signoutUser(state, { payload }) {
      if (state.currentUser.isLogin) {
        deleteCookie(COOKIE_ACCESS_TOKEN);
        deleteCookie(COOKIE_REFRESH_TOKEN);

        http
          .patch("/auth/signout", {}, { _noRefresh: true })
          .then(res => console.log("signed out successfully!"))
          .catch(err => console.log(err));
      }

      state.currentUser = {
        accountExpires: state.currentUser.accountExpires
      };
    },
    updateUser(state, { payload }) {
      // Update the user's profile properties here based on payload.
      state.currentUser = {
        ...state.currentUser,
        ...payload
      };
    },
    updateROI(state, { payload }) {
      state.currentUser.roi = payload.roi; // Update the user's ROI based on payload
    }
  }
});

export const {
  signinUser,
  signoutUser,
  updateUser,
  updateROI
} = userSlice.actions;

export default userSlice.reducer;
