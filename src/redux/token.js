import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  oAuth: "",
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.oAuth = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserToken } = tokenSlice.actions;

export default tokenSlice.reducer;
