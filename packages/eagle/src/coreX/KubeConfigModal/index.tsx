import {
  ClipboardCopy16GradientBlueIcon,
  ClipboardCopy16GradientGrayIcon,
} from "@cloudtower/icons-react";
import { cx } from "@linaria/core";
import { Button, Icon, Loading, message, Typo, usePopModal } from "@src/core";
import LegacyModal from "@src/core/LegacyModal";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import React, { useCallback } from "react";

import {
  ErrorContentWrapper,
  ErrorWrapper,
  KubeConfigContentStyle,
  KubeConfigFooterStyle,
  KubeConfigModalStyle,
  KubeConfigTipStyle,
  KubeConfigTitleStyle,
  KubeConfigWrapperStyle,
} from "./KubeConfigModal.style";
import {
  ErrorContentProps,
  KubeConfigModalProps,
} from "./KubeConfigModal.type";
import { copy, download } from "./utils";

const ErrorContent: React.FunctionComponent<ErrorContentProps> = (props) => {
  const { refetch, errorText } = props;
  const { t } = useParrotTranslation();

  return (
    <ErrorWrapper className={props.className} style={props.style}>
      <ErrorContentWrapper>
        <p className={cx(Typo.Label.l1_regular_title, "title")}>
          {errorText || t("common.obtain_data_error")}
        </p>
        {!refetch ? null : (
          <Button
            size="small"
            type="ordinary"
            onClick={(e) => {
              e.stopPropagation();
              refetch?.();
            }}
          >
            {t("common.retry")}
          </Button>
        )}
      </ErrorContentWrapper>
    </ErrorWrapper>
  );
};

const KubeConfigModal: React.FC<KubeConfigModalProps> = ({
  downloadName,
  customDesc,
  loading,
  data,
  error,
  refetch,
}) => {
  const { t } = useParrotTranslation();
  const popModal = usePopModal();

  const onCopy = useCallback(() => {
    copy(data);
    message.success(t("common.copy_kubeconfig_success"));
  }, [data, t]);
  const onDownload = useCallback(() => {
    download(`${downloadName}.yaml`, data);

    popModal();
  }, [data, popModal, downloadName]);

  return (
    <LegacyModal
      visible
      fullscreen
      className={KubeConfigModalStyle}
      onCancel={() => {
        popModal();
      }}
      footer={
        <div className={KubeConfigFooterStyle}>
          <Button
            type="default"
            prefixIcon={
              <Icon
                src={ClipboardCopy16GradientGrayIcon}
                hoverSrc={ClipboardCopy16GradientBlueIcon}
              />
            }
            onClick={onCopy}
          >
            {t("common.copy")}
          </Button>
          <div>
            <Button
              type="text"
              onClick={() => {
                popModal();
              }}
            >
              {t("common.cancel")}
            </Button>
            <Button
              type="primary"
              onClick={onDownload}
              disabled={loading || !!error}
            >
              {t("common.download")}
            </Button>
          </div>
        </div>
      }
    >
      <div className={KubeConfigWrapperStyle}>
        <div className={cx(KubeConfigTitleStyle, Typo.Display.d1s_bold_title)}>
          {t("common.download_kubeconfig")}
        </div>
        <div className={cx(KubeConfigTipStyle, Typo.Label.l1_regular)}>
          {customDesc || t("common.download_kubeconfig_tip")}
        </div>
        {loading ? (
          <Loading fullView />
        ) : error ? (
          <div className={KubeConfigContentStyle}>
            <ErrorContent refetch={refetch} errorText={error} />
          </div>
        ) : (
          <>
            <div className={KubeConfigContentStyle}>{data}</div>
          </>
        )}
      </div>
    </LegacyModal>
  );
};

export default KubeConfigModal;
