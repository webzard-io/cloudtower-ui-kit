import {
  useUpdateLabelMutation,
  UpdateLabelMutation,
} from "@tower/codegen-component"; /** ../../../generated/react-hooks */
import { client } from "@tower/codegen-component"; /** ../../../graphql */
import { ApolloError } from "apollo-boost";
import LabelResources from "../LabelResources";

// TODO: need to be replaced by codegen
export const getUpdateLabelResourcesArgs = (
  type: LabelResources,
  resources?: { id: string }[],
  isConnect?: boolean
) => {
  if (!type || !resources) return null;

  if (type === LabelResources.DataCenter) {
    return isConnect
      ? ({
          datacenters: { connect: resources.map((item) => ({ id: item.id })) },
        } as { datacenters: { connect: { id: string }[] } })
      : ({
          datacenters: {
            disconnect: resources.map((item) => ({ id: item.id })),
          },
        } as { datacenters: { disconnect: { id: string }[] } });
  }

  if (type === LabelResources.Cluster) {
    return isConnect
      ? ({
          clusters: { connect: resources.map((item) => ({ id: item.id })) },
        } as { clusters: { connect: { id: string }[] } })
      : ({
          clusters: { disconnect: resources.map((item) => ({ id: item.id })) },
        } as { clusters: { disconnect: { id: string }[] } });
  }

  if (type === LabelResources.Host) {
    return isConnect
      ? ({
          hosts: { connect: resources.map((item) => ({ id: item.id })) },
        } as { hosts: { connect: { id: string }[] } })
      : ({
          hosts: { disconnect: resources.map((item) => ({ id: item.id })) },
        } as { hosts: { disconnect: { id: string }[] } });
  }

  if (type === LabelResources.Disk) {
    return isConnect
      ? ({
          disks: { connect: resources.map((item) => ({ id: item.id })) },
        } as { disks: { connect: { id: string }[] } })
      : ({
          disks: { disconnect: resources.map((item) => ({ id: item.id })) },
        } as { disks: { disconnect: { id: string }[] } });
  }

  if (type === LabelResources.Nic) {
    return isConnect
      ? ({
          nics: { connect: resources.map((item) => ({ id: item.id })) },
        } as { nics: { connect: { id: string }[] } })
      : ({
          nics: { disconnect: resources.map((item) => ({ id: item.id })) },
        } as { nics: { disconnect: { id: string }[] } });
  }

  if (type === LabelResources.Vds) {
    return isConnect
      ? ({
          vdses: { connect: resources.map((item) => ({ id: item.id })) },
        } as { vdses: { connect: { id: string }[] } })
      : ({
          vdses: { disconnect: resources.map((item) => ({ id: item.id })) },
        } as { vdses: { disconnect: { id: string }[] } });
  }

  if (type === LabelResources.Vlan || type === LabelResources.VmVlan) {
    return isConnect
      ? ({
          vlans: { connect: resources.map((item) => ({ id: item.id })) },
        } as { vlans: { connect: { id: string }[] } })
      : ({
          vlans: { disconnect: resources.map((item) => ({ id: item.id })) },
        } as { vlans: { disconnect: { id: string }[] } });
  }

  if (type === LabelResources.Vm) {
    return isConnect
      ? ({
          vms: { connect: resources.map((item) => ({ id: item.id })) },
        } as { vms: { connect: { id: string }[] } })
      : ({
          vms: { disconnect: resources.map((item) => ({ id: item.id })) },
        } as { vms: { disconnect: { id: string }[] } });
  }

  if (type === LabelResources.VmSnapshot) {
    return isConnect
      ? ({
          vm_snapshots: { connect: resources.map((item) => ({ id: item.id })) },
        } as { vm_snapshots: { connect: { id: string }[] } })
      : ({
          vm_snapshots: {
            disconnect: resources.map((item) => ({ id: item.id })),
          },
        } as { vm_snapshots: { disconnect: { id: string }[] } });
  }

  if (type === LabelResources.ElfImage) {
    return isConnect
      ? ({
          elf_images: { connect: resources.map((item) => ({ id: item.id })) },
        } as { elf_images: { connect: { id: string }[] } })
      : ({
          elf_images: {
            disconnect: resources.map((item) => ({ id: item.id })),
          },
        } as { elf_images: { disconnect: { id: string }[] } });
  }

  if (type === LabelResources.VmTemplate) {
    return isConnect
      ? ({
          vm_templates: { connect: resources.map((item) => ({ id: item.id })) },
        } as { vm_templates: { connect: { id: string }[] } })
      : ({
          vm_templates: {
            disconnect: resources.map((item) => ({ id: item.id })),
          },
        } as { vm_templates: { disconnect: { id: string }[] } });
  }

  if (type === LabelResources.VmVolume) {
    return isConnect
      ? ({
          vm_volumes: { connect: resources.map((item) => ({ id: item.id })) },
        } as { vm_volumes: { connect: { id: string }[] } })
      : ({
          vm_volumes: {
            disconnect: resources.map((item) => ({ id: item.id })),
          },
        } as { vm_volumes: { disconnect: { id: string }[] } });
  }

  if (type === LabelResources.IscsiTarget) {
    return isConnect
      ? ({
          iscsi_targets: {
            connect: resources.map((item) => ({ id: item.id })),
          },
        } as { iscsi_targets: { connect: { id: string }[] } })
      : ({
          iscsi_targets: {
            disconnect: resources.map((item) => ({ id: item.id })),
          },
        } as { iscsi_targets: { disconnect: { id: string }[] } });
  }

  if (type === LabelResources.IscsiLun) {
    return isConnect
      ? ({
          iscsi_luns: { connect: resources.map((item) => ({ id: item.id })) },
        } as { iscsi_luns: { connect: { id: string }[] } })
      : ({
          iscsi_luns: {
            disconnect: resources.map((item) => ({ id: item.id })),
          },
        } as { iscsi_luns: { disconnect: { id: string }[] } });
  }

  if (type === LabelResources.NfsExport) {
    return isConnect
      ? ({
          nfs_exports: { connect: resources.map((item) => ({ id: item.id })) },
        } as { nfs_exports: { connect: { id: string }[] } })
      : ({
          nfs_exports: {
            disconnect: resources.map((item) => ({ id: item.id })),
          },
        } as { nfs_exports: { disconnect: { id: string }[] } });
  }

  if (type === LabelResources.NfsInode) {
    return isConnect
      ? ({
          nfs_inodes: { connect: resources.map((item) => ({ id: item.id })) },
        } as { nfs_inodes: { connect: { id: string }[] } })
      : ({
          nfs_inodes: {
            disconnect: resources.map((item) => ({ id: item.id })),
          },
        } as { nfs_inodes: { disconnect: { id: string }[] } });
  }

  if (type === LabelResources.NvmfSubsystem) {
    return isConnect
      ? ({
          nvmf_subsystems: {
            connect: resources.map((item) => ({ id: item.id })),
          },
        } as { nvmf_subsystems: { connect: { id: string }[] } })
      : ({
          nvmf_subsystems: {
            disconnect: resources.map((item) => ({ id: item.id })),
          },
        } as { nvmf_subsystems: { disconnect: { id: string }[] } });
  }

  if (type === LabelResources.ConsistencyGroup) {
    return isConnect
      ? ({
          consistency_groups: {
            connect: resources.map((item) => ({ id: item.id })),
          },
        } as { consistency_groups: { connect: { id: string }[] } })
      : ({
          consistency_groups: {
            disconnect: resources.map((item) => ({ id: item.id })),
          },
        } as { consistency_groups: { disconnect: { id: string }[] } });
  }
  if (type === LabelResources.NvmfNamespace) {
    return isConnect
      ? ({
          nvmf_namespaces: {
            connect: resources.map((item) => ({ id: item.id })),
          },
        } as { nvmf_namespaces: { connect: { id: string }[] } })
      : ({
          nvmf_namespaces: {
            disconnect: resources.map((item) => ({ id: item.id })),
          },
        } as { nvmf_namespaces: { disconnect: { id: string }[] } });
  }

  if (type === LabelResources.NamespaceGroup) {
    return isConnect
      ? ({
          namespace_groups: {
            connect: resources.map((item) => ({ id: item.id })),
          },
        } as { namespace_groups: { connect: { id: string }[] } })
      : ({
          namespace_groups: {
            disconnect: resources.map((item) => ({ id: item.id })),
          },
        } as { namespace_groups: { disconnect: { id: string }[] } });
  }

  if (type === LabelResources.ConsistencyGroupSnapshot) {
    return isConnect
      ? ({
          consistency_group_snapshots: {
            connect: resources.map((item) => ({ id: item.id })),
          },
        } as { consistency_group_snapshots: { connect: { id: string }[] } })
      : ({
          consistency_group_snapshots: {
            disconnect: resources.map((item) => ({ id: item.id })),
          },
        } as { consistency_group_snapshots: { disconnect: { id: string }[] } });
  }

  if (type === LabelResources.NvmfNamespaceSnapshot) {
    return isConnect
      ? ({
          nvmf_namespace_snapshots: {
            connect: resources.map((item) => ({ id: item.id })),
          },
        } as { nvmf_namespace_snapshots: { connect: { id: string }[] } })
      : ({
          nvmf_namespace_snapshots: {
            disconnect: resources.map((item) => ({ id: item.id })),
          },
        } as { nvmf_namespace_snapshots: { disconnect: { id: string }[] } });
  }

  if (type === LabelResources.IscsiLunSnapshot) {
    return isConnect
      ? ({
          iscsi_lun_snapshots: {
            connect: resources.map((item) => ({ id: item.id })),
          },
        } as { iscsi_lun_snapshots: { connect: { id: string }[] } })
      : ({
          iscsi_lun_snapshots: {
            disconnect: resources.map((item) => ({ id: item.id })),
          },
        } as { iscsi_lun_snapshots: { disconnect: { id: string }[] } });
  }

  if (type === LabelResources.ContentLibraryImage) {
    return isConnect
      ? ({
          content_library_images: {
            connect: resources.map((item) => ({ id: item.id })),
          },
        } as { content_library_images: { connect: { id: string }[] } })
      : ({
          content_library_images: {
            disconnect: resources.map((item) => ({ id: item.id })),
          },
        } as { content_library_images: { disconnect: { id: string }[] } });
  }

  if (type === LabelResources.ContentLibraryVmTemplate) {
    return isConnect
      ? ({
          content_library_vm_templates: {
            connect: resources.map((item) => ({ id: item.id })),
          },
        } as { content_library_vm_templates: { connect: { id: string }[] } })
      : ({
          content_library_vm_templates: {
            disconnect: resources.map((item) => ({ id: item.id })),
          },
        } as {
          content_library_vm_templates: { disconnect: { id: string }[] };
        });
  }

  if (type === LabelResources.GpuDevice) {
    return isConnect
      ? ({
          gpu_devices: {
            connect: resources.map((item) => ({ id: item.id })),
          },
        } as { gpu_devices: { connect: { id: string }[] } })
      : ({
          gpu_devices: {
            disconnect: resources.map((item) => ({ id: item.id })),
          },
        } as {
          gpu_devices: { disconnect: { id: string }[] };
        });
  }

  return null;
};

// TODO: need to be replaced by codegen
const useUpdateLabelResources = (props: {
  resourceType: LabelResources;
  onComplete?: (data: UpdateLabelMutation) => void;
}): [
  (payload: {
    labelId: string;
    resources: {
      id: string;
    }[];
    isConnect?: boolean;
  }) => void,
  {
    data?: UpdateLabelMutation;
    loading: boolean;
    error?: ApolloError;
  }
] => {
  const { resourceType, onComplete } = props;
  const [updateLabel, { data, loading, error }] = useUpdateLabelMutation({
    onCompleted: (data) => {
      if (resourceType === LabelResources.DataCenter)
        client.deleteCache({ typename: "Datacenter" });
      if (resourceType === LabelResources.Cluster)
        client.deleteCache({ typename: "Cluster" });
      if (resourceType === LabelResources.Host)
        client.deleteCache({ typename: "Host" });
      if (resourceType === LabelResources.Disk)
        client.deleteCache({ typename: "Disk" });
      if (resourceType === LabelResources.Nic)
        client.deleteCache({ typename: "Nic" });
      if (resourceType === LabelResources.Vds)
        client.deleteCache({ typename: "Vds" });
      if (
        resourceType === LabelResources.Vlan ||
        resourceType === LabelResources.VmVlan
      )
        client.deleteCache({ typename: "Vlan" });
      if (resourceType === LabelResources.Vm)
        client.deleteCache({ typename: "Vm" });
      if (resourceType === LabelResources.VmSnapshot)
        client.deleteCache({ typename: "VmSnapshot" });
      if (resourceType === LabelResources.ElfImage)
        client.deleteCache({ typename: "ElfImage" });
      if (resourceType === LabelResources.VmTemplate)
        client.deleteCache({ typename: "VmTemplate" });
      if (resourceType === LabelResources.VmVolume)
        client.deleteCache({ typename: "VmVolume" });
      if (resourceType === LabelResources.IscsiTarget)
        client.deleteCache({ typename: "IscsiTarget" });
      if (resourceType === LabelResources.IscsiLun)
        client.deleteCache({ typename: "IscsiLun" });
      if (resourceType === LabelResources.NfsExport)
        client.deleteCache({ typename: "NfsExport" });
      if (resourceType === LabelResources.NfsInode)
        client.deleteCache({ typename: "NfsInode" });
      if (resourceType === LabelResources.NvmfSubsystem)
        client.deleteCache({ typename: "NvmfSubsystem" });
      if (resourceType === LabelResources.ConsistencyGroup)
        client.deleteCache({ typename: "ConsistencyGroup" });
      if (resourceType === LabelResources.NvmfNamespace)
        client.deleteCache({ typename: "NvmfNamespace" });
      if (resourceType === LabelResources.NamespaceGroup)
        client.deleteCache({ typename: "NamespaceGroup" });
      if (resourceType === LabelResources.ConsistencyGroupSnapshot)
        client.deleteCache({ typename: "ConsistencyGroupSnapshot" });
      if (resourceType === LabelResources.NvmfNamespaceSnapshot)
        client.deleteCache({ typename: "NvmfNamespaceSnapshot" });
      if (resourceType === LabelResources.IscsiLunSnapshot)
        client.deleteCache({ typename: "IscsiLunSnapshot" });
      if (resourceType === LabelResources.ContentLibraryImage)
        client.deleteCache({ typename: "ContentLibraryImage" });
      if (resourceType === LabelResources.ContentLibraryVmTemplate)
        client.deleteCache({ typename: "ContentLibraryVmTemplate" });
      if (resourceType === LabelResources.GpuDevice)
        client.deleteCache({ typename: "GpuDevice" });

      if (typeof onComplete === "function") onComplete(data);
    },
  });
  const trigger = (payload: {
    labelId: string;
    resources: { id: string }[];
    isConnect?: boolean | undefined;
  }) => {
    const { labelId, resources, isConnect } = payload;
    const args = getUpdateLabelResourcesArgs(
      resourceType,
      resources,
      isConnect
    );
    if (args) {
      void updateLabel({
        variables: {
          id: labelId,
          data: args,
        },
      });
    }

    return undefined;
  };

  return [trigger, { data, loading, error }];
};

export default useUpdateLabelResources;
