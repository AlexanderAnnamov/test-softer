import React from "react";

import { useSelector } from "react-redux";

import { selectUploadFiles } from "../../redux/uploadFiles";

import styles from "./statistics.module.scss";

const Statistics: React.FC = () => {

  const {handleFiles, counterSuccessUp} = useSelector(selectUploadFiles);
  
  const greenIndicator = styles.statistics__text_indicator + " " + styles.statistics__text_green;

  return (
    <div className={styles.statistics}>
      <div className={styles.statistics__inf}>
        <ul className={styles.statistics__row}>
          <li className={styles.statistics__text}>Файлы готовые к загрузке:</li>
          <li
            className={
              handleFiles.length !== 0
                ? greenIndicator
                : styles.statistics__text_indicator
            }
          >
            {handleFiles.length}
          </li>
        </ul>
        <ul className={styles.statistics__row}>
          <li className={styles.statistics__text}>
            Успешно загруженные файлы:
          </li>
          <li
            className={
              counterSuccessUp !== 0 ? greenIndicator : styles.statistics__text_indicator
            }
          >
            {counterSuccessUp}
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
