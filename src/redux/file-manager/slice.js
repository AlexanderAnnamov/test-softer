import { createSlice } from "@reduxjs/toolkit";

// import { FileManagerState, Status } from "./types";
// import { fetchFiles } from "./asyncActions";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import axios from "axios";

// import { FileItem } from "./types";

// import pickBy from 'lodash/pickBy';
// import identity from 'lodash/identity';

export const fetchFiles = createAsyncThunk(
  "fileManager/fetchFileManagerStatus",
  async () => {
    const token = useSelector((state) => state.auth.oAuthToken);

    const { data } = await fetch(
      "https://cloud-api.yandex.net/v1/disk/resources/files?limit=30&media_type=audio,video,document,image,text,web",
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
      }
    );
    console.log("fetch", data);

    return data;
  }
);

const initialState = {
  requestFiles: [],
  isLoading: false,
  status: "loading",
};
// as FileManagerState;

export const fileManagerSlice = createSlice({
  name: "fileManager",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setRequestFiles: (state, action) => {
      state.requestFiles = action.payload;
    },
    removeRequestFile: (state, action) => {
      state.requestFiles = state.requestFiles.filter((item) => {
        return item !== state.requestFiles[action.payload];
      });
    },
  },
  extraReducers: {
    [fetchFiles.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.requestFiles = [];
    },
  },
  //     builder.addCase(fetchFiles.fulfilled, (state, action) => {
  //       state.requestFiles = action.payload;
  //       state.status = Status.SUCCESS;
  //     });

  //     builder.addCase(fetchFiles.rejected, (state, action) => {
  //       state.status = Status.ERROR;
  //       state.requestFiles = [];
  //     });
  //   },
  // }
});

export default fileManagerSlice.reducer;

export const { setIsLoading, setRequestFiles, removeRequestFile } =
  fileManagerSlice.actions;
