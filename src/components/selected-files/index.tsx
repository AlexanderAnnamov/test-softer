import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setWarningDoubleFile, selectUploadFiles } from "../../redux/upload-files/slice";

import SelectedFileItem from "../selected-file-item";

import styles from "./selected-files.module.scss";

const SelectedFiles: React.FC = () => {

  const {handleFiles, warningDoubleFile} = useSelector(selectUploadFiles);

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
        {handleFiles.length === 0 && (
          <>Тут будет очередь из выбранных файлов! &#128539;</>
        )}
        {warningDoubleFile && <>Ты пытаешься загрузить одинаковые файлы! 😡</>}
      </div>
      <div className={styles.previewUpFiles}>
        {handleFiles.map((obj, idx) => (
          <SelectedFileItem
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

export default SelectedFiles;
