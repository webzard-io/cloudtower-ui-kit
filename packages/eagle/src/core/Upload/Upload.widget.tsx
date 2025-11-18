import {
  ExclamationErrorCircleFill16RedIcon,
  File16GradientBlueIcon,
  Loading16GradientBlueIcon,
  Upload24GradientBlueIcon,
  Upload24GradientGrayIcon,
  Upload48GradientBlueIcon,
  Uploading16GradientBlueIcon,
  Uploading16GradientGrayIcon,
  XmarkRemove16SecondaryIcon,
  XmarkRemove24SecondaryIcon,
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
import React, { useEffect, useRef, useState } from "react";

import { FileInfoWrapperStyle } from "./Upload.style";
import type {
  UploadButtonProps,
  UploadDraggerProps,
  UploadFile,
  UploadFileInfoProps,
  UploadFileListProps,
} from "./Upload.type";

const STATUS_ICON_MAP = {
  error: ExclamationErrorCircleFill16RedIcon,
  success: File16GradientBlueIcon,
  validating: Loading16GradientBlueIcon,
  "need-validate": Loading16GradientBlueIcon,
};

/**
 * Custom hook to handle file validation automatically.
 * When files with status "need-validate" are detected, it validates them
 * and updates their status based on the validation result.
 *
 * @param options - Configuration options
 * @param options.fileList - Current file list
 * @param options.setFileList - Function to update file list
 * @param options.validate - Validation function
 * @param options.createNewFile - Whether to create a new File object when updating (for immutability)
 */
const useFileValidation = ({
  fileList,
  setFileList,
  validate,
  createNewFile = false,
}: {
  fileList: UploadFile[];
  setFileList: (files: UploadFile[]) => void;
  validate?: UploadDraggerProps["validate"] | UploadButtonProps["validate"];
  createNewFile?: boolean;
}) => {
  useEffect(() => {
    if (!validate) return;
    const updateFile = (fileId: string, file: UploadFile) => {
      const index = fileList.findIndex((f) => f.uid === fileId);
      if (index !== -1) {
        const newList = [...fileList];
        const fileToUpdate = createNewFile
          ? (() => {
              const newFile = new File([file], file.name, { type: file.type });
              Object.assign(newFile, file);
              return newFile as UploadFile;
            })()
          : file;
        newList.splice(index, 1, fileToUpdate);
        setFileList(newList);
      }
    };
    for (const _file of fileList) {
      if (_file.fileStatus !== "need-validate") {
        continue;
      }
      _file.fileStatus = "validating";
      updateFile(_file.uid, _file);
      validate(_file, fileList).then((result) => {
        if (result.error) {
          _file.error = result.error;
          _file.fileStatus = "error";
        } else {
          _file.error = undefined;
          _file.fileStatus = "success";
          _file.data = result.data;
        }
        updateFile(_file.uid, _file);
        return;
      });
    }
  }, [fileList, setFileList, validate, createNewFile]);
};

/**
 * Custom hook to clear error message when file count changes and is within the max count limit.
 * This hook tracks file count changes using a ref to avoid unnecessary updates.
 *
 * @param options - Configuration options
 * @param options.fileList - Current file list
 * @param options.maxCount - Maximum allowed file count
 * @param options.setError - Function to set error message
 */
const useFileCountErrorClear = ({
  fileList,
  maxCount,
  setError,
}: {
  fileList: UploadFile[];
  maxCount: number;
  setError: (error: string) => void;
}) => {
  const fileCountRef = useRef(fileList.length);

  useEffect(() => {
    if (fileList.length === fileCountRef.current) {
      return;
    }
    fileCountRef.current = fileList.length;
    if (fileCountRef.current <= maxCount) {
      setError("");
    }
  }, [fileList.length, maxCount, setError]);
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
  fileList: UploadFile[];
  setFileList: (files: UploadFile[]) => void;
  validate: UploadDraggerProps["validate"] | UploadButtonProps["validate"];
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
      const _file = file as UploadFile;
      _file.fileStatus = validate ? "need-validate" : "success";
      setFileList([_file]);
      return false;
    }

    if (fileList.length + _fileList.length > maxCount) {
      setError(t("components.exceed_max_count", { count: maxCount }) || "");
    } else {
      setError("");
    }

    const _file = file as UploadFile;
    _file.fileStatus = validate ? "need-validate" : "success";
    const index = _fileList.findIndex((f) => f.uid === _file.uid);
    if (index !== -1) {
      const newList = _.uniqBy(
        [...fileList, ..._fileList.slice(0, index + 1)],
        "uid",
      ) as UploadFile[];
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
  UploadButtonProps & { children?: React.ReactNode }
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
  UploadDraggerProps & { children?: React.ReactNode }
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
      </div>
    </>
  );

  const fileStatus = isSingleSelect
    ? fileList[0]?.fileStatus || "success"
    : undefined;

  const FileInfo: React.FC<{ file: UploadFile }> = ({ file }) => {
    const fileStatus = file.fileStatus || "success";
    return (
      <>
        <div className="file-info" onClick={(e) => e.preventDefault()}>
          <Icon
            src={STATUS_ICON_MAP[fileStatus]}
            isRotate={
              fileStatus === "validating" || fileStatus === "need-validate"
            }
          />
          <div className={cx("file-name", Typo.Label.l4_regular)}>
            {file.name || file.fileName}
          </div>
        </div>
        <Button className={Typo.Label.l2_regular} type="link">
          {t("components.reselect_file")}
        </Button>
      </>
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
        disabled={disabled || fileStatus === "validating"}
        className={cs(
          "upload-drag-area",
          fileList.length ? "has-file" : "",
          reachMaxCount && "reach-max-count",
          isSingleSelect && "single",
          fileStatus === "error" && "file-error",
          fileStatus === "validating" && "file-validating",
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

export const UploadFileInfo: React.FC<UploadFileInfoProps> = ({
  file,
  removeFile,
  disabled,
  onRemove,
}) => {
  const fileStatus = file.fileStatus || "success";
  const handleRemove = () => {
    removeFile(file.uid ?? "");
    if (onRemove && "fileStatus" in file) {
      onRemove(file as UploadFile);
    }
  };

  return (
    <div
      className={cs(FileInfoWrapperStyle, {
        "file-error-wrapper": fileStatus === "error",
        disabled: disabled,
      })}
    >
      <Icon
        src={STATUS_ICON_MAP[fileStatus]}
        isRotate={fileStatus === "validating" || fileStatus === "need-validate"}
      />
      <div className={cx("file-info", Typo.Label.l4_regular)}>
        <OverflowTooltip
          className="file-name"
          content={file.name || file.fileName}
          tooltip={file.name || file.fileName}
        />
        {file.size ? (
          <div className="file-info">
            <Byte
              rawValue={file.size}
              valueClassName="file-size"
              unitClassName="file-size-unit"
            />
          </div>
        ) : (
          <></>
        )}
        {file.fileStatus === "error" && !!file.error && (
          <div className={cx("upload-file-error", Typo.Footnote.f2_regular)}>
            {file.error}
          </div>
        )}
      </div>
      <Icon
        src={XmarkRemove16SecondaryIcon}
        onClick={disabled ? undefined : handleRemove}
      />
    </div>
  );
};

export const FileListItem: React.FC<{
  file: UploadFile;
  removeFile: (id: string) => void;
  onRemove?: (file: UploadFile) => void;
}> = ({ file, removeFile, onRemove }) => {
  const fileStatus = file.fileStatus || "success";
  const { t } = useParrotTranslation();

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeFile(file.uid);
    onRemove?.(file);
  };

  return (
    <div
      className={cx("upload-file-item", Typo.Label.l4_regular)}
      key={file.uid}
    >
      <div className="upload-file-info">
        <div className="file-info">
          <Icon
            src={STATUS_ICON_MAP[fileStatus]}
            isRotate={
              fileStatus === "validating" || fileStatus === "need-validate"
            }
          />
          <div
            className={
              fileStatus === "validating" || fileStatus === "need-validate"
                ? "validating"
                : ""
            }
          >
            {file.name || file.fileName}
          </div>
        </div>
        <Tooltip title={t("common.remove")}>
          <Icon
            className="remove-button"
            src={XmarkRemove24SecondaryIcon}
            onClick={handleRemove}
          />
        </Tooltip>
      </div>
      {file.fileStatus === "error" && !!file.error && (
        <div className={cx("upload-file-error", Typo.Footnote.f2_regular)}>
          {file.error}
        </div>
      )}
    </div>
  );
};

export const UploadFileList: React.FC<UploadFileListProps> = ({
  className,
  fileList,
  removeFile,
  type = "list",
  disableRemove = false,
  onRemove,
}) => {
  if (!fileList.length) {
    return null;
  }
  return (
    <div
      className={cs(
        "upload-file-list",
        type === "list" ? "" : "upload-file-info-list",
        className,
      )}
    >
      {fileList.map((file) =>
        type === "list" ? (
          <FileListItem
            key={file.uid}
            file={file}
            removeFile={removeFile}
            onRemove={onRemove}
          />
        ) : (
          <UploadFileInfo
            key={file.uid}
            file={file}
            removeFile={removeFile}
            disabled={disableRemove}
            onRemove={onRemove}
          />
        ),
      )}
    </div>
  );
};
