import React from "react";
import { useSelector } from "react-redux";

import AppHeader from "../../components/app-header";
import FileManager from "../../components/file-manager";
import DragAndDrop from "../../components/drag-and-drop";
import SelectedFiles from "../../components/selected-files";
import Statistics from "../../components/statistics";
import { FileUploadPanel } from "../../components/file-upload";

import LoadingRemoveFile from "./loading-remove-file";

import styles from "./client.module.scss";

type IClient = {
  logout?: () => void,
}

export const Client: React.FC<IClient> = ({ logout }) => {
  const loading = useSelector((state: any) => state.fileManager.isLoading);
  return (
    <div className={styles.client}>
      {loading ? <LoadingRemoveFile/> : <></>}
      <AppHeader logout={logout} />
      <div className={styles.container}>
        <div className={styles.client__components}>
          <FileManager />
          <div className={styles.client__components_column}>
            <SelectedFiles />
            <Statistics />
            <DragAndDrop />
            <FileUploadPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Client;
