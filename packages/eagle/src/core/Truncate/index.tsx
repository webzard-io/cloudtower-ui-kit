import { css } from "@linaria/core";
import Tooltip from "@src/core/Tooltip";
import cs from "classnames";
import React from "react";
const Inline = css`
  display: inline-block;
`;

export type TruncatePropTypes = {
  text: string;
  len?: number;
  frontLen?: number;
  backLen?: number;
  hoverShowFullText?: boolean;
  className?: string;
  inline?: boolean;
};

const Truncate: React.FC<TruncatePropTypes> = (props) => {
  const {
    text,
    len = 100,
    frontLen,
    backLen = 4,
    hoverShowFullText = true,
    className,
    inline,
  } = props;
  if (len <= 0) {
    console.error("[Truncate] prop len can not be 0 or negative number");
    return null;
  }
  if (backLen < 0) {
    console.error("[Truncate] prop backLen can not be negative number");
    return null;
  }
  if (frontLen && frontLen < 0) {
    console.error("[Truncate] prop frontLen can not be negative number");
    return null;
  }
  const ellipse = "...";
  let _backLen = Math.min(
    backLen,
    text.length - ellipse.length,
    len - ellipse.length
  );

  const _frontLen =
    frontLen !== undefined
      ? Math.min(frontLen, text.length - ellipse.length, len - ellipse.length)
      : Math.max(len - _backLen - ellipse.length, 0);

  if (_frontLen + _backLen + ellipse.length > len) {
    _backLen = len - _frontLen - ellipse.length;
  }

  const truncated =
    text.length <= len
      ? text
      : text.slice(0, _frontLen) + ellipse + text.slice(text.length - _backLen);

  const Text = (
    <div className={cs([className, inline && Inline])}>{truncated}</div>
  );
  if (!hoverShowFullText || text.length <= len) {
    return Text;
  }
  return <Tooltip title={text}>{Text}</Tooltip>;
};

export default Truncate;
