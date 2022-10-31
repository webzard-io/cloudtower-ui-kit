import { SerializableObject } from "@tower/utils";
import { History, Location as HistoryLocation } from "history";
export declare type Resources = "overview" | "datacenters" | "clusters" | "hosts" | "vms" | "vm_folders" | "login" | "tasks" | "alerts" | "alert_rules" | "disks" | "elfImages" | "vmTemplates" | "vmVolumes" | "iscsiTargets" | "nfsExports" | "monitor" | "report-templates" | "report-tasks" | "tasks" | "vm-recycle" | "usbDevices" | "snapshot-plans" | "vmPlacementGroup" | "settings" | "zones" | "nvmfSubsystems" | "namespaceGroups" | "content-library";
declare type Route = {
    path: string;
    views?: string[];
};
export declare const routes: Record<Resources, Route>;
export declare const routeKeys: string[];
export declare const getAllSearch: () => Record<string, string>;
export declare const routeHasView: (route: Resources, view?: string) => boolean | undefined;
export declare type State = HistoryLocation["state"];
export declare type Location = {
    resource: Resources;
    id?: string;
    search?: {
        [key: string]: string | number | SerializableObject | undefined;
        view?: string;
    } | string;
    state?: State;
    keepView?: boolean;
};
export declare type HistoryType = Omit<History, "push" | "replace" | "location" | "length"> & {
    push: {
        (path: string, state?: State): void;
        (location: Location): void;
    };
    replace: {
        (path: string, state?: State): void;
        (location: Location): void;
    };
};
export declare const history: HistoryType;
export declare type RouterHistory = HistoryType;
export {};
