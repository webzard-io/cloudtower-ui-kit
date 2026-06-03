import {
  ExclamationErrorCircleFill16RedIcon,
  File16GradientBlueIcon,
  Loading16GradientBlueIcon,
  XmarkRemove16SecondaryIcon,
} from "@cloudtower/icons-react";
import { cx } from "@linaria/core";
import Button from "@src/core/Button";
import Icon from "@src/core/Icon";
import Input from "@src/core/Input";
import { Typo } from "@src/core/Typo";
import OverflowTooltip from "@src/coreX/OverflowTooltip";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import cs from "classnames";
import React, { useState } from "react";

import { UrlUploadWrapperStyle } from "./UrlUpload.style";
import type { UrlUploadFile, UrlUploadProps } from "./UrlUpload.type";

const STATUS_ICON_MAP = {
  error: ExclamationErrorCircleFill16RedIcon,
  success: File16GradientBlueIcon,
  validating: Loading16GradientBlueIcon,
  "need-validate": Loading16GradientBlueIcon,
};

const isUrlFileValidating = (file?: UrlUploadFile) => {
  return (
    file?.fileStatus === "validating" || file?.fileStatus === "need-validate"
  );
};

const isValidHttpUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
};

const createUrlUploadFile = (
  url: string,
  validate?: UrlUploadProps["validate"],
): UrlUploadFile => {
  return {
    uid: `url-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    url,
    name: url,
    fileStatus: validate ? "need-validate" : "success",
  };
};

const UrlUploadFileInfo: React.FC<{
  file: UrlUploadFile;
  disabled?: boolean;
  onRemove: (file: UrlUploadFile) => void;
}> = ({ file, disabled, onRemove }) => {
  const fileStatus = file.fileStatus || "success";
  const canRemove = !disabled;
  const displayName = file.url || file.name;

  return (
    <div
      className={cs("url-upload-file", {
        "file-error-wrapper": fileStatus === "error",
        disabled,
      })}
    >
      <Icon
        src={STATUS_ICON_MAP[fileStatus]}
        isRotate={isUrlFileValidating(file)}
      />
      <div className={cx("file-info", Typo.Label.l4_regular)}>
        <OverflowTooltip
          className="file-name"
          content={displayName}
          tooltip={displayName}
        />
        {file.fileStatus === "error" && !!file.error ? (
          <div className={cx("upload-file-error", Typo.Footnote.f2_regular)}>
            {file.error}
          </div>
        ) : null}
      </div>
      <Icon
        className="remove-icon"
        src={XmarkRemove16SecondaryIcon}
        onClick={canRemove ? () => onRemove(file) : undefined}
      />
    </div>
  );
};

/**
 * 单 URL 上传组件，用于输入并解析一个远端文件 URL。
 */
export const UrlUpload = React.forwardRef<HTMLDivElement, UrlUploadProps>(
  (
    {
      className,
      "data-testid": dataTestId,
      label,
      labelPosition = "top",
      description,
      disabled,
      value = "",
      onChange,
      placeholder,
      fileList,
      setFileList,
      showParseButton = false,
      parseButtonText,
      disableRemoveList = false,
      validate,
      onRemove,
    },
    ref,
  ) => {
    const { t } = useParrotTranslation();
    const [error, setError] = useState("");
    const firstFile = fileList[0];
    const isValidating = isUrlFileValidating(firstFile);
    const hasParsedFile = showParseButton && firstFile?.fileStatus === "success";
    const trimmedValue = value.trim();
    const shouldShowDescriptionAbove =
      !!description && !!label && labelPosition === "top";
    const shouldShowDescriptionBelow =
      !!description && !shouldShowDescriptionAbove;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setError("");
      onChange?.(e.target.value);
    };

    const handleRemove = (file: UrlUploadFile) => {
      setFileList([]);
      onRemove?.(file);
    };

    const handleParse = async () => {
      if (disabled || isValidating) {
        return;
      }
      if (!trimmedValue) {
        setError(t("components.url_required"));
        setFileList([]);
        return;
      }
      if (!isValidHttpUrl(trimmedValue)) {
        setError(t("components.url_format_error"));
        setFileList([]);
        return;
      }
      const file = createUrlUploadFile(trimmedValue, validate);
      if (!validate) {
        setError("");
        setFileList([file]);
        return;
      }
      const validatingFile = { ...file, fileStatus: "validating" as const };
      setError("");
      setFileList([validatingFile]);
      try {
        const result = await validate(validatingFile, [validatingFile]);
        if (result.error) {
          setError(result.error);
          setFileList([]);
          return;
        }
        setFileList([
          {
            ...validatingFile,
            fileStatus: "success",
            error: undefined,
            data: result.data,
          },
        ]);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
        setFileList([]);
      }
    };

    const uploadContent = (
      <div className="url-upload-body">
        {!hasParsedFile ? (
          <>
            {shouldShowDescriptionAbove ? (
              <div
                className={cx(
                  "url-upload-description",
                  "url-upload-description-above",
                  Typo.Label.l4_regular,
                )}
              >
                {description}
              </div>
            ) : null}
            <Input
              data-testid={dataTestId ? `${dataTestId}-input` : undefined}
              disabled={disabled || isValidating}
              error={!!error}
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
            />
            {error || shouldShowDescriptionBelow ? (
              <div className={cx("url-upload-footnote", Typo.Label.l4_regular)}>
                {error ? <div className="url-upload-error">{error}</div> : null}
                {shouldShowDescriptionBelow ? (
                  <div className="url-upload-description">{description}</div>
                ) : null}
              </div>
            ) : null}
            {showParseButton ? (
              <div className="url-upload-action">
                <Button
                  disabled={disabled || isValidating}
                  loading={isValidating}
                  size="small"
                  type="secondary"
                  onClick={handleParse}
                >
                  {parseButtonText ?? t("components.parse_url")}
                </Button>
              </div>
            ) : null}
          </>
        ) : null}
        {hasParsedFile && firstFile ? (
          <UrlUploadFileInfo
            file={firstFile}
            disabled={disabled || disableRemoveList}
            onRemove={handleRemove}
          />
        ) : null}
      </div>
    );

    return (
      <div
        className={cs(
          UrlUploadWrapperStyle,
          className,
          label && labelPosition === "left" ? "label-left" : "label-top",
          !label && "no-label",
        )}
        data-testid={dataTestId}
        ref={ref}
      >
        {label ? (
          <label className={cx("url-upload-label", Typo.Label.l2_regular)}>
            {label}
          </label>
        ) : null}
        {uploadContent}
      </div>
    );
  },
);
