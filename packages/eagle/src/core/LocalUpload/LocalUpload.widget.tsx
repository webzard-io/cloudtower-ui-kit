import {
  ExclamationErrorCircleFill16RedIcon,
  File16GradientBlueIcon,
  Loading16GradientBlueIcon,
  Upload24GradientBlueIcon,
  Upload24GradientGrayIcon,
  Upload48GradientBlueIcon,
  Uploading16GradientBlueIcon,
  Uploading16GradientGrayIcon,
  XmarkRemove16RegularPrimaryCapsOffIcon,
  XmarkRemove16SecondaryIcon,
} from "@cloudtower/icons-react";
import { cx } from "@linaria/core";
import { AntdRcFile, AntdUploadProps, Upload as AntdUpload } from "@src/antd";
import Button from "@src/core/Button";
import Byte from "@src/core/Byte";
import Icon from "@src/core/Icon";
import Tooltip from "@src/core/Tooltip";
import { Typo } from "@src/core/Typo";
import OverflowTooltip from "@src/coreX/OverflowTooltip";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import cs from "classnames";
import { TFunction } from "i18next";
import _ from "lodash";
import React, { useState } from "react";

import { useFileCountErrorClear, useFileValidation } from "./LocalUpload.hooks";
import { FileInfoWrapperStyle } from "./LocalUpload.style";
import type {
  LocalUploadButtonProps,
  LocalUploadDraggerProps,
  LocalUploadFile,
  LocalUploadFileInfoProps,
  LocalUploadFileListProps,
} from "./LocalUpload.type";

const STATUS_ICON_MAP = {
  error: ExclamationErrorCircleFill16RedIcon,
  success: File16GradientBlueIcon,
  validating: Loading16GradientBlueIcon,
  "need-validate": Loading16GradientBlueIcon,
};

const isFileValidating = (fileStatus?: LocalUploadFile["fileStatus"]) =>
  fileStatus === "validating" || fileStatus === "need-validate";

const FileMeta: React.FC<{
  file: {
    name: string;
    fileName?: string;
    size?: number;
    fileStatus?: LocalUploadFile["fileStatus"];
    error?: string | null;
  };
  showError?: boolean;
}> = ({ file, showError = true }) => {
  const fileStatus = file.fileStatus || "success";

  return (
    <div
      className={cs(
        "file-content",
        Typo.Label.l4_regular,
        isFileValidating(fileStatus) && "validating",
      )}
    >
      <OverflowTooltip
        className="file-name"
        content={file.name || file.fileName}
        tooltip={file.name || file.fileName}
      />
      {file.size ? (
        <div className="file-size-line">
          <Byte
            rawValue={file.size}
            valueClassName="file-size"
            unitClassName="file-size-unit"
          />
        </div>
      ) : null}
      {showError && file.fileStatus === "error" && !!file.error && (
        <div className={cx("upload-file-error", Typo.Footnote.f2_regular)}>
          {file.error}
        </div>
      )}
    </div>
  );
};

const FileRemoveIcon: React.FC<{
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
}> = ({ disabled, onClick }) => {
  const { t } = useParrotTranslation();
  const icon = (
    <Icon
      className="remove-button"
      cursor={disabled ? undefined : "pointer"}
      src={XmarkRemove16SecondaryIcon}
      hoverSrc={disabled ? undefined : XmarkRemove16RegularPrimaryCapsOffIcon}
      onClick={disabled ? undefined : onClick}
    />
  );

  return disabled ? icon : <Tooltip title={t("common.remove")}>{icon}</Tooltip>;
};

/**
 * Helper function to create beforeUpload handler for upload components.
 * Handles file validation, count checking, and file list updates.
 *
 * @param options - Configuration options
 * @returns beforeUpload handler function
 */
const createBeforeUploadHandler = ({
  fileList,
  setFileList,
  validate,
  maxCount,
  isSingleSelect,
  setError,
  t,
  checkSingleSelectCount = false,
}: {
  fileList: LocalUploadFile[];
  setFileList: (files: LocalUploadFile[]) => void;
  validate:
    | LocalUploadDraggerProps["validate"]
    | LocalUploadButtonProps["validate"];
  maxCount: number;
  isSingleSelect: boolean;
  setError: (error: string) => void;
  t: TFunction<"translation", undefined>;
  checkSingleSelectCount?: boolean;
}) => {
  return (file: AntdRcFile, _fileList: AntdRcFile[]) => {
    if (isSingleSelect) {
      if (checkSingleSelectCount && _fileList.length > 1) {
        setError(t("components.exceed_max_count", { count: 1 }) || "");
        return false;
      } else {
        setError("");
      }
      const _file = file as LocalUploadFile;
      _file.fileStatus = validate ? "need-validate" : "success";
      setFileList([_file]);
      return false;
    }

    if (fileList.length + _fileList.length > maxCount) {
      setError(t("components.exceed_max_count", { count: maxCount }) || "");
    } else {
      setError("");
    }

    const _file = file as LocalUploadFile;
    _file.fileStatus = validate ? "need-validate" : "success";
    const index = _fileList.findIndex((f) => f.uid === _file.uid);
    if (index !== -1) {
      const newList = _.uniqBy(
        [...fileList, ..._fileList.slice(0, index + 1)],
        "uid",
      ) as LocalUploadFile[];
      setFileList(newList);
    }
    return false;
  };
};

export const UploadLabel: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className, children }) => {
  return (
    <label className={cx("upload-label", Typo.Label.l2_regular, className)}>
      {children}
    </label>
  );
};

export const UploadDescription: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className, children }) => {
  return (
    <div className={cx("upload-description", Typo.Label.l4_regular, className)}>
      {children}
    </div>
  );
};

export const UploadButton: React.FC<
  LocalUploadButtonProps & { children?: React.ReactNode }
> = ({
  children,
  hideIcon = false,
  className,
  fileList,
  setFileList,
  validate,
  maxCount,
  multiple = false,
  disabled,
  accept,
}) => {
  const { t } = useParrotTranslation();
  const [error, setError] = useState("");
  const _maxCount = multiple ? maxCount || Infinity : 1;
  const isSingleSelect = _maxCount === 1;

  useFileValidation({
    fileList,
    setFileList,
    validate,
    createNewFile: false,
  });
  useFileCountErrorClear({
    fileList,
    maxCount: _maxCount,
    setError,
  });

  const props: AntdUploadProps = {
    accept,
    fileList,
    showUploadList: false,
    beforeUpload: createBeforeUploadHandler({
      fileList,
      setFileList,
      validate,
      maxCount: _maxCount,
      isSingleSelect,
      setError,
      t,
      checkSingleSelectCount: false,
    }),
    multiple,
  };

  return (
    <AntdUpload {...props} className={cs("upload-button", className)}>
      <Button
        disabled={disabled}
        prefixIcon={
          !hideIcon ? <Icon src={Uploading16GradientGrayIcon} /> : undefined
        }
        hoverPrefixIcon={
          !hideIcon ? <Icon src={Uploading16GradientBlueIcon} /> : undefined
        }
      >
        {children}
      </Button>
      {error ? (
        <div className={cx("upload-error", Typo.Label.l4_regular)}>{error}</div>
      ) : null}
    </AntdUpload>
  );
};

export const UploadDragger: React.FC<
  LocalUploadDraggerProps & { children?: React.ReactNode }
> = ({
  children,
  className,
  fileList,
  setFileList,
  validate,
  maxCount,
  multiple = false,
  disabled,
  accept,
  disableRemove,
  onRemove,
}) => {
  const { t } = useParrotTranslation();
  const [error, setError] = useState("");
  const _maxCount = multiple ? maxCount || Infinity : 1;
  const isSingleSelect = _maxCount === 1;
  const reachMaxCount =
    !!maxCount && !isSingleSelect && fileList.length >= maxCount;

  useFileValidation({
    fileList,
    setFileList,
    validate,
    createNewFile: true,
  });
  useFileCountErrorClear({
    fileList,
    maxCount: _maxCount,
    setError,
  });

  const props: AntdUploadProps = {
    accept,
    fileList,
    showUploadList: false,
    beforeUpload: createBeforeUploadHandler({
      fileList,
      setFileList,
      validate,
      maxCount: _maxCount,
      isSingleSelect,
      setError,
      t,
      checkSingleSelectCount: true,
    }),
    disabled,
    multiple,
  };

  const DefaultChildren = (
    <>
      <Icon
        src={
          fileList?.length
            ? reachMaxCount
              ? Upload24GradientGrayIcon
              : Upload24GradientBlueIcon
            : Upload48GradientBlueIcon
        }
        iconHeight={fileList?.length ? 24 : 48}
        iconWidth={fileList?.length ? 24 : 48}
      />
      <div className={cx("upload-drag-text", Typo.Label.l2_regular)}>
        {t("components.upload_file_desc")}
        <span className="upload-drag-link">{t("components.select_file")}</span>
      </div>
    </>
  );

  const fileStatus = isSingleSelect
    ? fileList[0]?.fileStatus || "success"
    : undefined;

  const FileInfo: React.FC<{ file: LocalUploadFile }> = ({ file }) => {
    const fileStatus = file.fileStatus || "success";
    const handleRemove = (e: React.MouseEvent<HTMLSpanElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setFileList([]);
      onRemove?.(file);
    };

    return (
      <div className="file-info">
        <Icon
          src={STATUS_ICON_MAP[fileStatus]}
          isRotate={isFileValidating(fileStatus)}
        />
        <FileMeta file={file} showError={false} />
        <FileRemoveIcon disabled={disableRemove} onClick={handleRemove} />
      </div>
    );
  };

  const Error = () => {
    if (error) {
      return (
        <div className={cx("upload-error", Typo.Label.l4_regular)}>{error}</div>
      );
    }
    const file = fileList[0];
    if (isSingleSelect && file?.fileStatus === "error" && file.error) {
      return (
        <div className={cx("upload-error", Typo.Label.l4_regular)}>
          {file.error}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={cs("upload-drag", className)}>
      <AntdUpload.Dragger
        {...props}
        disabled={disabled || isFileValidating(fileStatus)}
        className={cs(
          "upload-drag-area",
          fileList.length ? "has-file" : "",
          reachMaxCount && "reach-max-count",
          isSingleSelect && "single",
          fileStatus === "error" && "file-error",
          isFileValidating(fileStatus) && "file-validating",
        )}
      >
        {isSingleSelect && fileList.length ? (
          <FileInfo file={fileList[0]} />
        ) : (
          children || DefaultChildren
        )}
      </AntdUpload.Dragger>
      <Error />
    </div>
  );
};

export const UploadFileInfo: React.FC<LocalUploadFileInfoProps> = ({
  file,
  removeFile,
  disabled,
  onRemove,
}) => {
  const fileStatus = file.fileStatus || "success";
  const handleRemove = () => {
    removeFile(file.uid ?? "");
    if (onRemove && "fileStatus" in file) {
      onRemove(file as LocalUploadFile);
    }
  };

  return (
    <div
      className={cs(FileInfoWrapperStyle, {
        "file-error-wrapper": fileStatus === "error",
        disabled,
      })}
    >
      <Icon
        src={STATUS_ICON_MAP[fileStatus]}
        isRotate={isFileValidating(fileStatus)}
      />
      <FileMeta file={file} />
      <FileRemoveIcon disabled={disabled} onClick={handleRemove} />
    </div>
  );
};

export const FileListItem: React.FC<{
  file: LocalUploadFile;
  removeFile: (id: string) => void;
  disableRemove?: boolean;
  onRemove?: (file: LocalUploadFile) => void;
}> = ({ file, removeFile, disableRemove, onRemove }) => {
  const fileStatus = file.fileStatus || "success";

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeFile(file.uid);
    onRemove?.(file);
  };

  return (
    <div
      className={cs(
        "upload-file-item",
        FileInfoWrapperStyle,
        Typo.Label.l4_regular,
        {
          "file-error-wrapper": fileStatus === "error",
        },
      )}
      key={file.uid}
    >
      <Icon
        src={STATUS_ICON_MAP[fileStatus]}
        isRotate={isFileValidating(fileStatus)}
      />
      <FileMeta file={file} />
      <FileRemoveIcon disabled={disableRemove} onClick={handleRemove} />
    </div>
  );
};

export const UploadFileList: React.FC<LocalUploadFileListProps> = ({
  className,
  fileList,
  removeFile,
  disableRemove = false,
  onRemove,
}) => {
  if (!fileList.length) {
    return null;
  }
  return (
    <div className={cs("upload-file-list", className)}>
      {fileList.map((file) => (
        <FileListItem
          key={file.uid}
          file={file}
          removeFile={removeFile}
          disableRemove={disableRemove}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};
