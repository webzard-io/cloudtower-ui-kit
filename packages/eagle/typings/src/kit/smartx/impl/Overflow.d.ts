import React from "react";
declare const Overflow: React.FC<{
    overflow: React.ReactNode;
    offset?: number;
    depend?: string;
}>;
export declare const ExtraOverflow: React.FC<{
    extraEl: (sliceEnd: number) => React.ReactNode;
    els: React.ReactNode[];
    className?: string;
    deps?: unknown[];
    reverse?: boolean;
}>;
export default Overflow;
