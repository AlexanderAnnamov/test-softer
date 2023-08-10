import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: {
    nikName: "",
    country: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
