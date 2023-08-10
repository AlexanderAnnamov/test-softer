import React from "react";
import styles from "./DragAndDrop.module.scss";
import { useDispatch } from "react-redux";
import { setHandleFiles } from "../../redux/uploadFiles";

const DragAndDrop = () => {
  const [drag, setDrag] = React.useState(false);
  const [onMouse, setOnMouse] = React.useState(false);
  const dispatch = useDispatch();

  const dragStartHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeavetHandler = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  const mouseOverHandler = (e) => {
    e.preventDefault();
    setOnMouse(true);
  };

  const mouseOutHandler = (e) => {
    e.preventDefault();
    setOnMouse(false);
  };

  const onDropHandler = (e) => {
    e.preventDefault();
    let files = [...e.dataTransfer.files];
    files.map((item) => {
      dispatch(setHandleFiles(item));
    });
    setDrag(false);
  };

  const handleFileAdd = (e) => {
    if (e.target.files) {
      dispatch(setHandleFiles(e.target.files[0]));
    }
  };

  return (
    <div
      className={styles.dragAndDrop}
      onMouseOver={(e) => mouseOverHandler(e)}
      onMouseOut={(e) => mouseOutHandler(e)}
    >
      <div className={styles.container}>
        {onMouse ? (
          <div
            className={
              styles.dragAndDrop__area + " " + styles.dragAndDrop__onMouse
            }
          >
            <div className={styles.handleFile}>
              <div className={styles.handleFile__formLabel}></div>
              <input
                onChange={handleFileAdd}
                type="file"
                name="upload"
                className={styles.handleFile__input}
              />
              Нажми для выбора файла :&#41;
            </div>
          </div>
        ) : drag ? (
          <div
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeavetHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
            onDrop={(e) => onDropHandler(e)}
            className={
              styles.dragAndDrop__area + " " + styles.dragAndDrop__border_yellow
            }
          >
            Отпусти файлы для загрузки :&#41;
          </div>
        ) : (
          <div
            className={
              styles.dragAndDrop__area + " " + styles.dragAndDrop__border_grey
            }
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeavetHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
          >
            Перетащи файлы сюда или нажми для выбора :&#41;
          </div>
        )}
      </div>
    </div>
  );
};

export default DragAndDrop;
