import { styled } from "linaria/react";
import React, { useLayoutEffect, useRef, useState } from "react";

import Tooltip from "../../components/Tooltip";
import { TruncateTextWithTooltipType } from "../../spec/base";

// This style is set to make sure tooltip placement is right
const TruncatedTextWrapper = styled.div`
  width: 100%;
  overflow: inherit;
  white-space: inherit;
  text-overflow: ellipsis;
`;

/**
 * Before use this component,
 * Make sure text parent element has set css like below:
 * overflow: hidden;
 * white-space: nowrap;
 */

const TruncatedTextWithTooltip: React.FC<TruncateTextWithTooltipType> = (
  props,
) => {
  const { text, textWrapperCls, ...restProps } = props;
  const [isTextTruncated, setTextTruncated] = useState(false);
  const textWrapper = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const ele = textWrapper.current;
    if (ele) {
      const parent = ele.parentElement;
      if (parent && parent?.scrollWidth > parent?.clientWidth) {
        setTextTruncated(true);
      }
    }
  }, [text]);

  const renderName = () => (
    <span ref={textWrapper} className={textWrapperCls}>
      {text}
    </span>
  );

  return isTextTruncated ? (
    <Tooltip {...restProps} title={text} data-testid="text-tooltip">
      <TruncatedTextWrapper>{renderName()}</TruncatedTextWrapper>
    </Tooltip>
  ) : (
    renderName()
  );
};

export default TruncatedTextWithTooltip;
