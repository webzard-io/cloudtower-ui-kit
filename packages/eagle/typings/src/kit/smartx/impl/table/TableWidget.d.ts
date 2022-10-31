import { Maybe, Scalars } from "@cloudtower/eagle/generated/react-hooks";
import { SearchOperation, SetSearch } from "@cloudtower/eagle/kit/specify";
import { SerializableObject } from "@tower/utils";
import { ApolloError } from "apollo-boost";
import React from "react";
export declare const AuxiliaryLine: import("@linaria/react").StyledMeta & React.FunctionComponent<React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement> & Record<string, unknown> & {
    as?: React.ElementType<any> | undefined;
}>;
export declare const TablePagination: <T>(props: {
    count?: number | undefined;
    skip: number;
    size: number;
    setQuery: (val: T | ((val: T) => T), operation?: SearchOperation | undefined) => void;
    onChange?: ((page?: number, size?: number) => void) | undefined;
}) => JSX.Element;
export declare const TableLoading: React.FC;
export declare const TableEmpty: React.FC<{
    query: {
        where?: Maybe<SerializableObject>;
    };
    setQuery: (query: {}) => void;
    base: string;
    clearGlobalSearch?: boolean;
}>;
export declare const TableError: React.FC<{
    error: ApolloError;
    refetch: () => Promise<unknown>;
}>;
export declare const usePosition: <V extends {
    skip?: Maybe<Scalars["Int"]>;
    first?: Maybe<Scalars["Int"]>;
}>(props: {
    wrapper: React.MutableRefObject<HTMLDivElement | null>;
    setQuery: SetSearch<V>;
    defaultSize: number;
    data: unknown;
    elSelector?: {
        row?: string | undefined;
        wrapper?: string | undefined;
    } | undefined;
}) => {
    positionOnCompleted: (count: number) => void;
};
export declare const ColumnTitle: React.FC<{
    sortOrder?: "descend" | "ascend" | null;
    title: React.ReactNode;
}>;
export declare const EmptyRowMenu: React.FC;
