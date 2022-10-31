import { Tuna } from "../../../../tuna";
export declare type MaintenanceModeTaskArgs = Tuna["responses"]["getMaintenanceJobInfo"]["data"];
export declare type MaintenanceModeStages = Exclude<Exclude<MaintenanceModeTaskArgs, undefined>["enter"], undefined>["stages"];
export declare type MaintenanceModeStage = Exclude<MaintenanceModeStages, undefined>[0];
