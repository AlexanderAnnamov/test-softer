import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

export const fileManagerSlice = createSlice({
  name: "fileManager",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export default fileManagerSlice.reducer;

export const { setIsLoading } = fileManagerSlice.actions;
