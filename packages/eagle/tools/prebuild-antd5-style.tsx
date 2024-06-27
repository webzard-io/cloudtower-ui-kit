//@ts-nocheck
import { Antd5ComponentPrefixCls, Antd5PrefixCls } from "../src/utils";
import fs from "fs";
import path from "path";
import React from "react";
import {
  createCache,
  StyleProvider,
  extractStyle as extStyle,
} from "@ant-design/cssinjs";
import { ConfigProvider } from "antd5";
import prettier from "prettier";
const antd5 = require("antd5");
const { renderToString } = require("react-dom/server");

const outputPath = path.resolve(__dirname, "../src/styles/libs/antd5.css");
const blackList = [
  "ConfigProvider",
  "Drawer",
  "Grid",
  "Modal",
  "Popconfirm",
  "Popover",
  "Tooltip",
  "Tour",
];

const defaultNode = () => (
  <>
    {Object.keys(antd5)
      .filter(
        (name) =>
          !blackList.includes(name) && name[0] === name[0].toUpperCase(),
      )
      .map((compName) => {
        const Comp = antd5[compName];
        if (compName === "Dropdown") {
          return (
            <Comp key={compName} menu={{ items: [] }}>
              <div />
            </Comp>
          );
        }
        // @ts-ignore
        return (
          <Comp key={compName} prefixCls={Antd5ComponentPrefixCls[compName]} />
        );
      })}
  </>
);

type CustomRender = (node: JSX.Element) => JSX.Element;
const extractStyle = (customTheme?: CustomRender) => {
  const cache = createCache();
  renderToString(
    <StyleProvider cache={cache}>
      {customTheme ? customTheme(defaultNode()) : defaultNode()}
    </StyleProvider>,
  );

  const styleText = extStyle(cache, true);
  return styleText;
};

const css = extractStyle((node) => (
  <ConfigProvider prefixCls={Antd5PrefixCls} theme={{ hashed: false }}>
    {node}
  </ConfigProvider>
));

prettier
  .format(css, {
    parser: "css",
  })
  .then((data) => {
    fs.writeFileSync(outputPath, data);
  });
