import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { selectUploadFiles } from "../../redux/uploadFiles";

import {
  setWarningDoubleFile,
  removeHandleFile,
  resetSession,
  setCounterSuccessUp,
  setIsLoading,
} from "../../redux/uploadFiles";

import styles from "./FileUploadPanel.module.scss";

export const FileUploadPanel: React.FC = () => {
  
  const token = useSelector((state: any) => state.auth.oAuthToken);
  const {handleFiles, isLoading} = useSelector(selectUploadFiles);

  const dispatch = useDispatch();

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
    if (handleFiles.length === 0) {
      dispatch(setIsLoading(false));
    }
  });

  return (
    <div className={styles.fileUploadPanel}>
      <div className={styles.fileUploadPanel__items}>
        <button
          onClick={() => uploadFiles(handleFiles)}
          disabled={handleFiles.length === 0 || isLoading}
          className={
            styles.fileUploadPanel__upload + " " + styles.fileUploadPanel__btn
          }
        >
          Загрузить
        </button>
        <button
          onClick={isLoading ? cancelRequest : resetFiles}
          className={
            styles.fileUploadPanel__cancel + " " + styles.fileUploadPanel__btn
          }
        >
          {isLoading ? <>Отменить</> : <>Сбросить</>}
        </button>
      </div>
    </div>
  );
};
