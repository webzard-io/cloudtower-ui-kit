import React from "react";
import { CustomizeColumnType } from "./customize-column";
declare type CustomizeColumnProps = {
    defaultCustomizeColumn: [
        string,
        CustomizeColumnType[] | (() => CustomizeColumnType[])
    ];
    disabledColumnKeys: string[];
    allColumnKeys?: string[];
    columnTitleMap: Record<string, React.ReactNode | (() => React.ReactNode)>;
    ["data-test-id"]: string;
    customizableColumnKeys?: string[];
};
declare const CustomizeColumn: React.FC<CustomizeColumnProps>;
export default CustomizeColumn;
