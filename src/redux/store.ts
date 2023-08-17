import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import authReducer from "./auth/slice";
import uploadFilesReducer from "./upload-files/slice";
import fileManagerReducer from "./file-manager/slice";
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

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
