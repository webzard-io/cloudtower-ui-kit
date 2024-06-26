const fs = require('fs');
const path = require('path')
const React = require('react');
const { createCache, StyleProvider, extractStyle:extStyle } = require("@ant-design/cssinjs")
const antd5 = require('antd5');
const { renderToString } = require("react-dom/server")

const outputPath = path.resolve(__dirname, '../src/styles/libs/antd5.css');
const blackList = ['ConfigProvider', 'Drawer', 'Grid', 'Modal', 'Popconfirm', 'Popover', 'Tooltip', 'Tour']

const defaultNode = () => {
  return React.createElement(React.Fragment, null, Object.keys(antd5).filter(function (name) {
    return !blackList.includes(name) && name[0] === name[0].toUpperCase();
  }).map(function (compName) {
    var Comp = antd5[compName];
    if (compName === 'Dropdown') {
      return React.createElement(Comp, {
        key: compName,
        menu: {
          items: []
        }
      }, React.createElement("div", null));
    }
    return React.createElement(Comp, {
      key: compName
    });
  }));
}


const extractStyle = (customTheme) => {
  const cache = createCache();
  renderToString(
    React.createElement(StyleProvider, { cache }, customTheme ? customTheme(defaultNode()) : defaultNode())
  );

  const styleText = extStyle(cache, true);
  return styleText;
}


const css = extractStyle();

fs.writeFileSync(outputPath, css);
