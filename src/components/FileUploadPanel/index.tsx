import React from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  setWarningDoubleFile,
  removeHandleFile,
  resetSession,
  setCounterSuccessUp,
  setIsLoading,
} from "../../redux/uploadFiles";

import styles from "./FileUploadPanel.module.scss";

export const FileUploadPanel: React.FC = () => {
  
  const token = useSelector((state: any) => state.token.oAuth);
  const files = useSelector((state: any) => state.uploadFiles.handleFiles);
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.uploadFiles.isLoading);
  const controller = new AbortController();

  const resetFiles = () => {
    dispatch(setWarningDoubleFile(false));
    dispatch(resetSession());
  };

  const uploadUrl = async (url: string, file: any) => {
    console.log("Request uploadFiles put FILE");
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(url, {
      signal: controller.signal,
      method: "PUT",
      body: formData,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (response.status === 201) {
      console.log(response);
      dispatch(removeHandleFile(file.name));
      dispatch(setCounterSuccessUp());
    } else {
    }
  };

  const uploadFiles = async (files: any) => {
    console.log("Request uploadFiles get URL");
    dispatch(setIsLoading(true));
    files.map(async (item: any) => {
      const responseUrl = await fetch(
        `https://cloud-api.yandex.net/v1/disk/resources/upload?path=${item.name}&overwrite=false`,
        {
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        },
      );

      if (responseUrl.status === 200) {
        const data = await responseUrl.json();
        uploadUrl(data.href, item);
      }
    });
  };

  const cancelRequest = () => {
    controller.abort();
    dispatch(setIsLoading(false));
  };

  React.useEffect(() => {
    if (files.length === 0) {
      dispatch(setIsLoading(false));
    }
  });

  return (
    <div className={styles.fileUploadPanel}>
      <div className={styles.fileUploadPanel__items}>
        <button
          onClick={() => uploadFiles(files)}
          disabled={files.length === 0 || loading}
          className={
            styles.fileUploadPanel__upload + " " + styles.fileUploadPanel__btn
          }
        >
          Загрузить
        </button>
        <button
          onClick={loading ? cancelRequest : resetFiles}
          className={
            styles.fileUploadPanel__cancel + " " + styles.fileUploadPanel__btn
          }
        >
          {loading ? <>Отменить</> : <>Сбросить</>}
        </button>
      </div>
    </div>
  );
};
