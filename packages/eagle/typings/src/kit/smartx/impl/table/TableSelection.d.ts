import { Resources, TableProps } from "@cloudtower/eagle/kit/specify";
/**
 * callback function of table checkbox when `shift` button is being pressed
 * @param payload
 * @param payload.keys last checked keys
 * @param payload.rows last checked records
 * @param payload.checked is checked
 * @param payload.record target record
 * @param payload.lastSelectedKey last selected key
 * @param payload.data data source
 */
export declare const onShiftChanged: <T extends {
    id: string;
}>(payload: {
    keys: string[];
    rows: T[];
    checked: boolean;
    record: T;
    lastSelectedKey: string | undefined;
    data: T[];
}) => {
    keys: string[];
    rows: T[];
};
export declare const useTableSelection: <T extends {
    id: string;
}>(rowSelection: import("antd/lib/table/interface").TableRowSelection<T> | undefined, resource: Resources | string) => import("antd/lib/table/interface").TableRowSelection<T> | undefined;
