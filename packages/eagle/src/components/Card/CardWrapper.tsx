import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import cs from "classnames";
import React, { CSSProperties, forwardRef, PropsWithChildren } from "react";

interface IProps {
  shadow?: boolean;
  className?: string;
  style?: CSSProperties;
}

const boxShadow = css`
  box-shadow:
    0px 0.119595px 0.438513px rgba(129, 138, 153, 0.14),
    0px 0.271728px 0.996336px rgba(129, 138, 153, 0.106447),
    0px 0.472931px 1.73408px rgba(129, 138, 153, 0.0912224),
    0px 0.751293px 2.75474px rgba(129, 138, 153, 0.0799253),
    0px 1.15919px 4.25036px rgba(129, 138, 153, 0.07),
    0px 1.80882px 6.63236px rgba(129, 138, 153, 0.0600747),
    0px 3.00293px 11.0107px rgba(129, 138, 153, 0.0487776),
    0px 6px 22px rgba(129, 138, 153, 0.0335534);
`;

const Wrapper = forwardRef<HTMLDivElement, PropsWithChildren<IProps>>(
  (props) => {
    const { children, className, shadow } = props;
    return (
      <div className={cs({ [boxShadow]: shadow }, className)}>{children}</div>
    );
  },
);

const CardWrapper = styled(Wrapper)`
  border-radius: 4px;
  background-color: white;
`;

export default CardWrapper;
