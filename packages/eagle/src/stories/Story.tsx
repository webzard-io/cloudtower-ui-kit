import { css } from "@linaria/core";
import React from "react";

import { Typo } from "../components/Typo";

export const Container: React.FC = (props) => {
  return (
    <div
      className={css`
        border-radius: 12px;
        border: 1px solid #ccd4e3;
        background: #fff;
        margin-top: 16px;
        height: 160px;
        width: 900px;
        display: flex;
        align-items: center;
        justify-content: center;
        .component {
          display: flex;
          align-items: center;
        }
      `}
    >
      {props.children}
    </div>
  );
};

export const Title: React.FC<{
  size?: "small" | "large";
}> = ({ children, size }) => (
  <div
    style={{ marginTop: "16px" }}
    className={
      size === "small" ? Typo.Label.l1_bold_title : Typo.Display.d2_bold_title
    }
  >
    {children}
  </div>
);
