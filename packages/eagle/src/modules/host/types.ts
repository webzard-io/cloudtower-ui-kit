import { Tuna } from "@tower/provider-interface";

export type MaintenanceModeTaskArgs =
  Tuna["responses"]["getMaintenanceJobInfo"]["data"];
export type MaintenanceModeStages = Exclude<
  Exclude<MaintenanceModeTaskArgs, undefined>["enter"],
  undefined
>["stages"];
export type MaintenanceModeStage = Exclude<MaintenanceModeStages, undefined>[0];
