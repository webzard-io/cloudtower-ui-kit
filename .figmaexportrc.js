require('dotenv').config()

function addIIfStartsWithNumber(inputString) {
    // 使用正则表达式检查字符串是否以数字开头
    if (/^\d/.test(inputString)) {
      // 如果以数字开头，添加 'i' 并返回
      return 'i' + inputString;
    }
    // 否则返回原始字符串
    return inputString;
  }
  
function stringToObject(inputString) {
    const keyValuePairs = inputString.replace(/[\s]/g, '').toLowerCase().split(','); // 首先根据逗号和空格分割字符串
    const resultObject = {};
    keyValuePairs.forEach((pair) => {
        const [key, value] = pair.split('='); // 再根据等号分割键值对
        resultObject[key.toLowerCase()] = value;
    });
  
    return resultObject;
}

function getBasename (basename, styles) {
    const parts = [
        basename,
        // on or off
        styles.star,
        styles.status,
        styles.enabled,
        styles.smallcaps,
        // contents
        styles.type,
        styles.outline,
        styles.content,
        // styles
        styles.size,
        styles.fill,
        styles.style,
        styles.weight,
        ];
    const filteredParts = parts.filter(part => part); // 过滤掉空的部分
    const fileName = filteredParts.join('-').replace(/[\s.*]/g, '').replace(/[.\(\)\（\）]/g, '-').toLowerCase() + '.svg';
    return fileName;
  }
  

module.exports = {
    commands: [
        ['components', {
            fileId: '8fqRbp9K817NpssBGJxmcr',
            onlyFromPages: ['Icons'],
            outputters: [
                require('@figma-export/output-components-as-svg')({
                    output: './packages/icons',
                    getDirname: () => 'src',
                    getBasename: (options) => {
                        const { pathToComponent } = options;
                        const set = pathToComponent.find(set => set.type === 'COMPONENT_SET');
                        if (set) {
                            const [, basename] = set.name.split('/')
                            const styles = stringToObject(options.basename);
                            const svgname = getBasename(addIIfStartsWithNumber(basename.replace(/[.\(\)\（\）]/g, '-').replace(/[\s]/g, '')), styles);
                            return svgname
                        }
                        return `${options.basename}.svg`;
                    },
                })
            ]
        }]
    ]
};
