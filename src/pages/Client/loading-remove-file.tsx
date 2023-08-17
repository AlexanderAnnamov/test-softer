import React from "react";

import styles from "./client.module.scss";

const LoadingRemoveFile = () => {
  return (
    <div className={styles.loadingRemove}>
      <p>Удаление</p>
      <div className={styles.loader}></div>
    </div>
  );
};

export default LoadingRemoveFile;
