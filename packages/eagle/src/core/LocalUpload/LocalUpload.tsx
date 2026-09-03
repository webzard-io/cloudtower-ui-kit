import useParrotTranslation from "@src/hooks/useParrotTranslation";
import cs from "classnames";
import React, {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from "react";

import { UploadWrapper } from "./LocalUpload.style";
import type { LocalUploadProps } from "./LocalUpload.type";
import {
  UploadButton,
  UploadDescription,
  UploadDragger,
  UploadFileInfo,
  UploadFileList,
  UploadLabel,
} from "./LocalUpload.widget";

type UploadComponents = {
  Wrapper: typeof UploadWrapper;
  Label: typeof UploadLabel;
  Description: typeof UploadDescription;
  Button: typeof UploadButton;
  Dragger: typeof UploadDragger;
  FileList: typeof UploadFileList;
  FileInfo: typeof UploadFileInfo;
};

const UploadComp = React.forwardRef<HTMLDivElement, LocalUploadProps>(
  (
    {
      className,
      "data-testid": dataTestId,
      label,
      labelPosition = "top",
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
      disableRemoveList = false,
      onRemove,
      error,
    },
    ref,
  ) => {
    const { t } = useParrotTranslation();
    // onRemove 由 FileListItem 内部触发，此处不重复调用
    const removeFile = (id: string) => {
      const nextFileList = fileList.filter((file) => file.uid !== id);
      if (nextFileList.length !== fileList.length) {
        setFileList(nextFileList);
      }
    };
    const _maxCount = multiple ? maxCount || Infinity : 1;
    const isSingleSelect = _maxCount === 1;
    const shouldShowDescriptionAbove =
      !!description && !!label && labelPosition === "top";
    const shouldShowDescriptionBelow =
      !!description && !shouldShowDescriptionAbove;
    const shouldDisableRemove = disabled || disableRemoveList;
    const uploadContent = (
      <>
        {shouldShowDescriptionAbove ? (
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
              error,
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
              disableRemove: shouldDisableRemove,
              onRemove,
              error,
            }}
          />
        )}
        {shouldShowDescriptionBelow ? (
          <UploadComp.Description className="description-below">
            {description}
          </UploadComp.Description>
        ) : null}
        {info}
        {type === "button" || !isSingleSelect ? (
          <UploadComp.FileList
            fileList={fileList}
            removeFile={removeFile}
            disableRemove={shouldDisableRemove}
            onRemove={onRemove}
          />
        ) : null}
      </>
    );

    return (
      <UploadComp.Wrapper
        className={cs(
          className,
          label && labelPosition === "left" ? "label-left" : "label-top",
          !label && "no-label",
        )}
        ref={ref}
        data-testid={dataTestId}
      >
        {label ? <UploadComp.Label>{label}</UploadComp.Label> : null}
        {labelPosition === "left" && label ? (
          <div className="upload-main">{uploadContent}</div>
        ) : (
          uploadContent
        )}
      </UploadComp.Wrapper>
    );
  },
) as ForwardRefExoticComponent<
  PropsWithoutRef<LocalUploadProps> & RefAttributes<HTMLDivElement>
> &
  UploadComponents;

UploadComp.Wrapper = UploadWrapper;
UploadComp.Label = UploadLabel;
UploadComp.Description = UploadDescription;
UploadComp.Button = UploadButton;
UploadComp.Dragger = UploadDragger;
UploadComp.FileList = UploadFileList;
UploadComp.FileInfo = UploadFileInfo;

export const LocalUpload = UploadComp;
