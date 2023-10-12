import { createSlice } from "@reduxjs/toolkit";
import http from "../../api/http";

export const defaultUser = {
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  phone: [],
  address: { city: "", zipCode: "" }
};

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
    },
    updateUser(state, { payload }) {
      // Update the user's profile properties here based on payload.
      state.currentUser = {
        ...state.currentUser,
        ...payload
      };
    }
  }
});

export const { signinUser, signoutUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
