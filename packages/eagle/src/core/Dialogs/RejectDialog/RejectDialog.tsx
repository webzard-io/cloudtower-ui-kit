import { css, cx } from "@linaria/core";
import React from "react";

import { Typo } from "../../Typo";
import SmallDialog from "../SmallDialog";
import {
  RejectContent,
  RejectDialogProps,
  RejectDialogType,
} from "./RejectDialog.type";

const ContentList = css`
  color: $text-light-secondary;

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

  li {
    margin-bottom: 4px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Description = css`
  margin-bottom: 4px;
`;

const HelperText = css`
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
}> = ({ content }) => {
  if (Array.isArray(content) && content.length > 1) {
    return (
      <div className={cx(ContentList)}>
        {content.map((reason, index) => (
          <li className={Typo.Label.l4_regular} key={index}>
            {index + 1}. {reason}
          </li>
        ))}
      </div>
    );
  }
  return (
    <div className={cx(ContentList, Typo.Label.l4_regular)}>{content}</div>
  );
};

const MultiRejectContent: React.FC<{
  content: RejectContent;
}> = ({ content }) => (
  <div className={cx(MultiRejectContentList)}>
    {Object.entries(content).map(([name, reasons], index) => (
      <li className={Typo.Label.l4_regular} key={index}>
        {name}: {reasons.join("; ")}
      </li>
    ))}
  </div>
);

export const RejectDialog: React.FC<RejectDialogProps> = (props) => {
  const { title, cancelText, description, className } = props;

  const renderContent = () => {
    switch (props.type) {
      case RejectDialogType.Single:
        return <SingleRejectContent content={props.content} />;
      case RejectDialogType.All:
      case RejectDialogType.Part:
        return (
          <>
            {props.helperText && (
              <div className={cx(HelperText, Typo.Label.l4_regular)}>
                {props.helperText}
              </div>
            )}
            {props.type === RejectDialogType.Part && (
              <>
                <div className={Divider} />
                <div className={cx(Description, Typo.Label.l3_regular)}>
                  {props.partialDescription}
                </div>
              </>
            )}
            <MultiRejectContent content={props.content} />
          </>
        );
    }
  };

  return (
    <SmallDialog
      title={title}
      cancelText={cancelText}
      showOk={props.type === RejectDialogType.Part}
      okText={props.type === RejectDialogType.Part ? props.okText : undefined}
      onOk={props.type === RejectDialogType.Part ? props.onOk : undefined}
      onCancel={props.onCancel}
      className={className}
    >
      {description && (
        <div className={cx(Description, Typo.Label.l3_regular)}>
          {description}
        </div>
      )}
      {renderContent()}
    </SmallDialog>
  );
};
