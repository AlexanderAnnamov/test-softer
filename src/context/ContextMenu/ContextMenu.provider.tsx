import React, { useCallback } from "react";

import { ContextMenu, ContextMenuItem } from "./ContextMenu.context";

import styles from "./ContextMenu.module.scss";

const ContextMenuProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {

  const [contextMenuItems, setContextMenuItems] = React.useState<ContextMenuItem[]>();
  const [position, setPosition] = React.useState<number[]>();

  const setContextMenu = React.useCallback((items: ContextMenuItem[], position:number[]) => {
    console.log(items, position);
    setContextMenuItems(items);
    setPosition(position)
  },[]);

  const closeMenu = useCallback(() => {
    setPosition(undefined);
  },[]);

  React.useEffect(() => {
    document.body.addEventListener("click", closeMenu);

    return () => {
      document.body.removeEventListener("click", closeMenu);
    }
  }, [closeMenu]);

  return(
    <ContextMenu.Provider value={{setContextMenu}}>
      {!!position && (
        <ul className={styles.contextMenu}  style={{left:position[0], top:position[1]}}>
          {contextMenuItems?.map((item) => 
            <li
              key={item.name}
              className={styles.contextMenuItem}
              onClick={item.onClick}
            >{item.name}
            </li>,
          )}
        </ul>
      )}{children}
    </ContextMenu.Provider>
  );
};

export{ ContextMenuProvider};