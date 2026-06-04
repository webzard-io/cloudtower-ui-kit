import { cx } from "@linaria/core";
import { LocalUpload } from "@src/core/LocalUpload";
import SegmentControl from "@src/core/SegmentControl";
import Tooltip from "@src/core/Tooltip";
import { Typo } from "@src/core/Typo";
import { UrlUpload } from "@src/core/UrlUpload";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import cs from "classnames";
import React, { useMemo, useState } from "react";

import { FileSelectorWrapperStyle } from "./FileSelector.style";
import type { FileSelectorMode, FileSelectorProps } from "./FileSelector.type";

/**
 * 文件选择器组件，用于在本地文件选择与 URL 上传之间互斥切换。
 */
export const FileSelector = React.forwardRef<HTMLDivElement, FileSelectorProps>(
  (
    {
      className,
      "data-testid": dataTestId,
      label,
      labelPosition = "top",
      description,
      mode,
      defaultMode,
      onModeChange,
      localFileList,
      setLocalFileList,
      urlFileList,
      setUrlFileList,
      urlValue = "",
      onUrlChange,
      localUploadProps,
      urlUploadProps,
      disabled,
      localDisabledTooltip,
      urlDisabledTooltip,
    },
    ref,
  ) => {
    const { t } = useParrotTranslation();
    const { description: localDescription, ...restLocalUploadProps } =
      localUploadProps ?? {};
    const { description: urlDescription, ...restUrlUploadProps } =
      urlUploadProps ?? {};
    const [innerMode, setInnerMode] = useState<FileSelectorMode>(
      defaultMode ?? mode ?? "local",
    );
    const currentMode = mode ?? innerMode;
    const isDisabled = !!disabled;
    const hasLocalFile = localFileList.length > 0;
    const hasUrlInput = urlValue.trim().length > 0;
    const hasUrlFile = urlFileList.length > 0;
    const localModeDisabled = isDisabled || hasUrlInput || hasUrlFile;
    const urlModeDisabled = isDisabled || hasLocalFile;
    const localModeLabel = t("components.file_selector_local");
    const urlModeLabel = t("components.file_selector_url");
    const resolvedLocalDisabledTooltip =
      localDisabledTooltip ?? t("components.file_selector_clear_url_first");
    const resolvedUrlDisabledTooltip =
      urlDisabledTooltip ?? t("components.file_selector_remove_file_first");

    const handleModeChange = (nextMode: FileSelectorMode) => {
      // 只允许切换到当前可用的来源，避免自动清空另一侧已有内容。
      if (
        isDisabled ||
        nextMode === currentMode ||
        (nextMode === "local" && localModeDisabled) ||
        (nextMode === "url" && urlModeDisabled)
      ) {
        return;
      }

      if (!mode) {
        setInnerMode(nextMode);
      }
      onModeChange?.(nextMode);
    };

    const options = useMemo(
      () => [
        {
          label: (
            <Tooltip
              title={
                !isDisabled && localModeDisabled
                  ? resolvedLocalDisabledTooltip
                  : null
              }
            >
              <span className="file-selector-option">{localModeLabel}</span>
            </Tooltip>
          ),
          value: "local",
          disabled: localModeDisabled,
        },
        {
          label: (
            <Tooltip
              title={
                !isDisabled && urlModeDisabled
                  ? resolvedUrlDisabledTooltip
                  : null
              }
            >
              <span className="file-selector-option">{urlModeLabel}</span>
            </Tooltip>
          ),
          value: "url",
          disabled: urlModeDisabled,
        },
      ],
      [
        isDisabled,
        localModeLabel,
        localModeDisabled,
        resolvedLocalDisabledTooltip,
        resolvedUrlDisabledTooltip,
        urlModeLabel,
        urlModeDisabled,
      ],
    );

    const uploadContent =
      currentMode === "local" ? (
        <LocalUpload
          {...restLocalUploadProps}
          description={localDescription ?? description}
          disabled={isDisabled}
          fileList={localFileList}
          labelPosition={labelPosition}
          setFileList={setLocalFileList}
        />
      ) : (
        <UrlUpload
          {...restUrlUploadProps}
          description={urlDescription ?? description}
          disabled={isDisabled}
          fileList={urlFileList}
          labelPosition={labelPosition}
          onChange={onUrlChange}
          setFileList={setUrlFileList}
          value={urlValue}
        />
      );

    return (
      <div
        className={cs(
          FileSelectorWrapperStyle,
          className,
          label && labelPosition === "left" ? "label-left" : "label-top",
          !label && "no-label",
        )}
        data-testid={dataTestId}
        ref={ref}
      >
        {label ? (
          <label className={cx("file-selector-label", Typo.Label.l2_regular)}>
            {label}
          </label>
        ) : null}
        <div className="file-selector-main">
          <SegmentControl
            className="file-selector-segment"
            data-testid={dataTestId ? `${dataTestId}-segment` : undefined}
            disabled={isDisabled}
            onChange={(value) => handleModeChange(value as FileSelectorMode)}
            options={options}
            size="small"
            value={currentMode}
          />
          <div className="file-selector-body">{uploadContent}</div>
        </div>
      </div>
    );
  },
);
