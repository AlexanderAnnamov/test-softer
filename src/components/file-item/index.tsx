import React from "react";
import { useSelector, useDispatch } from "react-redux";

import imageImg from "../../assets/img/image.svg";
import musicImg from "../../assets/img/music.svg";
import unknownImg from "../../assets/img/unknown.png";
import videoImg from "../../assets/img/video.png";
import documentImg from "../../assets/img/document.svg";

import { removeRequestFile } from "../../redux/file-manager/slice";
import { setIsLoading } from "../../redux/file-manager/slice";
import { useContextMenu } from "../../hooks/useContextMenu";

import styles from "./file-item.module.scss";

export const extention = {
  image: imageImg,
  audio: musicImg,
  video: videoImg,
  document: documentImg,
  "application/pdf": documentImg,
  "image/jpeg": imageImg,
  "audio/mpeg": musicImg,
  "video/mp4": videoImg,
  "application/msword": documentImg,
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    documentImg,
  "": unknownImg,
};

 type FileItemProps = {
  name: string,
  downloadUrl: string,
  extentionFile: string,
  previewFile: string,
  path: string,
  idx: number
}

const FileItem: React.FC<FileItemProps> = ({name, downloadUrl, extentionFile, previewFile, path, idx}) => {

  const token = useSelector((state: any) => state.auth.oAuthToken);
  const dispatch = useDispatch();

  const pathUrl = path.split("/")[1];

  const { setContextMenu } = useContextMenu();

  const downloadFile = (url: string) => {
    window.open(url);
  };

  const deleteFile = async (path: string) => {
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
      },
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
        deleteFile(pathUrl);
      },
    },
  ],[]);

  const handleContextMenu = React.useCallback(
    (event) => {
      event.preventDefault();
      event?.stopPropagation();
      const { clientX, clientY } = event;
      setContextMenu(contextMenu, [clientX, clientY]);
    },
    [setContextMenu, contextMenu],
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
