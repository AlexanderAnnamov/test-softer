import React from "react";

export interface ContextMenuItem {
    name: string;
    onClick: () => void;
}

interface ContextMenuModel {
    setContextMenu:(items: ContextMenuItem[], position:number[]) => void;
}

 const ContextMenu = React.createContext<ContextMenuModel>({
    setContextMenu: () => {},
})

export {ContextMenu}