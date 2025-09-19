import { css, cx } from "@linaria/core";
import { SmallDialog } from "@src/core/SmallDialog/SmallDialog";
import { Typo } from "@src/core/Typo";
import React from "react";

import {
  RejectContent,
  RejectDialogProps,
  RejectDialogType,
} from "./RejectDialog.type";
import useParrotTranslation from "@src/hooks/useParrotTranslation";

const ContentList = css`
  color: $text-light-secondary;
  padding-inline-start: 12px;

  li {
    margin-bottom: 4px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const MultiRejectContentList = css`
  background: $fill-neutral-trans-2;
  padding: 8px;
  border-radius: 6px;
  color: $gray-a60-8;

  .icon-wrapper {
    margin-top: 1px; // The text line height is 18px, the icon height is 16px, so a 1px offset is needed
    margin-right: 4px;
  }

  li {
    margin-bottom: 4px;
    display: flex;
    align-items: flex-start;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Description = css`
  margin-bottom: 4px;
`;

const PartialDescription = css`
  margin-bottom: 8px;
`;

const SecondaryDesc = css`
  color: $text-light-secondary;
  margin-bottom: 8px;
`;

const Divider = css`
  height: 1px;
  background: $strokes-light-opaque-2;
  margin: 16px 0;
`;

const SingleRejectContent: React.FC<{
  content: string | string[];
  listType?: "ordered" | "unordered";
}> = ({ content, listType = "ordered" }) => {
  if (Array.isArray(content) && content.length > 1) {
    if (listType === "ordered") {
      return (
        <ol className={cx(ContentList)}>
          {content.map((reason, index) => (
            <li className={Typo.Label.l4_regular} key={index}>
              {reason}
            </li>
          ))}
        </ol>
      );
    }

    return (
      <ul className={cx(ContentList)}>
        {content.map((reason, index) => (
          <li className={Typo.Label.l4_regular} key={index}>
            {reason}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className={cx(ContentList, Typo.Label.l4_regular)}>{content}</div>
  );
};

const MultiRejectContent: React.FC<{
  content: RejectContent;
  resourceIcon?: React.ReactNode;
}> = ({ content, resourceIcon }) => {
  const { t } = useParrotTranslation();
  return (
    <div className={cx(MultiRejectContentList)}>
      {Object.entries(content).map(([name, reasons], index) => (
        <li className={Typo.Label.l4_regular} key={index}>
          {resourceIcon}
          <span>
            {name +
              t("common.colon_with_space") +
              reasons.join(t("common.semicolon_with_space"))}
          </span>
        </li>
      ))}
    </div>
  );
};

export const RejectDialog: React.FC<RejectDialogProps> = (props) => {
  const {
    title,
    cancelText,
    beforeDescription,
    description,
    className,
    footerClassName,
    okButtonProps,
  } = props;

  const renderContent = () => {
    switch (props.type) {
      case RejectDialogType.Single:
        return (
          <SingleRejectContent
            content={props.content}
            listType={props.listType}
          />
        );
      case RejectDialogType.All:
      case RejectDialogType.Part:
        return (
          <>
            {props.secondaryDesc && (
              <div className={cx(SecondaryDesc, Typo.Label.l4_regular)}>
                {props.secondaryDesc}
              </div>
            )}
            {props.type === RejectDialogType.Part && (
              <>
                <div className={Divider} />
                <div className={cx(PartialDescription, Typo.Label.l3_regular)}>
                  {props.partialDescription}
                </div>
              </>
            )}
            <MultiRejectContent
              content={props.content}
              resourceIcon={props.resourceIcon}
            />
          </>
        );
      case RejectDialogType.Custom:
        return props.customContent;
    }
  };

  return (
    <SmallDialog
      title={title}
      cancelText={cancelText}
      showOk={props.type === RejectDialogType.Part}
      okText={props.type === RejectDialogType.Part ? props.okText : undefined}
      onOk={props.type === RejectDialogType.Part ? props.onOk : undefined}
      okButtonProps={{
        danger: props.type === RejectDialogType.Part,
        ...okButtonProps,
      }}
      onCancel={props.onCancel}
      className={className}
      footerClassName={footerClassName}
    >
      {beforeDescription}
      {description && (
        <div className={cx(Description, Typo.Label.l3_regular)}>
          {description}
        </div>
      )}
      {renderContent()}
    </SmallDialog>
  );
};
