import type { Args, Meta } from "@storybook/react";

// Core
type CoreTitle = `Core/${string} | ${string}`;
export type CoreMeta<TCmpOrArgs = Args> = Meta<TCmpOrArgs> & {
  title: CoreTitle;
};

// CoreX

type CoreXTitle = `CoreX/${string} | ${string}`;
export type CoreXMeta<TCmpOrArgs = Args> = Meta<TCmpOrArgs> & {
  title: CoreXTitle;
};
