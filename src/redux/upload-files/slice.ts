import { createSlice } from "@reduxjs/toolkit";

interface UploadFilesState {
  handleFiles: any,
  warningDoubleFile: boolean,
  counterSuccessUp: number,
  isLoading: boolean,
}

const initialState: UploadFilesState = {
  handleFiles: [],
  warningDoubleFile: false,
  counterSuccessUp: 0,
  isLoading: false,
};

export const uploadFilesSlice = createSlice({
  name: "uploadFiles",
  initialState, 
  reducers: {
    setHandleFiles: (state, action) => {
      if (state.handleFiles.find((item) => item.name === action.payload.name)) {
        console.log("Такой файл уже есть!");
        state.warningDoubleFile = true;
      } else {
        state.warningDoubleFile = false;
        state.handleFiles.push(action.payload);
      }
    },
    removeHandleFile: (state, action) => {
      state.handleFiles = state.handleFiles.filter((item) => {
        return item.name !== action.payload;
      });
    },
    resetSession: (state) => {
      state.handleFiles = [];
      state.counterSuccessUp = 0;
    },
    
    setWarningDoubleFile: (state, action) => {
      state.warningDoubleFile = action.payload;
    },
    setCounterSuccessUp: (state) => {
      state.counterSuccessUp += 1;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const selectUploadFiles = (state) => state.uploadFiles;

export default uploadFilesSlice.reducer;

export const {
  setHandleFiles,
  removeHandleFile,
  resetSession,
  // setRequestFiles,
  // removeRequestFile,
  setWarningDoubleFile,
  setCounterSuccessUp,
  setIsLoading,
} = uploadFilesSlice.actions;
