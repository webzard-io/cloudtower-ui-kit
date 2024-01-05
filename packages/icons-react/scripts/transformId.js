const { types: t } = require("@babel/core");

const RADIAL = "_radial"

const transformId = (api, opts) => {
  const { componentName } = opts;

  return {
    visitor: {
      JSXAttribute(path) {
        const valuePath = path.get("value")
        const namePath = path.get("name")
        const names = ["id", "fill", "stroke"];

        if (names.includes(namePath.node.name) && valuePath.node.value?.includes(RADIAL)) {
          const newValue = valuePath.node.value.replace(RADIAL, `${RADIAL}_${componentName}`);

          valuePath.replaceWith(t.stringLiteral(newValue))
        }
      },
    },
  }
}

module.exports = transformId
