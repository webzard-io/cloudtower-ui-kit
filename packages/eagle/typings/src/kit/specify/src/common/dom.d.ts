import { RefObject } from "react";
export declare function getSize(el: HTMLElement | null): {
    width: number;
    height: number;
};
export declare function handleWhitelistClickEvent(wrapperRef: RefObject<Element>, whitelist: string[], cb: () => void): (e: MouseEvent) => void;
