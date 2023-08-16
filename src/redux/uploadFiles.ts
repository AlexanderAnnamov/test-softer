import { createSlice } from "@reduxjs/toolkit";

type FileItem = {
  name: string,
  downloadUrl: string,
  extentionFile: string,
  previewFile: string,
  path: string,
  idx: number
}

interface UploadFilesState {
  handleFiles: any,
  requestFiles: FileItem[],
  warningDoubleFile: boolean,
  counterSuccessUp: number,
  isLoading: boolean,
}

const initialState: UploadFilesState = {
  handleFiles: [],
  requestFiles: [],
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
    setRequestFiles: (state, action) => {
      state.requestFiles = action.payload;
    },
    removeRequestFile: (state, action) => {
      state.requestFiles = state.requestFiles.filter((item) => {
        return item !== state.requestFiles[action.payload];
      });
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
  setRequestFiles,
  removeRequestFile,
  setWarningDoubleFile,
  setCounterSuccessUp,
  setIsLoading,
} = uploadFilesSlice.actions;
