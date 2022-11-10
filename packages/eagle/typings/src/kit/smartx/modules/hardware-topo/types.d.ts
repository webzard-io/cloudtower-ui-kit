import { GetClusterTopoQuery } from "@cloudtower/eagle/generated/react-hooks";
export declare type ClusterTopo = NonNullable<GetClusterTopoQuery["clusterTopoes"][0]>;
export declare type ZoneTopo = NonNullable<ClusterTopo["zone_topoes"]>[0];
export declare type RackTopo = NonNullable<ZoneTopo["rack_topoes"]>[0];
export declare type BrickTopo = NonNullable<RackTopo["brick_topoes"]>[0];
export declare type NodeTopo = NonNullable<BrickTopo["node_topoes"]>[0];
export declare enum Panel {
    Primary = 0,
    Secondary = 1,
    Unrelated = 2
}
export declare type PanelOptions = {
    value: Panel;
    label: string;
    id: string;
}[];
