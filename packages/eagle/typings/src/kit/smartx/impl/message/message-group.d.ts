import { message as _message } from "antd";
import { ArgsProps } from "antd/lib/message";
declare type KeyedArgsProps = ArgsProps & {
    key: string;
};
export declare class Batcher {
    private batchSize;
    private batchTime;
    private scheduler;
    private patterMap;
    private originalMethod;
    constructor(originalMethod: typeof _message["success"], patternMap: Record<string, {
        patterns: RegExp[];
        batchKey: string;
    }>);
    addMessage(content: KeyedArgsProps): void;
    private applyContent;
    private getBatchKey;
    private getBatchContent;
    private getAction;
}
export declare function patchMessageMethods(m: typeof _message): typeof _message;
export declare const message: import("antd/lib/message").MessageApi;
export {};
