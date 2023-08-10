import React from "react";
import styles from "./Client.module.scss";

const LoadingRemove = () => {
  return (
    <div className={styles.loadingRemove}>
      <p>Удаление</p>
      <div className={styles.loader}></div>
    </div>
  );
};

export default LoadingRemove;
