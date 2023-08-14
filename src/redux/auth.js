import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  oAuthToken: "",
  userName: {},
  userData: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.oAuthToken = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { setUserToken, setUserName } = authSlice.actions;

export default authSlice.reducer;
