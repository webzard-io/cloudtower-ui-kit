import { kitContext, Modal2Props } from "@cloudtower/eagle";
import { parrotI18n } from "@cloudtower/parrot";
import React, { useContext, useEffect, useRef, useState } from "react";

import { ModalContentError } from "./Error";
import BaseModal from "./Modal";

type ErrorType = string | React.ReactNode | Error;
type InitializedModalType = Modal2Props & {
  initLoading: boolean;
  initError: ErrorType;
};

const InitializedModal: React.FC<InitializedModalType> = (props) => {
  const { initLoading, initError, children, ...modal2PropsArgs } = props;
  const kit = useContext(kitContext);
  const changeCount = useRef<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (changeCount.current > 2) {
      return;
    }
    if (initLoading !== loading) {
      setLoading(initLoading);
      changeCount.current++;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initLoading]);

  const getContent = () => {
    if (loading) {
      return <kit.loading />;
    }

    if (initError) {
      return <ModalContentError error={initError} />;
    }

    return children;
  };

  const canRenderChildren = !loading && !initError;

  return (
    <BaseModal
      {...modal2PropsArgs}
      showOk={canRenderChildren && modal2PropsArgs.showOk}
      cancelText={
        canRenderChildren
          ? modal2PropsArgs.cancelText
          : parrotI18n.t("common.close")
      }
    >
      {getContent()}
    </BaseModal>
  );
};

export default InitializedModal;
