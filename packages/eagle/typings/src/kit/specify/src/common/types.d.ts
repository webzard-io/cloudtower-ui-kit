/// <reference types="react" />
import { Resources } from "../../../../generated/global-search";
import { ConnectState, MaintenanceModeEnum } from "../../../../generated/react-hooks";
export declare type ExcludeMaybe<T> = Exclude<T extends string | number | boolean ? T : {
    [P in keyof T]-?: T[P] extends (infer U)[] ? ExcludeMaybe<U>[] : T[P] extends Array<infer U> ? ExcludeMaybe<U>[] : ExcludeMaybe<T[P]>;
}, null | undefined>;
export declare type SidebarType = "vm" | "disk" | "alert_rules" | "alerts" | "elfImage" | "vds" | "vmPlacementGroup" | "vmTemplate" | "iscsiLun" | "nic" | "systemVlan" | "vmVlan" | "vmVolume" | "reportTemplate" | "nfsInode" | "snapshotPlan" | "label" | "userAuditLog" | "primaryZone" | "secondaryZone" | "zoneAndZone" | "witnessNode" | "primaryZoneAndWitness" | "secondaryZoneAndWitness" | "userRoleNext" | "consistencyGroup" | "nvmfNamespace" | "systemAuditLog" | "contentLibraryImage" | "contentLibraryVmTemplate" | "backupPlan" | "backupStoreRepository" | "securityGroup" | "everouteCluster";
export declare type Sidebar = {
    type: SidebarType;
    view?: string;
    id: string;
} | undefined;
export declare type MultipleSelectProps<T> = {
    value: string[];
    onChange: (value: string[], object?: T | T[], data?: T[]) => void;
    mode?: "multiple";
};
export declare type SingleSelectProps<T> = {
    value: string;
    onChange: (value: string, object?: T, data?: T[]) => void;
    mode?: "default";
};
export declare type SelectProps<T> = {
    value: SingleSelectProps<T>["value"] | MultipleSelectProps<T>["value"];
    onChange: SingleSelectProps<T>["onChange"] | MultipleSelectProps<T>["onChange"];
    mode?: "default" | "multiple";
};
export declare type CreateVmAction = "create" | "createFromTemplate" | "clone" | "rebuild";
export declare type Topo = {
    resource: "datacenters" | "clusters" | "hosts" | "vm_folders";
    id: string;
} | undefined;
export declare type FormatUnit = "GiB" | "KiB";
export declare type PropsFrom<TComponent> = TComponent extends React.FC<infer Props> ? Props : TComponent extends React.Component<infer Props> ? Props : never;
export declare type PastTime = {
    unit: "h" | "m" | "d";
    value: number;
    disabled?: boolean;
};
export declare type Data = {
    id: string;
    cluster: {
        id: string;
        name: string;
        connect_state?: ConnectState;
    };
    vm?: {
        id: string;
    };
    entityFilter?: {
        id: string;
        name: string;
    };
    connect_state?: ConnectState;
    clusters?: {
        id: string;
        name: string;
        connect_state?: ConnectState;
    }[];
    host_state?: {
        state: MaintenanceModeEnum;
    };
};
declare type HistoryRecord = {
    data: Data;
    type: Resources;
} | {
    type: "search-keyword";
    data: string;
};
export declare type GlobalSearchHistory = Partial<Record<Resources, HistoryRecord[]>> & {
    _head?: HistoryRecord[];
};
export {};
