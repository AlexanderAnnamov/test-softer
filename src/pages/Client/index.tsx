import React from "react";
import styles from "./Client.module.scss";
import Header from "../../components/Header";
import FileManager from "../../components/FileManager";
import DragAndDrop from "../../components/DragAndDrop";
import PreviewUpFiles from "../../components/PreviewUpFiles";
import Statistics from "../../components/Statistics";
import { FileUploadPanel } from "../../components/FileUploadPanel";
import LoadingRemove from "./LoadingRemove";
import { useSelector } from "react-redux";

type IClient = {
  logout?: () => void,
}

export const Client: React.FC<IClient> = ({ logout }) => {
  const loading = useSelector((state: any) => state.fileManager.isLoading);
  return (
    <div className={styles.client}>
      {loading ? <LoadingRemove/> : <></>}
      <Header logout={logout} />
      <div className={styles.container}>
        <div className={styles.client__components}>
          <FileManager />
          <div className={styles.client__components_column}>
            <PreviewUpFiles />
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
