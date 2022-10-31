import React, { BaseSyntheticEvent } from "react";
export declare type TableRenderer<T, C> = (cell: T, record: C, index: number) => React.ReactNode;
export declare function arrayMove<T>(arr: T[], fromIndex: number, toIndex: number): T[];
export declare function handleColumnsByKeys<T extends string>(totalKeys: T[], columnKeys: Array<T | "*">): T[];
export declare function eventStopPropagation(event: BaseSyntheticEvent): void;
export declare const BLANK_COLUMN: {
    title: string;
    key: string;
    dataIndex: string;
    className: string;
};
export declare function canScroll(el: Element, direction?: string): boolean;
export declare const useTableBodyHasScrollBar: (tableBodyEl?: React.MutableRefObject<HTMLDivElement | null>, data?: unknown) => boolean;
export declare function tableScrollToTop(ref: React.MutableRefObject<HTMLDivElement | null>): void;
declare type TableScrollConfig = {
    x?: string | number;
    y?: string | number;
} | undefined;
export declare const useTransformScrollAndColumns: <T>(tableProps: {
    wrapper?: React.MutableRefObject<HTMLDivElement | null> | undefined;
    loading?: boolean | undefined;
    rowSelection?: unknown;
    data?: unknown;
    tableKey?: string | undefined;
    uniqueKey?: string | undefined;
    stickyHeader?: boolean | undefined;
    columns: T[];
    scroll?: "auto" | {
        x?: string | number | boolean | undefined;
        y?: string | number | boolean | undefined;
    } | "autoHeight" | undefined;
}) => [TableScrollConfig, T[]];
export {};
