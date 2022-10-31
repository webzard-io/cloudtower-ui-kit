import { ImportSecurityPolicies } from "@cloudtower/eagle/generated/forms2";
import { Architecture, Cluster, ClusterType, ConnectState, CreateSecurityGroupMutation, EverouteCluster, GetAllRecycleBinSettingsQuery, GetEverouteClustersQuery, GetVmInfoQuery, GetVmsForMigrationQuery, GetVmsInRecycleBinQuery, GraphCreateInput, GraphsQuery, Hypervisor, ListEntityFilterQuery, Maybe, NetworkType, NicDriverState, NtpMode, NvmfSubsystemPolicyType, SnapshotPlanStatus, TimeUnit, UsbDeviceStatus, Vm, VmStatus, VmVideoType } from "@cloudtower/eagle/generated/react-hooks";
import { CreateVmAction } from "@cloudtower/eagle/kit/specify";
import { ModalProps as CommonModalProps } from "@cloudtower/eagle/kit/specify";
import { ReplicaProgressInfo } from "@tower/utils";
import React from "react";
import { BackupServiceOperationItem } from "../modules/backupService/types";
import { EverouteClusterOperationItem } from "../modules/everoute/types";
import { BrickTopo, ClusterTopo, NodeTopo, Panel, PanelOptions, RackTopo } from "../modules/hardware-topo/types";
import { MaintenanceModeTaskArgs } from "../modules/host/types";
import LabelResources from "../modules/label/LabelResources";
import { Rule, Selector } from "../modules/securityPolicy/types";
import { OperationVmsRecord } from "../modules/vm/types";
import { Action } from "../plugins/CloudTowerAlpha";
export declare type CloseCb = {
    onClose: () => void;
    modalId: number;
};
export declare type Modal<TProps> = TProps extends void ? {
    component: React.FC<TProps & CloseCb>;
} : {
    component: React.FC<TProps & CloseCb>;
    props: TProps & {
        onClose?: () => void;
    };
};
export declare type ModalState = {
    stack: Array<Modal<unknown> & {
        id: number;
    }>;
    closeId: number;
};
export declare enum ModalActions {
    PUSH_MODAL = "PUSH_MODAL",
    POP_MODAL = "POP_MODAL",
    REMOVE_MODAL = "REMOVE_MODAL",
    CLOSE_MODAL = "CLOSE_MODAL"
}
export declare enum EverouteOperationItem {
    License = "License",
    Image = "Image"
}
export declare enum BackupOperationItem {
    License = "License",
    Image = "Image"
}
declare type PUSH_MODAL<TProps> = {
    type: ModalActions.PUSH_MODAL;
    payload: Modal<TProps>;
};
declare type POP_MODAL = {
    type: ModalActions.POP_MODAL;
};
declare type REMOVE_MODAL = {
    type: ModalActions.REMOVE_MODAL;
    id: number;
};
declare type CLOSE_MODAL = {
    type: ModalActions.CLOSE_MODAL;
    id: number;
};
export declare type Actions = PUSH_MODAL<unknown> | POP_MODAL | REMOVE_MODAL | CLOSE_MODAL;
export declare const initialModalState: ModalState;
export declare const modalReducer: (state: ModalState | undefined, action: Actions) => ModalState;
export declare type ModalProps = {
    ConnectClusterWizard: {
        datacenterId?: string;
    };
    EditClusterModal: {
        clusterId: string;
    };
    DeleteClusterModal: {
        cluster: {
            id: string;
            name: string;
            hypervisor?: Maybe<Hypervisor>;
            everoute_cluster: Maybe<Pick<EverouteCluster, "id" | "name">>;
            vms?: Maybe<Array<Pick<Vm, "id" | "name" | "vm_usage" | "in_recycle_bin">>>;
        };
    };
    DeleteClusterDisabledModal: {
        everouteClusterName: string | null | undefined;
        cloudTowerSystemVms: Pick<Vm, "vm_usage" | "id" | "in_recycle_bin" | "name">[] | undefined;
        clusterName: string | undefined;
    };
    RebootVmModal: {
        vm: {
            id: string;
            name: string;
        };
        force?: boolean;
    };
    BatchRebootVmModal: {
        vms: OperationVmsRecord[];
    };
    ShutdownVmModal: {
        vm: {
            id: string;
            name: string;
        };
        force?: boolean;
    };
    CutoverSourceVmModal: {
        vm_id: string;
        task_id: string;
    };
    BatchShutdownVmModal: {
        vms: {
            id: string;
            name: string;
            status: VmStatus;
            cluster?: {
                id: string;
                version: string;
                type: ClusterType;
            } | null;
        }[];
    };
    StartVmModal: {
        vm: {
            id: string;
            name?: string;
        };
    };
    ForceShutdownVmsModal: {
        vms: {
            id: string;
            name: string;
            status: VmStatus;
            cluster?: {
                id: string;
                version: string;
                type: ClusterType;
            } | null;
        }[];
    };
    BatchStartVmModal: {
        vms: OperationVmsRecord[];
    };
    BatchSetVmHaModal: {
        vms: OperationVmsRecord[];
    };
    MigrateVmModal2: {
        vmIds: string[];
    };
    MigrateVmDisabledModal: {
        vms: GetVmsForMigrationQuery["vms"];
    };
    SuspendVmModal: {
        vm: {
            id: string;
            name: string;
        };
        haveMountSriov?: boolean;
        haveMountGpu?: boolean;
    };
    BatchSuspendVmModal: {
        vms: OperationVmsRecord[];
    };
    ResumeVmModal: {
        vm: {
            id: string;
            name: string;
        };
        haveMountSriov?: boolean;
        haveMountGpu?: boolean;
    };
    BatchResumeVmModal: {
        vms: OperationVmsRecord[];
    };
    DeleteVmVolumeModal: {
        vmVolume: {
            id: string;
            name: string;
        };
    };
    BatchDeleteVmVolumeModal: {
        vmVolumes: {
            id: string;
            name: string;
            cluster: {
                connect_state: ConnectState;
            };
            vm_disks?: {
                id: string;
                vm: {
                    name: string;
                    id: string;
                };
            }[] | null;
        }[];
    };
    DeleteFailedVmVolumeModal: {
        vmVolume: {
            id: string;
            name: string;
            cluster: {
                connect_state: ConnectState;
            };
            vms?: {
                id: string;
                name?: string;
            }[];
        };
    };
    BatchDeleteFailedVmVolumeModal: {
        canNotArr: {
            id: string;
            name: string;
            result: string[];
        }[];
    };
    CreateVm: {
        where?: {
            resource: "datacenters" | "clusters" | "hosts" | "vm_folders" | "vms";
            id: string;
        };
        action: CreateVmAction;
        source_id?: string;
        preset_values?: {
            name?: string;
            description?: string;
        };
    };
    CreateVmWizard: {
        resources?: "datacenters" | "clusters" | "hosts" | "vm_folders" | "vms";
        id?: string;
    };
    EditVmModal: {
        vmId: string;
    };
    EditVmOwnerModal: {
        vmId: string;
    };
    BatchEditVmOwnerModal: {
        vms: OperationVmsRecord[];
    };
    TaskDetailModal: {
        id: string;
    };
    EditVmDiskModal: {
        vmId: string;
    };
    CreateVdsModal: {
        id: string;
    };
    EditVdsModal: {
        id: string;
        clusterId: string;
    };
    DeleteVdsModal: {
        id: string;
        name: string;
        type: NetworkType;
        everoute_cluster?: Maybe<Pick<EverouteCluster, "id" | "name">>;
    };
    CreateVmVolumeModal: {
        id: string;
    };
    CreateVlanModal: {
        id: string;
    };
    EditVlanModal: {
        id: string;
    };
    EditMigrationVlanModal: {
        id: string;
    };
    DeleteVlanModal: {
        id: string;
        clusterId: string;
    };
    DiskUnmountModal: {
        id: string;
    };
    DiskMountModal: {
        id: string;
    };
    RegionUnmountModal: {
        id: string;
    };
    RegionMountModal: {
        id: string;
    };
    EditHostNameModal: {
        vmId: string;
    };
    EditDnsModal: {
        vmId: string;
    };
    EditNtpModal: {
        vmId: string;
    };
    EditGuestAccountModal: {
        vmId: string;
    };
    CreateDatacenterModal: void;
    EditDatacenterModal: {
        id: string;
    };
    DeleteDatacenterModal: {
        id: string;
        name: string;
    };
    EditVmNicModal: {
        id: string;
        clusterId?: string;
    };
    CreateVmFolderModal: {
        id: string;
    };
    RenameVmFolderModal: {
        id: string;
        name: string;
        clusterId?: string;
    };
    DeleteVmFolderModal: {
        id: string;
    };
    SyncVmTimeOnResumeModal: {
        vm: Pick<Vm, "id" | "name" | "sync_vm_time_on_resume" | "vm_tools_status">;
    };
    SetVmFolderModal: {
        id: string;
        name: string;
        clusterId: string;
        folderId: string;
    };
    BatchSetVmFolderModal: {
        vms: OperationVmsRecord[];
    };
    RemoveFromFolderModal: {
        id: string;
        name: string;
        folderName: string;
    };
    BatchRemoveFromFolderModal: {
        vms: OperationVmsRecord[];
    };
    EditNicMTUModal: {
        id: string;
        mtu: number;
    };
    CloneVmWizard: {
        id: string;
    };
    RollbackVm: {
        vmSnapshotId: string;
        vmId: string;
    };
    CreateVmSnapshotModal: {
        vmId: string;
    };
    EditVmSnapshotModal: {
        id: string;
        name: string;
        clusterVersion: string;
        clusterType: ClusterType;
    };
    VmSnapshotDetailModal: {
        id: string;
    };
    DeleteVmSnapshotModal: {
        id: string;
        name: string;
        size: number;
    };
    ConvertVmByVmTemplateModal: {
        id: string;
        name?: string;
    };
    CreateVmTemplateByVmModal: {
        id: string;
    };
    CannotCreateVmTemplateByVmModal: {
        id: string;
    };
    CloneVmAsVmTemplateModal: {
        id: string;
    };
    CreateElfImageModal: {
        resourceId: string;
        resource: string;
    };
    EditElfImageModal: {
        id: string;
        name: string;
        description: string;
    };
    DeleteElfImageModal: {
        id: string;
    };
    EditClusterName: {
        cluster: {
            id: string;
            name: string;
        };
    };
    EditClusterDns: Pick<Cluster, "id" | "dns">;
    EditClusterNtp: {
        id: string;
        ntp_mode: NtpMode;
        ntp_servers: string[];
    };
    EditClusterCpuModelModal: {
        id: string;
        current_cpu_model: string;
        total_cpu_models: string[];
        recommended_cpu_models: string[];
    };
    EditClusterIpmi: {
        clusterId: string;
    };
    InstallVmToolsModal: {
        vmId: string;
        cluster: Pick<Cluster, "id" | "version" | "type"> | undefined | null;
    };
    UpgradeVmToolsModal: {
        vmId: string;
    };
    CreateVmByTemplateModal: {
        resources?: "datacenters" | "clusters" | "hosts" | "vm_folders" | "vms";
        id?: string;
    };
    RebuildVmModal: {
        resources?: "datacenters" | "clusters" | "hosts" | "vm_folders" | "vms";
        id?: string;
    };
    CreateViewModal: {
        clusterId?: string;
        view?: {
            id: string;
            name: string;
            time_span: number;
            time_unit: TimeUnit;
        };
    };
    CreateGraphModal: {
        viewId: string;
        clusterId: string;
        graph?: GraphsQuery["graphs"][0];
    };
    DeleteViewModal: {
        view: {
            id: string;
            name: string;
        };
    };
    DeleteGraphModal: {
        graph: {
            id: string;
            title: string;
        };
    };
    EditVmCpuModel: {
        vm: {
            id: string;
            name: string;
            cpu_model: string;
            status: VmStatus;
        };
        cluster_id: string;
    };
    EditVmClock: {
        vm: Pick<Vm, "id" | "name" | "clock_offset" | "os" | "guest_os_type">;
    };
    EditVmWinOpt: {
        vm: Pick<Vm, "id" | "name" | "win_opt" | "os" | "guest_os_type">;
    };
    EditVmVideoType: {
        vm: {
            id: string;
            name: string;
            video_type?: Maybe<VmVideoType>;
        };
    };
    CreateStorageDevice: void;
    CreateDatastore: {};
    EditDatastore: {
        id: string;
    };
    DeleteDatastore: {
        id: string;
        name: string;
    };
    EditStorageDevice: {
        id: string;
    };
    DeleteStorageDevice: {
        id: string;
        name: string;
    };
    CreateIscsiTargetModal: {
        clusterId: string;
    };
    CreateConsistencyGroupModal: {
        clusterId: string;
    };
    EditIscsiTargetModal: {
        iscsiTargetId: string;
    };
    DeleteIscsiTargetModal: {
        iscsiTarget: {
            id: string;
            name: string;
        };
    };
    CreateIscsiLunModal: {
        iscsiTargetId: string;
    };
    EditIscsiLunModal: {
        iscsiLunId: string;
    };
    DeleteIscsiLunModal: {
        iscsiLun: {
            id: string;
            name: string;
        };
    };
    CreateIscsiLunSnapshotModal: {
        iscsiLun: {
            iscsiLunId: string;
            iscsiTargetId: string;
            lunName: string;
        };
    };
    CreateIscsiLunFromSnapshotModal: {
        iscsiLunSnapshot: {
            snapshotId: string;
            snapshotName: string;
            iscsiTargetId: string;
        };
    };
    RollbackLunSnapshot: {
        iscsiLunSnapshot: {
            snapshotId: string;
            snapshotName: string;
        };
    };
    DeleteIscsiLunSnapshotModal: {
        iscsiLunSnapshot: {
            snapshotId: string;
            snapshotName: string;
        };
    };
    HowToConnectionModal: {
        ip: string;
        iqn: string;
    };
    ConfirmChangeIP: {
        iscsi_vip: boolean;
        management_vip: boolean;
        handleSubmit: () => void;
        hypervisor?: Maybe<Hypervisor>;
    };
    CreateNfsExportModal: {
        clusterId: string;
    };
    EditNfsExportModal: {
        nfsExport: {
            id: string;
            name: string;
            replica_num: number;
            ip_whitelist: string;
        };
    };
    DeleteNfsExportModal: {
        nfsExport: {
            id: string;
            name: string;
        };
    };
    CreateSnmpTransportModal: {
        clusterId: string;
    };
    UpdateSnmpTransportModal: {
        id: string;
    };
    DeleteSnmpTransportModal: {
        id: string;
    };
    CreateSnmpTrapReceiverModal: {
        clusterId: string;
    };
    UpdateSnmpTrapReceiverModal: {
        id: string;
    };
    DeleteSnmpTrapReceiverModal: {
        id: string;
    };
    UpdateHostnameModal: {
        id: string;
        name: string;
        cluster: {
            id: string;
        };
    };
    UpdateHostScvmNameModal: {
        id: string;
        name: string;
        scvm_name: string;
        cluster: {
            id: string;
            name: string;
            version: string;
            type: ClusterType;
        };
    };
    ExcludeItemsModal: {
        exclude_ids: string[];
    };
    DeleteEntityFilterModal: {
        id: string;
        name: string;
    };
    CreateEntityFilterModal: {
        entityFilters: ListEntityFilterQuery["entityFilters"];
        entityFilter?: ListEntityFilterQuery["entityFilters"][0];
    };
    AddExcludeItemModal: {
        entityFilter: ListEntityFilterQuery["entityFilters"][0];
        vm: {
            id: string;
            name: string;
        };
    };
    UpdateExecutePlanModal: {
        id: string;
        name: string;
        executePlans: Array<{
            id: string;
            period: string;
            start_at: string;
            enabled: boolean;
            retain: number;
        }>;
    };
    CreateReportTaskModal: {
        report_template_id: string;
        report_template_name: string;
    };
    VmToolsUploadModal: {
        cluster?: {
            id: string;
            name: string;
        };
        isoVersion?: number;
    };
    EditAlertRuleModal: {
        id: string;
    };
    CreateLogCollectionModal: {
        clusterId?: string;
    };
    StopLogCollectionModal: {
        task_id: string;
        path: string;
        clusterName: string;
    };
    DeleteLogCollectionModal: {
        id: string;
        path: string;
        size: number;
    };
    CreateUserModal: void;
    EditUserModal: {
        id: string;
    };
    DeleteUserModal: {
        id: string;
        username: string;
    };
    CreateApplicationModal: {
        clusterIds: string[];
    };
    UploadApplicationModal: {
        clusters: {
            id: string;
            name: string;
            version: string;
            application_highest_version: string;
            applicationVersion: string;
        }[];
    };
    UpdateApplicationModal: {
        id: string;
    };
    StopApplicationModal: {
        id: string;
        name: string;
    };
    DeleteReportTaskModal: {
        id: string;
        name: string;
    };
    CannotConnectClusterModal: {
        clusterNum: number;
        maxClusterNum: number;
        maxChunkNum: number;
        chunkNum: number;
    };
    EditRecycleBinClusterSettingModal: {
        cluster: {
            id: string;
            name: string;
        };
        clusterSettingsId: string;
        retain?: number;
        enabled: boolean;
        clusters: GetAllRecycleBinSettingsQuery["clusters"];
        globalSettings: GetVmsInRecycleBinQuery["globalSettingses"][0];
    };
    CreateRecycleBinClusterSettingsModal: {
        clusters: GetAllRecycleBinSettingsQuery["clusters"];
        globalSettings: GetVmsInRecycleBinQuery["globalSettingses"][0];
        clusterSettingses: GetAllRecycleBinSettingsQuery["clusterSettingses"];
    };
    DeleteRecycleBinClusterSettingsModal: {
        clusterName: string;
        clusterSettingsId: string;
        clusterId: string;
        clusters: GetAllRecycleBinSettingsQuery["clusters"];
        globalSettings: GetVmsInRecycleBinQuery["globalSettingses"][0];
    };
    RecoverVmsModal: {
        vms: {
            id: string;
            name: string;
            original_name?: Maybe<string>;
            cluster?: {
                id: string;
            } | null;
        }[];
        callback?: Function;
    };
    RecoverDuplicatedVmsModal: {
        nonDuplicatedVms: {
            id: string;
            name: string;
            original_name?: Maybe<string>;
            cluster?: {
                id: string;
            } | null;
        }[];
        duplicatedVms: {
            id: string;
            name: string;
            original_name?: Maybe<string>;
            cluster?: {
                id: string;
            } | null;
        }[];
        clusterVms: {
            id: string;
            name: string;
            cluster?: {
                id: string;
            } | null;
        }[];
        callback?: Function;
    };
    DeleteVmsModal: {
        vms: {
            id: string;
            name: string;
            original_name?: Maybe<string>;
            backup_plans?: {
                id: string;
                name: string;
            }[] | null;
        }[];
        inRecycleBin?: boolean;
        callback?: Function;
    };
    DeleteFailModal: {
        vms: {
            id: string;
            name: string;
            status: VmStatus;
            protected?: boolean;
            original_name?: Maybe<string>;
            nested_virtualization: boolean;
            cluster?: Maybe<{
                connect_state: ConnectState;
            }>;
        }[];
        inRecycleBin?: boolean;
        callback?: Function;
    };
    MoveVmsToRecycleBinModal: {
        vmIds: string[];
    };
    RoleModal: {
        id?: string;
        editing?: boolean;
        name?: string;
        actions?: string[];
    };
    DeleteRoleModal: {
        id: string;
        name: string;
    };
    DeleteRoleFailModal: {
        name: string;
        users: string[];
    };
    DeleteVmTemplateModal: {
        vmTemplates: {
            id: string;
            name: string;
            cluster: {
                connect_state: ConnectState;
            };
        }[];
    };
    AbortVmAcrossClusterMigrationModal: {
        vm_id: string;
        task_id: string;
        src_cluster_id: string;
        dest_cluster_id: string;
    };
    AbortVmAcrossClusterMigrationModal2: {
        vm_id: string;
        task_id: string;
        cluster_version: string;
        cluster_type: ClusterType;
        migrate_type: string;
    };
    AbortVmMigrationModal: {
        vm_id: string;
        task_id: string;
    };
    CutoverVmMigrationModal: {
        vm_local_id: string;
        task_id: string;
    };
    PersonalSettingsModal: void;
    ChangePasswordModal: {
        username?: string;
        action?: string;
    };
    ResetPasswordModal: {
        username: string;
    };
    UnmountUsbModal: {
        usbDevice: {
            id: string;
            name: string;
            status?: UsbDeviceStatus;
            vms?: {
                id: string;
                name: string;
            }[];
        };
    };
    MountUsbModal: {
        usbDevice: {
            id: string;
            name: string;
            host?: {
                id: string;
                name: string;
            };
        };
    };
    CreateHostModal: {
        clusterId: string;
        step?: number;
        taskId?: string;
    };
    CreateHostLogModal: {
        clusterId: string;
        hostIp: string;
        hostName: string;
    };
    EditVmUsbDeviceModal: {
        vm: NonNullable<GetVmInfoQuery["vm"]>;
        mountedUsbDevices: {
            id: string;
            name: string;
        }[];
    };
    NewEditVmUsbDeviceModal: {
        vm: NonNullable<GetVmInfoQuery["vm"]>;
        mountedUsbDevices: {
            id: string;
            name: string;
            description: string;
            size: number;
            hostname: string;
        }[];
    };
    EditVmTemplateModal: {
        id: string;
        name: string;
        description: string;
        cloud_init_supported: boolean;
        cluster_id: string;
    };
    CreateSnapshotPlanModal: {
        clusterId?: string;
    };
    UpdateSnapshotPlanModal: {
        id: string;
    };
    SnapshotPlanInfoTab: {
        id: string;
    };
    ExecutePlan: {
        id: string;
        name: string;
    };
    SuspendedPlan: {
        id: string;
        name: string;
    };
    ResumePlan: {
        id: string;
        name: string;
        status: SnapshotPlanStatus;
        end_time?: Maybe<string>;
    };
    DeleteSnapshotPlanModal: {
        id: string;
        name: string;
        size: number;
    };
    KeepSnapshotGroupModal: {
        id: string;
        name: string;
        time: string;
    };
    DeleteSnapshotGroupModal: {
        id: string;
        name: string;
        time: string;
        size: number;
    };
    RackTopoModal: {
        editing?: boolean;
        clusterId: string;
        zoneId?: string;
        rack?: RackTopo;
    };
    DeleteRackTopoModal: {
        panel: Panel;
        panelOptions: PanelOptions;
        rack: RackTopo;
    };
    AddBrickTopoModal: {
        cluster: ClusterTopo;
        rack: RackTopo;
    };
    UpdateBrickTopoModal: {
        cluster: ClusterTopo;
        rack?: RackTopo;
        brick: BrickTopo;
    };
    DeleteBrickTopoModal: {
        panelOptions: PanelOptions;
        clusterTopo: ClusterTopo;
        brick: BrickTopo;
    };
    MoveBrickTopoModal: {
        cluster: ClusterTopo;
        brick: BrickTopo;
        unrelated?: boolean;
    };
    AddNodeTopoModal: {
        cluster: ClusterTopo;
        brick: BrickTopo;
        position: {
            row: number;
            column: number;
        };
    };
    MoveNodeTopoModal: {
        cluster: ClusterTopo;
        node: NodeTopo;
        unrelated?: boolean;
    };
    CloneSnapshotGroupModal: {
        snapshotGroupId: string;
        name: string;
        time: string;
    };
    RollbackSnapshotGroupModal: {
        snapshotGroupId: string;
        snapshotPlanId: string;
        name: string;
        time: string;
    };
    DeleteClusterImageModal: {
        id: string;
        name: string;
        version: string;
    };
    UploadUpgradeFileModal: {};
    ClusterUpgradeModal: {
        clusterId: string;
        clusterImageId: string;
        clusterVersion: string;
        clusterType: ClusterType;
        clusterImageVersion: string;
    };
    ClusterUpgradeProgressModal: {
        clusterId: string;
        taskId: string;
    };
    AddLabelModal: {
        callback?: (id: string) => void;
    };
    AddLabelsModal: {};
    DeleteLabelsModal: {
        labels: string[];
    };
    UpdateLabelModal: {
        labelId: string;
    };
    UpdateResourceLabelsModal: {
        resourceId: string;
        resourceType: LabelResources;
    };
    BatchUpdateResourceLabelsModal: {
        type: LabelResources;
        resources: string[];
    };
    UpdateElfDataStoreLabelsModal: {
        iscsiTargets: string[];
        nfsExports?: string[];
        nvmfSubsystems?: string[];
    };
    CreateVmPlacementGroupModal: {
        id: string;
    };
    UpdateVmPlacementGroupModal: {
        id: string;
        clusterId: string;
    };
    DeleteVmPlacementGroupModal: {
        id: string;
        name: string;
    };
    EditZoneModal: {
        id: string;
        clusterId: string;
        datacenterId: string;
    };
    EditManagementVlanModal: {
        id: string;
    };
    AboutModal: void;
    EnableSRIOVModal: {
        id: string;
        name: string;
        driver_state: Maybe<NicDriverState>;
        max_vf_num: Maybe<number>;
    };
    EditSRIOVModal: {
        id: string;
        name: string;
        driver_state: Maybe<NicDriverState>;
        total_vf_num: Maybe<number>;
        max_vf_num: Maybe<number>;
    };
    UpdateConsistencyGroupModal: {
        id: string;
    };
    DeleteConsistencyGroupModal: {
        id: string;
    };
    CreateNvmfSubsystemModal: {
        clusterId: string;
    };
    EditNvmfSubsystemModal: {
        subsystemId: string;
    };
    DeleteNvmfSubsystemModal: {
        nvmfSubsystem: {
            id: string;
            name: string;
            policy: NvmfSubsystemPolicyType;
        };
    };
    CreateNvmfNamespaceSnapshotModal: {
        namespaceId: string;
        subsystemId: string;
        namespaceName: string;
    };
    CreateNvmfNamespaceModal: {
        nvmfSubsystemId?: string;
        groupId?: string;
    };
    EditNvmfNamespaceModal: {
        namespaceId: string;
    };
    DeleteNvmfNamespaceModal: {
        namespace: {
            id: string;
            name: string;
        };
    };
    CreateNamespaceGroupModal: {
        nvmfSubsystemId: string;
    };
    EditNamespaceGroupModal: {
        nvmfSubsystemId: string;
        groupName: string;
        groupId: string;
    };
    DeleteNamespaceGroupModal: {
        groupId: string;
        groupName: string;
    };
    CreateConsistencyGroupSnapshotModal: {
        consistencyGroupName: string;
        consistencyGroupId: string;
    };
    DeleteConsistencyGroupSnapshotModal: {
        id: string;
    };
    CannotCreateConsistencyGroupSnapshotModal: {};
    RollbackConsistencyGroupSnapshotModal: {
        id: string;
        groupName: string;
        time: string;
    };
    CloneNamespaceFromSnapshotModal: {
        id: string;
        name: string;
    };
    RollbackNamespaceSnapshotModal: {
        id: string;
        name: string;
        time: string;
    };
    DeleteNamespaceSnapshotModal: {
        id: string;
        name: string;
        size: number;
    };
    CannotDeleteIscsiLunModal: {
        iscsiLunName: string;
        groupName: string;
    };
    CannotDeleteNamespaceModal: {
        nvmfNamespaceName: string;
        groupName: string;
    };
    CopyGraphModal: {
        graph: Omit<GraphCreateInput, "view" | "local_id">;
        clusterId: string;
    };
    AddGraphModal: {
        graph: Omit<GraphCreateInput, "view" | "local_id" | "id">;
        clusterId: string;
    };
    TableExportModal: {
        tableName?: string;
        dynamicExtraColumns?: {
            title: string;
            idx: number;
        }[];
        source?: string;
    };
    StopIsolationVmModal: {
        isolationId: string;
        vmName: string;
        vmId: string;
        everouteClusterId: string;
    };
    CreateNetworkSecurityPolicyModal: void;
    DeleteNetworkSecurityPolicyModal: {
        id: string;
        name: string;
    };
    EditNetworkSecurityPolicyBasicInfoModal: {
        id: string;
    };
    EditNetworkSecurityPolicyObjectModal: {
        id: string;
    };
    PolicyObjectModal: {
        everouteClusterId: string;
        isEdit?: boolean;
        initialValues?: {
            selector: Selector[];
            communicable: boolean;
        };
        onConfirm?: (selector: Selector[], communicable: boolean) => void;
    };
    NetworkPolicyWhitelistModal: {
        everouteClusterId: string;
        rule?: Rule;
        isIpWhitelist: boolean;
        isEdit: boolean;
        isIngress: boolean;
        onConfirm?: (rule?: Rule) => void;
    };
    UploadEverouteImageModal: {
        callback?: (taskId: string) => void;
    };
    EverouteOperationModal: {
        activeItem?: EverouteOperationItem | string;
        secondaryActiveItem?: EverouteClusterOperationItem;
    };
    DeleteEverouteImageModal: {
        imageId: string;
        imageName?: string;
        imageVersion?: string;
        imageArch?: string;
    };
    UndeployEverouteClusterModal: {
        everouteClusterId: string;
        everouteClusterName?: string;
        agentClusters: Maybe<({
            __typename?: "Cluster" | undefined;
        } & Pick<Cluster, "id" | "name">)[]>;
    };
    AgentClustersAssociationModal: {
        everouteClusterId?: string;
        everouteClusterVersion?: string;
        everouteClusterStatus?: GetEverouteClustersQuery["everouteClusters"][0]["status"];
        licenseExpired: boolean;
    };
    CannotIsolationVmModal: {
        vlansId: string[];
        vmName: string;
    };
    CreateIsolationVmModal: {
        vmId: string;
        vmName: string;
        everouteCluster: {
            id: string;
            version: string;
        };
    };
    EditIsolationVmModal: {
        isolationId: string;
        vmName: string;
    };
    EverouteClusterDeployModal: {
        callback?: (taskId: string) => void;
    };
    DiskFailureInformationModal: {
        id: string;
    };
    EditContentLibraryImageModal: {
        id: string;
        name: string;
        description: string;
        cluster_disconnected: boolean;
    };
    CreateContentLibraryImageModal: {
        isCommunityEdition: boolean;
    };
    DeleteContentLibraryImageModal: {
        id: string;
    };
    EditContentLibraryImageClustersModal: {
        id: string;
        name: string;
        clusters: {
            id: string;
            name: string;
            connect_state: ConnectState;
        }[];
        usedIsoClusters: Set<string>;
    };
    BatchDistributeContentLibraryImageModal: {
        ids: string[];
    };
    BatchDeleteContentLibraryImageModal: {
        ids: string[];
    };
    EditContentLibraryVmTemplateModal: {
        id: string;
        name: string;
        description: string;
        cloud_init_supported: boolean;
        cluster_disconnected: boolean;
        architecture: Architecture | undefined;
    };
    DeleteContentLibraryVmTemplateModal: {
        id: string;
    };
    EditContentLibraryVmTemplateClustersModal: {
        id: string;
        name: string;
        clusters: {
            id: string;
            name: string;
            connect_state: ConnectState;
            version: string;
            type: ClusterType;
        }[];
        architecture?: Architecture;
        noVmNic: boolean;
        moreThan16Disk: boolean;
        stretch: boolean;
        storage_policy_uuid: string[];
    };
    BatchDeleteContentLibraryVmTemplateModal: {
        ids: string[];
    };
    BatchDistributeContentLibraryVmTemplateModal: {
        ids: string[];
    };
    CreateContentLibraryVmTemplateModal: {
        vm_id: string;
        action: "clone" | "convert";
    };
    ManualExecuteBackupPlan: {
        id: string;
        name: string;
    };
    PauseBackupPlan: {
        id: string;
        name: string;
    };
    DeleteBackupPlan: {
        id: string;
        name: string;
    };
    CreateBackupPlanModal: {};
    EditBackupPlanObjectModal: {
        id: string;
    };
    EditBackupPlanPeriodModal: {
        id: string;
    };
    EditBackupPlanPolicyModal: {
        id: string;
    };
    StopDistributeImageModal: {
        distributeName: string;
        taskId: string;
    };
    StopDistributeVmTemplateModal: {
        distributeName: string;
        taskId: string;
    };
    DistributeTaskDetailModal: {
        taskId: string;
    };
    UploadDetailModal: {
        resource_mutation: string;
        taskId: string;
    };
    AgentErrorModal: {
        hosts: {
            id: string;
            name: string;
            cluster: {
                id: string;
                name: string;
            };
        }[];
    };
    DeleteBackupStoreRepository: {
        id: string;
        name: string;
    };
    CannotDeleteBackupStoreRepository: {
        name: string;
        backup_plans: string[];
    };
    EditBackupStoreRepositoryModal: {
        id: string;
    };
    CreateBackupStoreRepositoryModal: {};
    RestoreVmModal: {
        id: string;
        backup_plan_id: string;
    };
    DeleteRestorePoint: {
        id: string;
    };
    UploadBackupImageModal: {
        callback?: (taskId: string) => void;
    };
    BackupOperationModal: {
        activeItem?: BackupOperationItem | string;
        secondaryActiveItem?: BackupServiceOperationItem;
    };
    DeleteBackupImageModal: {
        imageId: string;
    };
    UndeployBackupServiceModal: {
        backupServiceId: string;
        backupServiceName?: string;
    };
    ClusterDisassociationModal: {
        backupServiceId: string;
        elfClusterId: string;
        elfClusterName: string;
    };
    BackupClustersAssociationModal: {
        backupServiceId?: string;
        backupServiceName?: string;
    };
    BackupServiceDeployModal: {
        backupServiceId?: string;
        callback?: (backupServiceId: string) => void;
    };
    StopBackupTaskModal: {
        taskId: string;
        type: string;
        name: string;
        restore_time?: string;
    };
    PauseBackupTaskModal: {
        taskId: string;
        type: string;
        name: string;
        restore_time?: string;
    };
    UpgradeBackupServiceModal: {
        backupServiceId: string;
        packageId: string;
        version: string;
        newVersion: string;
    };
    CannotEditBackupPlanModal: {
        backup_plan: string;
        backup_service: string;
    };
    CannotDeleteBackupPlanModal: {
        backup_plan: string;
        backup_service: string;
    };
    CannotManualBackupPlanModal: {
        backup_plan: string;
        backup_service: string;
    };
    CannotPauseBackupPlanModal: {
        backup_plan: string;
        backup_service: string;
    };
    CannotResumeBackupPlanModal: {
        backup_plan: string;
        backup_service: string;
    };
    CannotRestoreVmModal: {
        vm_name: string;
        backup_service: string;
    };
    CannotDeleteRestorePointModal: {
        restore_point: string;
        backup_service: string;
    };
    CannotEditBackupRepoModal: {
        backup_repo: string;
        backup_service: string;
    };
    CannotDeleteBackupRepoModal: {
        backup_repo: string;
        backup_service: string;
    };
    CannotEditClusterAssociatedModal: {
        backup_service: string;
    };
    CannotUndeployBackupServiceModal: {
        backup_service: string;
    };
    AlphaFrame: {
        action: Action;
    };
    AscensionReplicaNumModal: {
        type: "volume" | "nfs" | "target" | "subsystem";
        id: string;
    };
    ExportVmModal: {
        id: string;
    };
    BatchExportVmModal: {
        ids: string[];
    };
    DeleteVmExportFileModal: {
        id: string;
    };
    ExportContentLibraryVmTemplateModal: {
        id: string;
    };
    BatchExportContentLibraryVmTemplateModal: {
        ids: string[];
    };
    AscensionReplicaTaskDetailModal: {
        taskId: string;
        replicaProgressInfo: Record<string, ReplicaProgressInfo>;
    };
    EnterMaintenanceModeModal: {
        id: string;
        name: string;
        isVMware: boolean;
    };
    ExitMaintenanceModeModal: {
        id: string;
        name: string;
        isVMware: boolean;
    };
    HostMaintenanceModeTaskDetailModal: {
        taskId: string;
    };
    CancelHostMaintenanceModal: {
        maintenanceModeArgs: MaintenanceModeTaskArgs;
    };
    ImportOvfToVmTemplateWizard: {};
    ImportOvfToVmWizard: {
        where?: {
            resource: "datacenters" | "clusters" | "hosts" | "vm_folders" | "vms";
            id: string;
        };
    };
    HowToCreateVmTemplateModal: {};
    ImportVmVolumeWizard: {
        where?: {
            resource: "datacenters" | "clusters" | "hosts" | "vm_folders" | "vms";
            id: string;
        };
    };
    ExportVmVolumeModal: {
        id: string;
    };
    BatchExportVmVolumeModal: {
        ids: string[];
    };
    AbortTaskModal: {
        title: string;
        content: React.ReactNode;
        abort: () => Promise<void>;
    };
    AscensionLunReplicaNumModal: {
        id: string;
    };
    AscensionNamespaceReplicaNumModal: {
        id: string;
    };
    CopyNamespaceModal: {
        id: string;
        name: string;
        ns_id: number | undefined;
    };
    CopyIscsiLunModal: {
        id: string;
        name: string;
        lun_id: number | undefined;
    };
    CannotOperateZbsResourceModal: {
        operateType: string;
        resourceType: string;
        zbsSupportNvmf: boolean | undefined;
    };
    ConvertVmFromTemplate: {
        id: string;
        name: string;
        clusters: {
            id: string;
            name: string;
            connect_state: ConnectState;
            version: string;
            type: ClusterType;
        }[];
    };
    CannotConvertVmFromTemplate: {
        name: string;
    };
    CreateSecurityGroupModal: {
        createdByApply?: boolean;
        everouteClusterId?: string;
        onCreated?: (id: string, securityGroup: CreateSecurityGroupMutation["createSecurityGroup"]) => void;
    };
    EditSecurityGroupModal: {
        id: string;
    };
    DeleteSecurityGroupModal: {
        id: string;
    };
    BatchDeleteSecurityGroupsModal: {
        ids: string[];
    };
    BatchCreateIsolationVmsModal: void;
    EditPolicyEffectiveModeModal: {
        selectedIds: string[];
        canEditPoliciesIds?: string[];
        cannotEditPoliciesWithER?: Map<string, string[]>;
    };
    EditEverouteClusterPolicyModal: {
        everouteCluster: {
            id: string;
            name: string;
            version: string;
        };
    };
    ImportSecurityPoliciesModal: void;
    ImportSecurityPoliciesPreviewTopoModal: {
        securityPolicies: ImportSecurityPolicies.FormValue["security_policies"];
        defaultIndex: number;
        everouteClusterId: string;
    };
    EverouteCannotDoModal: {
        title: CommonModalProps["title"];
        content?: React.ReactNode;
        errorDesc?: string;
        okText?: string;
        cancelText?: string;
        onOk?: CommonModalProps["onOk"];
        okButtonProps?: CommonModalProps["okButtonProps"];
    };
    ImportSecurityPoliciesTaskInfoModal: {
        taskId: string;
    };
    CreateMigrationNetworkModal: {
        clusterId: string;
    };
    CreateAccessNetworkModal: {
        clusterId: string;
    };
    EditStorageNetworkModal: {
        vlanId: string;
    };
    EditMigrationNetworkModal: {
        vlanId: string;
    };
    EditAccessNetworkModal: {
        vlanId: string;
    };
    EditAccessNetworkConfirmModal: {
        vlanName: string;
        clusterName: string;
        onOk: () => void;
    };
    DeleteMigrationNetworkModal: {
        vlanId: string;
    };
    DeleteAccessNetworkModal: {
        vlanId: string;
    };
    EditBandwidthModal: {
        vdsId: string;
    };
    EnableIommuModal: {
        id: string;
        name: string;
    };
    EditGpuDescription: {
        id: string;
        name: string;
        description: string;
    };
    EditGpuMountedVms: {
        id: string;
    };
    EditUsbDescription: {
        id: string;
        name: string;
        description: string;
    };
    EditUsbMountedVms: {
        id: string;
    };
};
export {};
