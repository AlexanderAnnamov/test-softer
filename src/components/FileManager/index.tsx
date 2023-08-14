import React from "react";

import { useContextMenu } from "../../hooks/useContextMenu";
import { ContextMenuItem } from "../../context/ContextMenu/ContextMenu.context";
import { useSelector, useDispatch } from "react-redux";
import { setRequestFiles } from "../../redux/uploadFiles";

import FileItem from "../FileItem";
import FileSkeleton from "./FileSkeleton";

import styles from "./File.module.scss";

const FileManager: React.FC = () => {

  const success = useSelector((state: any) => state.uploadFiles.counterSuccessUp);
  const files = useSelector((state: any) => state.uploadFiles.requestFiles);
  const token = useSelector((state: any) => state.token.oAuth);
  const [isLoading, setIsLoading] = React.useState(false);
  const { setContextMenu } = useContextMenu();
  const skeletons = [...new Array(6)].map((_, index) => (
    <FileSkeleton key={index} />
  ));
  const dispatch = useDispatch();

  const contextMenu = React.useMemo<ContextMenuItem[]>(() => [

    { name: "Новый файл",onClick: () => console.log('New file')},
    { name: "Текстовый документ", onClick: () => console.log('Text file')},
    { name: "Таблица", onClick: () => console.log('Table file') },
    { name: "Презентация", onClick: () => console.log('PP file') },
    
  ], []);

  const handleContextMenu = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      const { clientX, clientY } = event;
      setContextMenu(contextMenu, [clientX, clientY]);
    },
    [setContextMenu, contextMenu]
  );

  React.useEffect(() => {
    console.log("Request public files for FileManager");
    setIsLoading(true);
    if (token) {
      fetch(
        "https://cloud-api.yandex.net/v1/disk/resources/files?limit=30&media_type=audio,video,document,image,text,web",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      )
        .then((res) => res.json())
        .then((response) => {
          setIsLoading(false);
          dispatch(setRequestFiles(response.items));
        });
    }
  }, [token, success]);

  return (
    <div onContextMenu={handleContextMenu} className={styles.manager}>
      <div className={styles.container}>
        <div className={styles.manager__items}>
          {isLoading
            ? skeletons
            : files?.map((obj:any, idx:any) => (
                <FileItem
                  key={obj?.sha256}
                  name={obj?.name}
                  downloadUrl={obj?.file}
                  extentionFile={obj?.media_type}
                  previewFile={obj?.preview}
                  path={obj?.path}
                  idx={idx}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default FileManager;
