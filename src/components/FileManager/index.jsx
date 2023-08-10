import React from "react";
import styles from "./File.module.scss";
import FileItem from "../FileItem";
import { useSelector, useDispatch } from "react-redux";
import { setRequestFiles } from "../../redux/uploadFiles";
import FileSkeleton from "./FileSkeleton";
import { useContextMenu } from "../../hooks/useContextMenu";

const FileManager = () => {
  const token = useSelector((state) => state.token.oAuth);
  const files = useSelector((state) => state.uploadFiles.requestFiles);
  const success = useSelector((state) => state.uploadFiles.counterSuccessUp);
  const dispatch = useDispatch();
  const skeletons = [...new Array(6)].map((_, index) => (
    <FileSkeleton key={index} />
  ));
  const [isLoading, setIsLoading] = React.useState(false);
  const { setContextMenu } = useContextMenu();

  const contextMenu = React.useMemo(() => [
    {
      name: "Новый файл",
      onClick: () => {},
    },
    { name: "Текстовый документ", onClick: () => {} },
    { name: "Таблица", onClick: () => {} },
    { name: "Презентация", onClick: () => {} },
  ]);

  const handleContextMenu = React.useCallback(
    (event) => {
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
            : files?.map((obj, idx) => (
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
