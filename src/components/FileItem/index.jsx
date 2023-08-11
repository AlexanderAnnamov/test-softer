import React from "react";
import img from "../../assets/image.svg";
import deleteImg from "../../assets/delete-file.svg";
import download from "../../assets/download.png";
import styles from "./FileItem.module.scss";
import music from "../../assets/music.svg";
import loading from "../../assets/loading.gif";
import unknown from "../../assets/unknown.png";
import video from "../../assets/video.png";
import document from "../../assets/document.svg";
import { useSelector, useDispatch } from "react-redux";
import { removeRequestFile } from "../../redux/uploadFiles";
import { useContextMenu } from "../../hooks/useContextMenu";
import { setIsLoading } from "../../redux/fileManager";

export const extention = {
  image: img,
  audio: music,
  video: video,
  document: document,
  "application/pdf": document,
  "image/jpeg": img,
  "audio/mpeg": music,
  "video/mp4": video,
  "application/msword": document,
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    document,
  "": unknown,
};

const FileItem = ({
  name,
  downloadUrl,
  extentionFile,
  previewFile,
  path,
  idx,
}) => {
  // const [isLoading, setIsLoading] = React.useState(false);
  const token = useSelector((state) => state.token.oAuth);
  const dispatch = useDispatch();
  const moderPath = path.split("/")[1];
  const { setContextMenu } = useContextMenu();

  const downloadFile = (url) => {
    window.open(url);
  };

  const deleteFile = async (path) => {
    console.log(`Request delete file ${path}`);
    dispatch(setIsLoading(true));
    const response = await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources?path=${path}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
      }
    );
    if (response.status === 204) {
      dispatch(setIsLoading(false));
      dispatch(removeRequestFile(idx));
    }
  };

  const contextMenu = React.useMemo(() => [
    {
      name: "Переименовать",
      onClick: () => {},
    },
    {
      name: "Скачать",
      onClick: () => {
        downloadFile(downloadUrl);
      },
    },
    {
      name: "Открыть",
      onClick: () => {},
    },
    {
      name: "Удалить",
      onClick: () => {
        deleteFile(moderPath);
      },
    },
  ]);

  const handleContextMenu = React.useCallback(
    (event) => {
      event.preventDefault();
      event?.stopPropagation();
      const { clientX, clientY } = event;
      setContextMenu(contextMenu, [clientX, clientY]);
    },
    [setContextMenu, contextMenu]
  );

  return (
    <div onContextMenu={handleContextMenu} className={styles.file}>
      <img src={extention[extentionFile]} alt="icon-file" />

      <a className={styles.file__name_url} href={previewFile} target="blank">
        <p className={styles.file__name}>{name}</p>
      </a>
    </div>
  );
};

export default FileItem;
