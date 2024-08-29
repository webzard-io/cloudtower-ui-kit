import { css } from "@linaria/core";
import { Typo } from "@src/core";
import Skeleton from "@src/core/Skeleton";
import { ComponentStory } from "@storybook/react";
import React from "react";

export default {
  title: "Core/Skeleton",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xfGf2oCgsi1s2EvFPNyJd8/Pattern%EF%BC%9A%E5%8A%A0%E8%BD%BD%E7%8A%B6%E6%80%81?node-id=785-21522&t=sruQcjLntbszS7ft-4",
    },
  },
};

const Title: React.FC = ({ children }) => (
  <div style={{ marginTop: "16px" }} className={Typo.Display.d2_bold_title}>
    {children}
  </div>
);

export const Content: ComponentStory<typeof Skeleton.Content> = () => {
  return (
    <>
      <section
        className={css`
          width: 648px;

          & > div {
            margin-bottom: 10px;
          }
        `}
      >
        <Title>Content Skeleton</Title>
        <div
          className={css`
            width: 200px;
            height: 60px;
            padding: 10px;
            border: 1px solid;
          `}
        >
          <Skeleton.Content />
        </div>
      </section>

      <section
        className={css`
          width: 648px;

          & > div {
            margin-bottom: 10px;
          }
        `}
      >
        <div
          className={css`
            height: 60px;
            padding: 10px;
            border: 1px solid;
          `}
        >
          <Skeleton.Content />
        </div>
      </section>

      <section
        className={css`
          width: 200px;
          height: 200px;

          & > div {
            margin-bottom: 10px;
          }
        `}
      >
        <div
          className={css`
            width: 100%;
            height: 100%;
            padding: 10px;
            border: 1px solid;
          `}
        >
          <Skeleton.Content />
        </div>
      </section>
    </>
  );
};

Content.story = {
  name: "Core/Skeleton/Content",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xfGf2oCgsi1s2EvFPNyJd8/Pattern%EF%BC%9A%E5%8A%A0%E8%BD%BD%E7%8A%B6%E6%80%81?node-id=1227-5770&t=sruQcjLntbszS7ft-4",
    },
  },
};
