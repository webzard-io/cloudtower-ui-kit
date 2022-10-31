export default function useElementsSize<K extends string>(classMap: Record<K, string>, config: {
    prevent?: boolean;
    key?: string;
    dependencyList?: unknown[];
}): Record<string, {
    width: number;
    height: number;
}>;
