import {
  CheckmarkDoneSuccessCorrect16GreenIcon,
  Loading16GradientBlueIcon,
  NoticeTriangleFill16YellowIcon,
  XmarkFailed16RedIcon,
} from "@cloudtower/icons-react";
import { css, cx } from "@linaria/core";
import { styled } from "@linaria/react";
import Icon from "@src/core/Icon";
import { StatusColorMap } from "@src/core/Progress/progress.const";
import { DescriptionStyle } from "@src/core/Progress/progress.style";
import {
  DescriptionProps,
  IconFieldProps,
  TitleProps,
} from "@src/core/Progress/progress.type";
import { Typo } from "@src/core/Typo";
import OverflowTooltip from "@src/coreX/OverflowTooltip";
import React from "react";

const StatusFieldText = styled.div<{ color?: string }>`
  color: ${({ color }) => color || ""};
`;

export const StatusIconMap = {
  success: <CheckmarkDoneSuccessCorrect16GreenIcon />,
  failed: <XmarkFailed16RedIcon />,
  paused: <NoticeTriangleFill16YellowIcon />,
  active: <Loading16GradientBlueIcon />,
};

const StatusFieldStyle = css`
  display: flex;
  align-items: center;
  column-gap: 4px;
`;

export const IconField: React.FC<IconFieldProps> = ({
  src,
  content,
  status,
}) => {
  const iconNode = status ? StatusIconMap[status] : <Icon src={src} />;
  const color = status ? StatusColorMap[status] : undefined;

  return (
    <div className={cx("progress-status-field", StatusFieldStyle)}>
      {iconNode}
      <StatusFieldText color={color}>{content}</StatusFieldText>
    </div>
  );
};

export const Title: React.FC<TitleProps> = ({ content }) => {
  return (
    <OverflowTooltip
      className={cx("progress-title", Typo.Label.l2_bold)}
      content={content}
    ></OverflowTooltip>
  );
};

export const Description: React.FC<DescriptionProps> = ({ content }) => {
  return (
    <OverflowTooltip
      content={content}
      className={cx("progress-desc", DescriptionStyle)}
    >
      {content}
    </OverflowTooltip>
  );
};
