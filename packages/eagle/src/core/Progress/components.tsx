import {
  CheckmarkDoneSuccessCorrect16GreenIcon,
  LoadingBlue16Icon,
  NoticeTriangleFill16YellowIcon,
  XmarkFailed16RedIcon,
} from "@cloudtower/icons-react";
import { cx } from "@linaria/core";
import { styled } from "@linaria/react";
import Icon from "@src/core/Icon";
import { StatusColorMap } from "@src/core/Progress/progress.const";
import { DescriptionStyle } from "@src/core/Progress/progress.style";
import { IconFieldProps, InfoProps } from "@src/core/Progress/progress.type";
import { Typo } from "@src/core/Typo";
import OverflowTooltip from "@src/coreX/OverflowTooltip";
import { Color } from "@src/styles/token/color";
import cs from "classnames";
import React from "react";

const IconFieldText = styled.div<{ color?: string }>`
  color: ${({ color }) => color || ""};
`;

export const StatusIconMap = {
  success: <CheckmarkDoneSuccessCorrect16GreenIcon />,
  failed: <XmarkFailed16RedIcon />,
  paused: <NoticeTriangleFill16YellowIcon />,
  active: <Icon src={LoadingBlue16Icon} isRotate />,
};

const IconFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 4px;
  font-size: 12px;
  color: ${Color.text.neutral.secondary};
`;

export const IconField: React.FC<IconFieldProps> = ({
  src,
  children,
  status,
}) => {
  const iconNode = status ? StatusIconMap[status] : <Icon src={src} />;
  const color = status ? StatusColorMap[status] : undefined;

  return (
    <IconFieldWrapper className={cx("progress-status-field")}>
      {iconNode}
      <IconFieldText color={color}>{children}</IconFieldText>
    </IconFieldWrapper>
  );
};

export const Info: React.FC<InfoProps> = ({ children, type, multiLines }) => {
  const isTitle = type === "title";
  return (
    <OverflowTooltip
      className={cs({
        "progress-title": isTitle,
        [Typo.Label.l2_bold]: isTitle,
        "progress-desc": !isTitle,
        [DescriptionStyle]: !isTitle,
      })}
      multiLines={multiLines}
      content={children}
    />
  );
};
