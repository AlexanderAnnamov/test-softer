import { configureStore } from "@reduxjs/toolkit";

import tokenReducer from "./token";
import userReducer from "./user";
import uploadFilesReducer from "./uploadFiles";
import fileManagerReducer from "./fileManager";
export const store = configureStore({
  reducer: {
    token: tokenReducer,
    user: userReducer,
    uploadFiles: uploadFilesReducer,
    fileManager: fileManagerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
