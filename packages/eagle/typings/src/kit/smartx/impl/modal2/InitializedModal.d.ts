import { Modal2Props } from "@cloudtower/eagle/kit/specify";
import { ApolloError } from "apollo-boost";
import React from "react";
declare type ErrorType = string | React.ReactNode | Error | ApolloError;
declare type InitializedModalType = Modal2Props & {
    initLoading: boolean;
    initError: ErrorType;
};
declare const InitializedModal: React.FC<InitializedModalType>;
export default InitializedModal;
