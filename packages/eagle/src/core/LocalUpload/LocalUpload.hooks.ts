import { useEffect, useRef } from "react";

import type {
  LocalUploadButtonProps,
  LocalUploadDraggerProps,
  LocalUploadFile,
} from "./LocalUpload.type";

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
export const useFileValidation = ({
  fileList,
  setFileList,
  validate,
  createNewFile = false,
}: {
  fileList: LocalUploadFile[];
  setFileList: (files: LocalUploadFile[]) => void;
  validate?:
    | LocalUploadDraggerProps["validate"]
    | LocalUploadButtonProps["validate"];
  createNewFile?: boolean;
}) => {
  // 校验是异步的，期间用户可以移除文件。回调必须基于最新的列表判断文件是否还在，
  // 否则会把 effect 闭包里那份仍含该文件的旧列表写回去，已移除的文件又冒出来
  const latestFileList = useRef(fileList);

  useEffect(() => {
    latestFileList.current = fileList;
    if (!validate) return;
    const updateFile = (fileId: string, file: LocalUploadFile) => {
      const currentList = latestFileList.current;
      const index = currentList.findIndex((f) => f.uid === fileId);
      if (index !== -1) {
        const newList = [...currentList];
        const fileToUpdate = createNewFile
          ? (() => {
              const newFile = new File([file], file.name, { type: file.type });
              Object.assign(newFile, file);
              return newFile as LocalUploadFile;
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
export const useFileCountErrorClear = ({
  fileList,
  maxCount,
  setError,
}: {
  fileList: LocalUploadFile[];
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
