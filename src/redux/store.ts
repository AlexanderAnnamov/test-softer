import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import uploadFilesReducer from "./uploadFiles";
import fileManagerReducer from "./fileManager";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    uploadFiles: uploadFilesReducer,
    fileManager: fileManagerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
