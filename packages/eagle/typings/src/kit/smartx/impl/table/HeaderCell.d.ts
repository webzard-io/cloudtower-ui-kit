import { TableProps } from "@cloudtower/eagle/kit/specify";
import React from "react";
import { CustomizeColumnType } from "./customize-column";
interface HeaderCellProps {
    draggable: boolean;
    resizable: boolean;
    index: number;
    sortable: boolean;
    className: string;
    components: TableProps<{
        id: string;
    }>["components"];
    children?: React.ReactNode;
    auxiliaryLine: React.RefObject<HTMLDivElement>;
    wrapper: React.RefObject<HTMLDivElement>;
    defaultCustomizeColumn: [
        string,
        CustomizeColumnType[] | (() => CustomizeColumnType[])
    ];
    onMouseEnter?: (event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>) => void;
    onMouseLeave?: (event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>) => void;
}
interface HeaderCellComponent {
    (props: HeaderCellProps): React.ReactElement | null;
}
declare const HeaderCell: HeaderCellComponent;
export default HeaderCell;
