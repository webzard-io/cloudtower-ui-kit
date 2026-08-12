import { Loading64GradientBlueIcon } from "@cloudtower/icons-react";
import { css } from "@linaria/core";
import Icon from "@src/core/Icon";
import { LoadingComponentType } from "@src/core/Loading/loading.type";
import { FullView } from "@src/core/Styled";
import { Animation, Keyframes } from "@src/styles/token/animation";
import cx from "classnames";
import React, { Fragment } from "react";

const LoadingWrapper = css`
  width: 64px;
  height: 64px;
  max-width: 64px;
  max-height: 64px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  opacity: 0.6;
  .icon-wrapper {
    ${Keyframes["rotate"]};
    animation: ${Animation["circleRotate"]};
  }
`;

const CircleLoading: LoadingComponentType = ({
  fullView = true,
  className,
  ...restProps
}) => {
  const Wrapper = fullView ? FullView : Fragment;
  const props = fullView ? { className: "loading-full-view" } : {};
  return (
    <Wrapper {...props} data-testid="loading">
      <div className={cx(LoadingWrapper, className)} {...restProps}>
        <Icon src={Loading64GradientBlueIcon} iconWidth={64} iconHeight={64} />
      </div>
    </Wrapper>
  );
};

export default CircleLoading;
