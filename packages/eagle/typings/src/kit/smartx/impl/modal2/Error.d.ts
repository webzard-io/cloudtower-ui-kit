import React from "react";
interface ModalErrorType {
    error: Error | string | React.ReactNode;
}
export declare const ModalContentError: React.FC<ModalErrorType>;
interface ModalFooterErrorType extends ModalErrorType {
    className?: string;
}
export declare const ModalFooterError: React.FC<ModalFooterErrorType>;
export {};
