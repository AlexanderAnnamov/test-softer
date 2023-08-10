import React from "react";
import styles from "./PreviewUpFiles.module.scss";
import PreviewFileItem from "../PreviewFileItem";
import { useSelector, useDispatch } from "react-redux";
import { setWarningDoubleFile } from "../../redux/uploadFiles";

const PreviewUpFiles = () => {
  const files = useSelector((state) => state.uploadFiles.handleFiles);
  const warningDoubleFile = useSelector(
    (state) => state.uploadFiles.warningDoubleFile
  );
  const dispatch = useDispatch();
  const helper =
    styles.previewUpFiles__transparency + " " + styles.previewUpFiles__text;
  const warning = styles.previewUpFiles__warning;

  const setWarning = () => {
    dispatch(setWarningDoubleFile(false));
  };

  return (
    <div className={styles.wrapper_transparency}>
      <div
        onClick={warningDoubleFile ? setWarning : () => {}}
        className={warningDoubleFile ? warning : helper}
      >
        {files.length == 0 && (
          <>Тут будет очередь из выбранных файлов! &#128539;</>
        )}
        {warningDoubleFile && <>Ты пытаешься загрузить одинаковые файлы! 😡</>}
      </div>
      <div className={styles.previewUpFiles}>
        {files.map((obj, idx) => (
          <PreviewFileItem
            key={idx}
            name={obj.name}
            size={obj.size}
            type={obj.type}
            idx={idx}
            date={{
              number: obj.lastModifiedDate?.getDate(),
              year: obj.lastModifiedDate?.getFullYear(),
              month: obj.lastModifiedDate?.getMonth(),
              hours: obj.lastModifiedDate?.getHours(),
              minutes: obj.lastModifiedDate?.getMinutes(),
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PreviewUpFiles;
