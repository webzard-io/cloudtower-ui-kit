import React, { useContext } from "react";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { css } from "linaria";
import { Progress } from "antd";
import { formatBytes } from "@tower/utils";
import { kitContext } from "../UIKitProvider";
import {
  HostSelect as BaseHostSelect,
  HostSelectProps as BaseHostSelectProps,
} from "@tower/codegen-component"; /** ../generated/selects */
import {
  HostSelectQuery,
  HostStatus,
  MaintenanceModeEnum,
  NicDriverState,
  IommuStatus,
} from "@tower/codegen-component"; /** ../generated/react-hooks */
import { AUTO_SCHEDULE } from "../common/constants";
import { SingleSelectProps } from "../common/types";
import useI18nArrayJoin from "../hooks/useI18nArrayJoin";

const OptionWrapper = css`
  &:not(:last-child) {
    border-bottom: 1px solid $gray-10;
  }

  &.ant-select-item-option-disabled {
    /* background: $fills-trans-secondary-light; */
    border-color: $gray-50;
    .available-memory {
      color: $red;
    }
    .host-option-title {
      color: $gray-60;
    }
    &:hover .host-option-title {
      color: $gray-60;
    }
  }

  .host-option-title {
    color: $gray-80;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &:hover .host-option-title {
    color: $blue;
  }

  .auto-select-desc {
    font-size: 13px;
    color: $gray-60;
    white-space: break-spaces;
  }

  .host-option-abstract {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    position: relative;

    .available-memory {
      font-weight: bold;
    }

    .host-option-right {
      margin-left: 20px;
      .right-cell {
        margin-right: 5px;
      }
    }
  }

  .disabled-reason {
    color: $text-light-serious;
    font-size: 12px;
    white-space: break-spaces;
  }
`;

type HostOption = {
  key: string;
  value: string;
  label: string;
  host_id: string;
  disabled?: boolean;
  children: React.ReactElement;
};
export type HostSelectProps = {
  input: SingleSelectProps<HostSelectQuery["hosts"][0]>;
  vmMemory?: number;
  vmCpuExclusiveCount?: number;
  defaultHostId?: string;
  onCompleted?: (data: HostSelectQuery) => void;
  getKey?: (host: HostSelectQuery["hosts"][0]) => string;
  transformOptions?: (options: HostOption[]) => HostOption[];
} & BaseHostSelectProps;

const HostSelectOption: React.FC<{
  host: HostSelectQuery["hosts"][0];
  hasSriovNic: boolean;
  availableMemory: string;
  cpuUsage: number;
  disabledMsg?: string[];
  displayGpuTag: boolean;
}> = (props) => {
  const {
    host,
    hasSriovNic,
    availableMemory,
    cpuUsage,
    disabledMsg,
    displayGpuTag,
  } = props;
  const kit = useContext(kitContext);
  const { t } = useTranslation();
  const i18nArrayJoin = useI18nArrayJoin();

  const OptionContent = () => {
    if (disabledMsg?.length) {
      return (
        <p className="disabled-reason">{i18nArrayJoin(disabledMsg, "；")}</p>
      );
    }

    return (
      <div className="host-option-abstract">
        <div className="host-option-left">
          <span>{t("vm.available_memory")}：</span>
          <span className="available-memory">{availableMemory}</span>
        </div>
        {!Number.isNaN(cpuUsage) && (
          <div className="host-option-right">
            <span className="right-cell">{t("vm.cpu_usage_rate")}</span>
            <Progress
              className="right-cell"
              style={{ width: 80 }}
              percent={cpuUsage}
              status="success"
              showInfo={false}
            />
            <span>{cpuUsage.toFixed(1) + "%"}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="host-option-title">
        <span className="left">{`${host.name} (${host.management_ip})`}</span>
        <span className="right">
          {hasSriovNic ? <kit.tag color="blue">SR-IOV</kit.tag> : null}
          {displayGpuTag ? <kit.tag color="green">GPU</kit.tag> : null}
        </span>
      </div>
      <OptionContent />
    </>
  );
};

type VMData = {
  vmCpuExclusiveCount?: number;
  vmMemory?: number;
};

export function getHostDisabledMsg(
  host: HostSelectQuery["hosts"][0],
  vmData: VMData,
  t: TFunction
): string[] {
  const { vmCpuExclusiveCount, vmMemory } = vmData;
  const allocable_cpu_cores_for_vm_exclusive =
    host.allocable_cpu_cores_for_vm_exclusive || 0;
  const disabledMsg: string[] = [];

  if (
    host.status === HostStatus.ConnectedError ||
    host.status === HostStatus.SessionExpired
  ) {
    disabledMsg.push(t("vm.host_unusable"));
  }
  if (host.host_state?.state === MaintenanceModeEnum.MaintenanceMode) {
    disabledMsg.push(t("vm.in_maintenance_mode"));
  }
  if (host.host_state?.state === MaintenanceModeEnum.EnteringMaintenanceMode) {
    disabledMsg.push(t("vm.entering_maintenance_mode"));
  }
  if (
    vmCpuExclusiveCount &&
    vmCpuExclusiveCount > allocable_cpu_cores_for_vm_exclusive
  ) {
    disabledMsg.push(
      t("vm.host_cpu_not_enough_for_vm", {
        vmCpuExclusiveCount,
      })
    );
  }
  if (vmMemory && vmMemory > host.allocatable_memory_bytes) {
    disabledMsg.push(t("vm.memory_is_not_enough"));
  }

  return disabledMsg;
}

const HostSelect: React.FunctionComponent<HostSelectProps> = (props) => {
  const {
    variables,
    vmMemory,
    vmCpuExclusiveCount,
    defaultHostId,
    input,
    lazy,
    getKey,
    transformOptions,
    onCompleted,
    ...restProps
  } = props;
  const kit = useContext(kitContext);
  const { t } = useTranslation();
  const allHostDisabled = (data: HostSelectQuery) => {
    const hosts = data?.hosts || [];
    const maxMemory = Math.max(
      ...hosts.map((h) => h.allocatable_memory_bytes),
      0
    );
    const maxAllocableCpuCount = Math.max(
      ...hosts.map((h) => h.allocable_cpu_cores_for_vm_exclusive || 0),
      0
    );
    let disabled = false;
    if (vmMemory && vmMemory > maxMemory) {
      disabled = true;
    }
    if (vmCpuExclusiveCount && vmCpuExclusiveCount > maxAllocableCpuCount) {
      disabled = true;
    }
    if (
      data?.hosts?.every(
        (host) =>
          host.status === HostStatus.ConnectedError ||
          host.status === HostStatus.SessionExpired
      )
    ) {
      disabled = true;
    }
    return disabled;
  };
  return (
    <BaseHostSelect
      placeholder={t("vm.select_host")}
      {...input}
      {...restProps}
      value={
        input.value === AUTO_SCHEDULE ? t("vm.auto_schedule") : input.value
      }
      variables={variables}
      optionLabelProp="label"
      lazy={lazy}
      onCompleted={
        onCompleted ||
        ((data) => {
          const node = data?.hosts.find(
            (host) =>
              host.id === defaultHostId &&
              host.allocatable_memory_bytes >= (vmMemory || 0) &&
              host.host_state?.state !== MaintenanceModeEnum.MaintenanceMode &&
              host.host_state?.state !==
                MaintenanceModeEnum.EnteringMaintenanceMode
          );
          if (node) {
            input.onChange(
              getKey ? getKey(node) : node.data_ip!,
              node,
              data.hosts
            );
            return;
          }
          const disabled = allHostDisabled(data);
          if (!disabled) {
            input.onChange(AUTO_SCHEDULE, node, data.hosts);
          }
        })
      }
      renderOptions={(data) => {
        const disabled = allHostDisabled(data);
        const hosts = data?.hosts || [];
        const options: HostOption[] = [
          {
            key: AUTO_SCHEDULE,
            value: AUTO_SCHEDULE,
            host_id: AUTO_SCHEDULE,
            label: t("vm.auto_schedule"),
            disabled,
            children: (
              <>
                <div className="host-option-title">{t("vm.auto_schedule")}</div>
                <div className="auto-select-desc">
                  {t("vm.auto_select_host")}
                </div>
              </>
            ),
          },
          ...hosts.map((host) => {
            const { value, unit } = formatBytes(host.allocatable_memory_bytes);
            const cpuUsage = (host.used_cpu_hz! / host.total_cpu_hz) * 100;
            const availableMemory = value + unit;
            const key = getKey ? getKey(host) : host.data_ip!;
            const hasSriovNic = (host.nics || []).some(
              (nic) => nic.is_sriov && nic.driver_state === NicDriverState.Ready
            );

            const displayGpuTag =
              host.iommu === IommuStatus.Enable &&
              Boolean(host.gpu_devices?.length);

            const disabledMsg = getHostDisabledMsg(
              host,
              { vmCpuExclusiveCount, vmMemory },
              t
            );

            const disabled = Boolean(disabledMsg.length);

            return {
              key,
              value: key,
              host_id: host.id,
              label: `${host.name} (${host.management_ip})`,
              disabled,
              object: host,
              children: (
                <HostSelectOption
                  disabledMsg={disabledMsg}
                  host={host}
                  hasSriovNic={hasSriovNic}
                  availableMemory={availableMemory}
                  cpuUsage={cpuUsage}
                  displayGpuTag={displayGpuTag}
                />
              ),
            };
          }),
        ];
        const _options = transformOptions ? transformOptions(options) : options;
        return _options.map(({ children, ...props }) => (
          <kit.option className={OptionWrapper} {...props}>
            {children}
          </kit.option>
        ));
      }}
    />
  );
};

export default HostSelect;
