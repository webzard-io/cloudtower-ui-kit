const fs = require('fs');
const path = require('path')

const output = "./dist/image-types.d.ts"
const generateType = (folderPath, pre) => {
  let res = '';
  const dirNames = fs.readdirSync(folderPath);
  dirNames.forEach(name => {
    const fileLstat = fs.lstatSync(path.join(folderPath, name));
    if (fileLstat.isDirectory()) {
      res += generateType(path.join(folderPath, name), `${name}/`);
    } else {
      const idx = name.indexOf('.');
      const realName = name.substring(0, idx);
      const format = name.substring(idx + 1);
      if (['jpg', 'jpeg', 'png', 'svg'].includes(format)) {
        res += pre ? ` | "${pre}${realName}"` : ` | "${realName}"`;
      }
    }
  });
  fs.writeFileSync(output, ['export type ImagesType =', res].join(' ') ,'utf-8')
};

generateType(path.resolve(__dirname, '../../icons/src'))
