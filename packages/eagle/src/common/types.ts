export type ExcludeMaybe<T> = Exclude<
  T extends string | number | boolean
    ? T
    : {
        [P in keyof T]-?: T[P] extends (infer U)[]
          ? ExcludeMaybe<U>[]
          : T[P] extends Array<infer U>
          ? ExcludeMaybe<U>[]
          : ExcludeMaybe<T[P]>;
      },
  null | undefined
>;

export type SidebarType =
  | "vm"
  | "disk"
  | "alert_rules"
  | "alerts"
  | "elfImage"
  | "vds"
  | "vmPlacementGroup"
  | "vmTemplate"
  | "iscsiLun"
  | "nic"
  | "systemVlan"
  | "vmVlan"
  | "vmVolume"
  | "reportTemplate"
  | "nfsInode"
  | "snapshotPlan"
  | "label"
  | "userAuditLog"
  | "primaryZone"
  | "secondaryZone"
  | "zoneAndZone"
  | "witnessNode"
  | "primaryZoneAndWitness"
  | "secondaryZoneAndWitness"
  | "userRoleNext"
  | "consistencyGroup"
  | "nvmfNamespace"
  | "systemAuditLog"
  | "contentLibraryImage"
  | "contentLibraryVmTemplate"
  | "backupPlan"
  | "backupStoreRepository"
  | "securityGroup"
  | "everouteCluster"
  | "gpuDevice"
  | "usbDevice";

export type Sidebar =
  | {
      type: SidebarType;
      view?: string;
      id: string;
    }
  | undefined;

export type MultipleSelectProps<T> = {
  value: string[];
  onChange: (value: string[], object?: T | T[], data?: T[]) => void;
  mode?: "multiple";
};

export type SingleSelectProps<T> = {
  value: string;
  onChange: (value: string, object?: T, data?: T[]) => void;
  mode?: "default";
};

export type CreateVmAction =
  | "create"
  | "createFromTemplate"
  | "clone"
  | "rebuild";

export type Topo =
  | {
      resource: "datacenters" | "clusters" | "hosts" | "vm_folders";
      id: string;
    }
  | undefined;

export type FormatUnit = "GiB" | "KiB";

export type PropsFrom<TComponent> = TComponent extends React.FC<infer Props>
  ? Props
  : TComponent extends React.Component<infer Props>
  ? Props
  : never;
