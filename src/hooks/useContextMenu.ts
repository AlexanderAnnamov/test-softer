
import {useContext} from "react";
import { ContextMenu } from "../context/ContextMenu/ContextMenu.context";

 const useContextMenu = () => useContext(ContextMenu);

 export {useContextMenu}