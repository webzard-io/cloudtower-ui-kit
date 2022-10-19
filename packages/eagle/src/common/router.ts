import { History, Location as HistoryLocation } from "history";
import qs from "querystring";
import { SerializableObject } from "@tower/utils";
import { hashHistory } from "./history";

export type Resources =
  | "overview"
  | "datacenters"
  | "clusters"
  | "hosts"
  | "vms"
  | "vm_folders"
  | "login"
  | "tasks"
  | "alerts"
  | "alert_rules"
  | "disks"
  | "elfImages"
  | "vmTemplates"
  | "vmVolumes"
  | "iscsiTargets"
  | "nfsExports"
  | "monitor"
  | "report-templates"
  | "report-tasks"
  | "tasks"
  | "vm-recycle"
  | "usbDevices"
  | "snapshot-plans"
  | "vmPlacementGroup"
  | "settings"
  | "zones"
  | "nvmfSubsystems"
  | "namespaceGroups"
  | "content-library";

type Route = {
  path: string;
  views?: string[];
};

/* FIXME(junjia): Type lint */
export const routes: Record<Resources, Route> = {
  overview: {
    path: "",
  },
  datacenters: {
    path: "datacenters",
    views: [
      "detail",
      "clusters",
      "hosts",
      "vms",
      "elfImages",
      "vmTemplates",
      "vmVolumes",
      "disks",
      "usbDevices",
      "vmPlacementGroup",
      "iscsiTargets",
      "nvmfSubsystems",
      "labels",
    ],
  },
  clusters: {
    path: "clusters",
    views: [
      "detail",
      "hosts",
      "disks",
      "nics",
      "usbDevices",
      "vms",
      "vmPlacementGroup",
      "elfImages",
      "vmTemplates",
      "vmVolumes",
      "nfsExports",
      "iscsiTargets",
      "nvmfSubsystems",
      "connection",
      "vds",
      "vm_vlan",
      "system_vlan",
      "snapshot-plans",
      "metro",
      "monitor",
      "alerts",
      "logCollection",
      "consistencyGroups",
      "labels",
      "hardware_topo",
      "setting",
    ],
  },
  hosts: {
    path: "hosts",
    views: [
      "detail",
      "disks",
      "nics",
      "vms",
      "monitor",
      "usbDevices",
      "labels",
    ],
  },
  vms: {
    path: "vms",
  },
  vm_folders: {
    path: "vm_folders",
  },
  login: {
    path: "login",
  },
  tasks: {
    path: "tasks",
  },
  "vm-recycle": {
    path: "vm-recycle",
  },
  alerts: {
    path: "alerts",
  },
  alert_rules: {
    path: "alert_rules",
  },
  disks: { path: "disks" },
  elfImages: { path: "elfImages" },
  vmTemplates: { path: "vmTemplates" },
  vmVolumes: { path: "vmVolumes" },
  iscsiTargets: {
    path: "iscsiTargets",
    views: ["detail", "lun", "snapshot", "connection"],
  },
  nfsExports: {
    path: "nfsExports",
    views: ["detail", "inode"],
  },
  monitor: { path: "monitor" },
  "report-tasks": { path: "report-tasks" },
  "report-templates": { path: "report-templates" },
  usbDevices: { path: "usbDevices" },
  "snapshot-plans": { path: "snapshot-plans" },
  vmPlacementGroup: {
    path: "vmPlacementGroup",
  },
  settings: {
    path: "settings",
  },
  zones: {
    path: "zones",
    views: ["detail", "vms", "hosts", "disks"],
  },
  nvmfSubsystems: {
    path: "nvmfSubsystems",
    views: ["detail", "namespaceGroup", "namespace", "snapshot", "connection"],
  },
  namespaceGroups: {
    path: "namespaceGroups",
    views: ["namespace"],
  },
  "content-library": { path: "content-library" },
};
export const routeKeys = Object.keys(routes);

export const getAllSearch = () => {
  return qs.parse(hashHistory.location.search.replace(/^\?/, "")) as Record<
    string,
    string
  >;
};

export const routeHasView = (route: Resources, view?: string) => {
  if (!view) return false;
  return routes[route].views?.includes(view);
};

export type State = HistoryLocation["state"];

export type Location = {
  resource: Resources;
  id?: string;
  search?:
    | {
        [key: string]: string | number | SerializableObject | undefined;
        view?: string;
      }
    | string;
  state?: State;
  keepView?: boolean;
};

export type HistoryType = Omit<
  History,
  "push" | "replace" | "location" | "length"
> & {
  push: {
    (path: string, state?: State): void;
    (location: Location): void;
  };
  replace: {
    (path: string, state?: State): void;
    (location: Location): void;
  };
};

const pushOrReplace = (action: "push" | "replace") => {
  return (path: string | Location, state?: State) => {
    if (typeof path === "object") {
      const { resource, id = "", search, state, keepView } = path;
      let _search: Record<string, string> | string | undefined = {};

      if (typeof search === "object") {
        for (const key in search) {
          // go to the same view when the resources have same view
          if (key === "view") {
            if (routeHasView(resource, search[key])) {
              _search[key] = JSON.stringify(search[key]);
            }
          } else if (search[key] || typeof search[key] === "number") {
            _search[key] = JSON.stringify(search[key]);
          }
        }

        if (keepView && !search.view) {
          const search = getAllSearch();
          if ("view" in search && routeHasView(resource, search["view"])) {
            _search["view"] = JSON.stringify(search["view"]);
          }
        }
        _search = qs.stringify(_search);
      } else {
        if (!search && keepView) {
          let view;
          try {
            view = JSON.parse(getAllSearch()["view"]);
          } catch {
            // ignore
          }
          _search = routeHasView(resource, view) ? `?view="${view}"` : search;
        } else {
          _search = search;
        }
      }

      hashHistory[action]({
        pathname: `/${resource}/${id}`,
        state,
        search: _search,
      });
    } else {
      hashHistory[action](path, state);
    }
  };
};

export const history: HistoryType = {
  ...hashHistory,
  push: pushOrReplace("push"),
  replace: pushOrReplace("replace"),
};

export type RouterHistory = HistoryType;
