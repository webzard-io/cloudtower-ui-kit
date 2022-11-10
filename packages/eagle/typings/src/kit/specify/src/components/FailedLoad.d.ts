import { ApolloError } from "apollo-boost";
import React from "react";
declare const FailedLoad: React.FC<{
    error: ApolloError | string;
    refetch: () => Promise<unknown>;
    refetchText?: string;
    className?: string;
    title?: string;
}>;
export default FailedLoad;
