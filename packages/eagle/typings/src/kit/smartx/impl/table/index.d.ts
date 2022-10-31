/// <reference types="react" />
import { TableProps } from "@cloudtower/eagle/kit/specify";
export declare const tableStyleCover: import("@linaria/core").LinariaClassName;
declare const Table: <T extends {
    id: string;
}>(props: TableProps<T>) => JSX.Element;
export default Table;
export * from "./common";
export * from "./customize-column";
export * from "./CustomizeColumn";
export { default as CustomizeColumn } from "./CustomizeColumn";
export * from "./HeaderCell";
export { default as HeaderCell } from "./HeaderCell";
export * from "./PendingTable";
export { default as PendingTable } from "./PendingTable";
export * from "./SearchWidget";
export * from "./SidebarTable";
export { default as SidebarTable } from "./SidebarTable";
export * from "./TableSelection";
export * from "./TableWidget";
