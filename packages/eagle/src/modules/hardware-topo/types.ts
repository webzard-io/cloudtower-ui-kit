import { GetClusterTopoQuery } from "../../generated/react-hooks";

export type ClusterTopo = NonNullable<GetClusterTopoQuery["clusterTopoes"][0]>;
export type ZoneTopo = NonNullable<ClusterTopo["zone_topoes"]>[0];
export type RackTopo = NonNullable<ZoneTopo["rack_topoes"]>[0];
export type BrickTopo = NonNullable<RackTopo["brick_topoes"]>[0];
export type NodeTopo = NonNullable<BrickTopo["node_topoes"]>[0];

export enum Panel {
  Primary,
  Secondary,
  Unrelated,
}
export type PanelOptions = { value: Panel; label: string; id: string }[];
