import { createContext } from "react";

export interface ContextMenuItem {
    name: string;
    onClick: () => void;
}

interface ContextMenuModel {
    setContextMenu:(items: ContextMenuItem[], position:number[]) => void;
}

 const ContextMenu = createContext<ContextMenuModel>({
    setContextMenu: () => {},
})

export {ContextMenu}