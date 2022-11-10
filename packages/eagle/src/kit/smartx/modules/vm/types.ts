import {
  ClusterType,
  ConnectState,
  Maybe,
  Vm,
  VmNicModel,
  VmToolsStatus,
  VmUsage,
} from "../../../../generated/react-hooks";

export type OperationVmRecord = Pick<
  Vm,
  | "id"
  | "name"
  | "entityAsyncStatus"
  | "status"
  | "nested_virtualization"
  | "memory"
  | "original_name"
  | "protected"
  | "internal"
> & {
  folder: { name: string; id: string } | null | undefined;
  vm_disks?: Maybe<{ svt_image?: Maybe<{ id: string }> }[]>;
  cluster: Maybe<{
    id: string;
    type: ClusterType;
    version: string;
    connect_state: ConnectState;
    settings?: Maybe<{
      vm_recycle_bin?: Maybe<{
        enabled: boolean;
        retain: number;
      }>;
    }>;
    name: string;
  }>;
  host: Maybe<{ id: string }>;
  available_svt_images?: number;
  vm_nics?: Maybe<
    {
      model?: VmNicModel | null;
      vlan?: Maybe<{
        id: string;
        vds?: {
          id: string;
          everoute_cluster?: {
            id: string;
          };
        };
      }>;
    }[]
  >;
  vm_tools_status?: Maybe<VmToolsStatus>;
  vm_tools_expired?: Maybe<boolean>;
  vm_tools_version?: Maybe<string>;
  svt_iso?: Maybe<string>;
  vm_usage?: Maybe<VmUsage>;
  backup_plans?: Maybe<
    {
      id: string;
      name: string;
    }[]
  >;
};

export type OperationVmsRecord = Omit<OperationVmRecord, "vm_disks">;
