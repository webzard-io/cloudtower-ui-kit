import useParrotTranslation from "@src/hooks/useParrotTranslation";
import React, {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from "react";

import { UploadWrapper } from "./Upload.style";
import type { UploadProps } from "./Upload.type";
import {
  UploadButton,
  UploadDescription,
  UploadDragger,
  UploadFileInfo,
  UploadFileList,
  UploadLabel,
} from "./Upload.widget";

type UploadComponents = {
  Wrapper: typeof UploadWrapper;
  Label: typeof UploadLabel;
  Description: typeof UploadDescription;
  Button: typeof UploadButton;
  Dragger: typeof UploadDragger;
  FileList: typeof UploadFileList;
  FileInfo: typeof UploadFileInfo;
};

const UploadComp = React.forwardRef<HTMLDivElement, UploadProps>(
  (
    {
      className,
      label,
      description,
      type = "dragger",

      multiple = false,
      accept,
      disabled,
      maxCount,
      info,
      fileList,
      setFileList,
      validate,
      buttonProps,
      listType = "list",
      disableRemoveList = false,
      onRemove,
    },
    ref,
  ) => {
    const { t } = useParrotTranslation();
    const removeFile = (id: string) => {
      const index = fileList.findIndex((f) => f.uid === id);
      if (index !== -1) {
        const file = fileList[index];
        fileList.splice(index, 1);
        setFileList([...fileList]);
        onRemove?.(file);
      }
    };
    const _maxCount = multiple ? maxCount || Infinity : 1;
    const isSingleSelect = _maxCount === 1;
    return (
      <UploadComp.Wrapper className={className} ref={ref}>
        {label ? <UploadComp.Label>{label}</UploadComp.Label> : null}
        {description ? (
          <UploadComp.Description>{description}</UploadComp.Description>
        ) : null}
        {type === "button" ? (
          <UploadComp.Button
            {...{
              accept,
              multiple,
              disabled,
              maxCount,
              fileList,
              setFileList,
              validate,
              ...buttonProps,
            }}
          >
            {t("components.select_file")}
          </UploadComp.Button>
        ) : (
          <UploadComp.Dragger
            {...{
              accept,
              multiple,
              disabled,
              maxCount,
              fileList,
              setFileList,
              validate,
            }}
          />
        )}
        {info ?? <></>}
        {type === "button" || !isSingleSelect ? (
          <UploadComp.FileList
            fileList={fileList}
            removeFile={removeFile}
            type={listType}
            disableRemove={disableRemoveList}
            onRemove={onRemove}
          />
        ) : null}
      </UploadComp.Wrapper>
    );
  },
) as ForwardRefExoticComponent<
  PropsWithoutRef<UploadProps> & RefAttributes<HTMLDivElement>
> &
  UploadComponents;

UploadComp.Wrapper = UploadWrapper;
UploadComp.Label = UploadLabel;
UploadComp.Description = UploadDescription;
UploadComp.Button = UploadButton;
UploadComp.Dragger = UploadDragger;
UploadComp.FileList = UploadFileList;
UploadComp.FileInfo = UploadFileInfo;

export const Upload = UploadComp;
