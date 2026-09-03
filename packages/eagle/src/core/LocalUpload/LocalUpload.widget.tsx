import {
  ExclamationErrorCircleFill16RedIcon,
  File16GradientBlueIcon,
  Loading16GradientBlueIcon,
  Upload24GradientBlueIcon,
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
import { ParrotTrans } from "@src/core/ParrotTrans";
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
      {/* 解析中只展示文件名，与设计稿的 File Loading 一致 */}
      {file.size && !isFileValidating(fileStatus) ? (
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

// 禁用时也要吃掉点击，否则会冒泡到 Dragger 唤起文件选择框
const swallowClick: React.MouseEventHandler<HTMLSpanElement> = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

const FileRemoveIcon: React.FC<{
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
}> = ({ disabled, onClick }) => {
  const { t } = useParrotTranslation();
  const icon = (
    <Icon
      className="remove-button"
      cursor={disabled ? "not-allowed" : "pointer"}
      src={XmarkRemove16SecondaryIcon}
      hoverSrc={disabled ? undefined : XmarkRemove16RegularPrimaryCapsOffIcon}
      onClick={disabled ? swallowClick : onClick}
    />
  );

  return disabled ? icon : <Tooltip title={t("common.remove")}>{icon}</Tooltip>;
};

/** 单文件拖拽区内的文件行，与多文件列表项样式不同，故单独实现 */
const DraggerFileInfo: React.FC<{
  file: LocalUploadFile;
  disableRemove?: boolean;
  onRemove: (file: LocalUploadFile) => void;
}> = ({ file, disableRemove, onRemove }) => {
  const fileStatus = file.fileStatus || "success";

  return (
    <div className="file-info">
      <Icon
        src={STATUS_ICON_MAP[fileStatus]}
        isRotate={isFileValidating(fileStatus)}
      />
      <FileMeta file={file} showError={false} />
      <FileRemoveIcon
        disabled={disableRemove}
        onClick={(e) => {
          // 阻止冒泡到 Dragger，否则会触发文件选择弹窗
          e.preventDefault();
          e.stopPropagation();
          onRemove(file);
        }}
      />
    </div>
  );
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
}) => {
  return (file: AntdRcFile, _fileList: AntdRcFile[]) => {
    if (isSingleSelect) {
      setError("");
      // 单文件场景下拖入多个文件时只接受第 1 个，其余静默忽略
      if (file.uid !== _fileList[0]?.uid) {
        return false;
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
  error,
}) => {
  const { t } = useParrotTranslation();
  const [countError, setCountError] = useState("");
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
    setError: setCountError,
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
      setError: setCountError,
      t,
    }),
    multiple,
  };

  // 外部传入的字段级错误优先于组件内部的文件数量超限提示
  const fieldError = error || countError;

  return (
    <AntdUpload
      {...props}
      className={cs("upload-button", fieldError && "has-error", className)}
    >
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
      {fieldError ? (
        <div className={cx("upload-error", Typo.Label.l4_regular)}>
          {fieldError}
        </div>
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
  error,
}) => {
  const { t } = useParrotTranslation();
  const [countError, setCountError] = useState("");
  const _maxCount = multiple ? maxCount || Infinity : 1;
  const isSingleSelect = _maxCount === 1;

  useFileValidation({
    fileList,
    setFileList,
    validate,
    createNewFile: true,
  });
  useFileCountErrorClear({
    fileList,
    maxCount: _maxCount,
    setError: setCountError,
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
      setError: setCountError,
      t,
    }),
    disabled,
    multiple,
  };

  const DefaultChildren = (
    <>
      <Icon
        src={
          fileList?.length ? Upload24GradientBlueIcon : Upload48GradientBlueIcon
        }
        iconHeight={fileList?.length ? 24 : 48}
        iconWidth={fileList?.length ? 24 : 48}
      />
      <div className={cx("upload-drag-text", Typo.Label.l2_regular)}>
        {/* 用 Trans 承载整句，避免拼接两个 key 后锁死语序 */}
        <ParrotTrans i18nKey="components.upload_file_desc">
          <span className="upload-drag-link" />
        </ParrotTrans>
      </div>
    </>
  );

  const fileStatus = isSingleSelect
    ? fileList[0]?.fileStatus || "success"
    : undefined;

  // 错误优先级：外部字段级错误 > 内部数量超限提示 > 单文件自身的校验错误
  const singleFileError =
    isSingleSelect && fileList[0]?.fileStatus === "error"
      ? fileList[0].error
      : undefined;
  const displayError = error || countError || singleFileError;

  return (
    <div className={cs("upload-drag", displayError && "has-error", className)}>
      <AntdUpload.Dragger
        {...props}
        disabled={disabled || isFileValidating(fileStatus)}
        className={cs(
          "upload-drag-area",
          fileList.length ? "has-file" : "",
          isSingleSelect && "single",
          fileStatus === "error" && "file-error",
          isFileValidating(fileStatus) && "file-validating",
        )}
      >
        {isSingleSelect && fileList.length ? (
          <DraggerFileInfo
            file={fileList[0]}
            disableRemove={disableRemove}
            onRemove={(file) => {
              setFileList([]);
              onRemove?.(file);
            }}
          />
        ) : (
          children || DefaultChildren
        )}
      </AntdUpload.Dragger>
      {displayError ? (
        <div className={cx("upload-error", Typo.Label.l4_regular)}>
          {displayError}
        </div>
      ) : null}
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
