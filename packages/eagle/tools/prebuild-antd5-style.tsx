//@ts-nocheck
const fs = require("fs");
const path = require("path");
const React = require("react");
const {
  createCache,
  StyleProvider,
  extractStyle: extStyle,
} = require("@ant-design/cssinjs");
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

const Antd5PrefixCls = "antd5";

const Antd5ComponentPrefixCls = {
  Cascader: `${Antd5PrefixCls}-cascader`,
  Progress: `${Antd5PrefixCls}-progress`,
  Segmented: `${Antd5PrefixCls}-segmented`,
  Menu: `${Antd5PrefixCls}-menu`,
} satisfies Partial<Record<keyof typeof antd5, string>>;

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

const css = extractStyle();

fs.writeFileSync(outputPath, css);
