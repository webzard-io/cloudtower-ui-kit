const less = require('less');
const fs = require('fs');
const path = require('path');

const compileAntd = async () => {
    const antdPaths = require.resolve('antd/dist/antd.less')
    const antd = fs.readFileSync(antdPaths, 'utf-8');
    const options = {
        sourceMap: true,
        javascriptEnabled: true,
        paths: [
            path.dirname(antdPaths)
        ],
        math: "always",
        // https://ant.design/docs/react/customize-theme-cn
        modifyVars: {
            "@primary-color": "#0080FF",
            "@link-color": "#0080FF",
            "@text-color": "#06101F",
            "@success-color": "#25C764",
            "@border-radius-base": "3px",
            "@screen-xs": "1279px",
            "@screen-sm": "1536px",
            "@screen-md": "2176px",
            "@screen-lg": "2304px",
        },
    };
    const result  = await less.render(antd, options)
    fs.writeFileSync(path.resolve(__dirname, '../src/styles/antd.css'), result.css)
    
};

compileAntd();