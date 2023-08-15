import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { setWarningDoubleFile } from "../../redux/uploadFiles";

import PreviewFileItem from "../PreviewFileItem";

import styles from "./PreviewUpFiles.module.scss";


const PreviewUpFiles: React.FC = () => {

  const files = useSelector((state: any) => state.uploadFiles.handleFiles);  
  const warningDoubleFile = useSelector((state: any) => state.uploadFiles.warningDoubleFile);
  const helper = styles.previewUpFiles__transparency + " " + styles.previewUpFiles__text;
  const warning = styles.previewUpFiles__warning;
  const dispatch = useDispatch();

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
            date={ 
              `${obj.lastModifiedDate?.getDate()}.0${obj.lastModifiedDate?.getMonth() + 1}.${obj.lastModifiedDate?.getFullYear()}:${obj.lastModifiedDate?.getHours()}:${obj.lastModifiedDate?.getMinutes()}`
            }  
          />
        ))}
      </div>
    </div>
  );
};

export default PreviewUpFiles;
