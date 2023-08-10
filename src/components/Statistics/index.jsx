import React from "react";
import styles from "./Statisticks.module.scss";
import { useSelector } from "react-redux";

const Statistics = () => {
  const files = useSelector((state) => state.uploadFiles.handleFiles);
  const success = useSelector((state) => state.uploadFiles.counterSuccessUp);
  const greenIndicator =
    styles.statistics__text_indicator + " " + styles.statistics__text_green;

  return (
    <div className={styles.statistics}>
      <div className={styles.statistics__inf}>
        <ul className={styles.statistics__row}>
          <li className={styles.statistics__text}>Файлы готовые к загрузке:</li>
          <li
            className={
              files.length !== 0
                ? greenIndicator
                : styles.statistics__text_indicator
            }
          >
            {files.length}
          </li>
        </ul>
        <ul className={styles.statistics__row}>
          <li className={styles.statistics__text}>
            Успешно загруженные файлы:
          </li>
          <li
            className={
              success !== 0 ? greenIndicator : styles.statistics__text_indicator
            }
          >
            {success}
          </li>
        </ul>
        <ul className={styles.statistics__row}>
          <li className={styles.statistics__text}>Ошибки: </li>
          <li className={styles.statistics__text_indicator}>50</li>
        </ul>
      </div>
    </div>
  );
};

export default Statistics;
