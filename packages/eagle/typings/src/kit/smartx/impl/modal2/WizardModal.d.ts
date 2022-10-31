import { Modal2Props } from "@cloudtower/eagle/kit/specify";
import React from "react";
declare type WizardModalType = Modal2Props & {
    step: number;
    onStepChange?: (step: number) => void;
    steps: {
        title: string;
        render: React.ReactNode;
        prevText?: string | React.ReactNode;
        okText?: string | React.ReactNode;
        onOk?: (e: React.MouseEvent<HTMLElement>) => void;
        disabled?: boolean;
    }[];
    right?: React.ReactNode;
    destroyOtherStep?: boolean;
    disablePrevStep?: boolean;
    stepsPosition?: "top" | "side";
};
declare const WizardModal: React.FC<WizardModalType>;
export default WizardModal;
