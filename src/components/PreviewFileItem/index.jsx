import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { removeHandleFile } from "../../redux/uploadFiles";
import { extention } from "../FileItem";

import deleteImg from "../../assets/img/delete-preview.svg";
import loadingImg from "../../assets/img/loading.gif";

import styles from "./PreviewFileItem.module.scss";

const PreviewFileItem = ({ name, date, size, type }) => {
  const isLoading = useSelector((state) => state.uploadFiles.isLoading);
  const dispatch = useDispatch();

  const removeElement = (name) => {
    dispatch(removeHandleFile(name));
  };

  return (
    <div className={styles.previewFileItem}>
      <div
        className={
          styles.previewFileItem__icon + " " + styles.previewFileItem__item
        }
      >
        <img
          className={styles.previewFileItem__img}
          src={extention[type] == "" ? extention[""] : extention[type]}
          alt="preview-file-icon"
        ></img>
        <h2 className={styles.previewFileItem__text}>{name}</h2>
      </div>
      <div className={styles.previewFileItem__item}>
        <h2 className={styles.previewFileItem__text}>
          {date.number}.0{date.month + 1}.{date.year}:{date.hours}:
          {date.minutes}
        </h2>
      </div>
      <div className={styles.previewFileItem__item}>
        <h2 className={styles.previewFileItem__text}>{size} Б</h2>
      </div>
      <div
        onClick={() => removeElement(name)}
        className={styles.previewFileItem__btn_delete}
      >
        <img
          className={styles.previewFileItem__delete_img}
          src={deleteImg}
          alt="delete-icon"
        ></img>
        {isLoading && (
          <div className={styles.previewFileItem__loading}>
            <img src={loadingImg} alt="loading..."></img>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewFileItem;
