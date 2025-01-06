// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {},
  },
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    unsetUserInfo(state) {
      state.userInfo = {};
    },
  },
});

export const { setUserInfo, unsetUserInfo } = userSlice.actions;

export const selectUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;
