import { parrotI18n } from "@cloudtower/parrot";
import React, { useContext, useEffect, useRef, useState } from "react";

import { InitializedModalType, kitContext } from "../../spec";
import { FullView } from "../Styled";
import { Typo } from "../Typo";
import BaseModal from "./Modal";
import { FullViewErrorStyle } from "./styled";

const InitializedModal: React.FC<InitializedModalType> = (props) => {
  const { initLoading, contentError, children, ...modal2PropsArgs } = props;
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

    if (contentError) {
      return typeof contentError === "string" ? (
        <FullView className={FullViewErrorStyle}>
          <p className={Typo.Display.d2_bold_title}>
            {parrotI18n.t("common.load_failed")}
          </p>
          <p className={Typo.Label.l1_regular_title}>
            {parrotI18n.t("common.error_message")}:&nbsp;
            <span>{contentError}</span>
          </p>
        </FullView>
      ) : (
        contentError
      );
    }

    return children;
  };

  const canRenderChildren = !loading && !contentError;

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
