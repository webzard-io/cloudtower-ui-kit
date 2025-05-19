module.exports = {
  multipass: true, // 多次优化以获得最佳压缩效果
  plugins: [
    // 基本清理
    'removeDoctype',
    'removeXMLProcInst',
    'removeComments',
    'removeMetadata',
    'removeEditorsNSData',
    'cleanupAttrs',
    'mergeStyles',
    'inlineStyles',
    'minifyStyles',
    'removeStyleElement',
    'removeUnusedNS',
    
    // 移除无效和冗余的 SVG 属性
    'removeUselessDefs',
    'cleanupIds',
    'removeEmptyAttrs',
    'removeEmptyContainers',
    'removeEmptyText',
    'removeHiddenElems',
    {
      name: 'removeViewBox',
      active: false // 保留 viewBox 属性，这对响应式很重要
    },
    
    // 优化路径数据
    {
      name: 'cleanupNumericValues',
      params: {
        floatPrecision: 1,
        leadingZero: false
      }
    },
    {
      name: 'convertPathData',
      params: {
        floatPrecision: 2,
        forceAbsolutePath: false,
        noSpaceAfterFlags: true,
        leadingZero: false,
        utilizeAbsolute: true
      }
    },
    {
      name: 'cleanupListOfValues',
      params: {
        floatPrecision: 1,
        leadingZero: false
      }
    },
    'convertTransform',
    
    // 压缩颜色值
    {
      name: 'convertColors',
      params: {
        currentColor: true,
        names2hex: true,
        rgb2hex: true,
        shorthex: true,
        shortname: true
      }
    },
    
    // 精简路径
    'mergePaths',
    'removeOffCanvasPaths',
    
    // 其他优化
    'sortAttrs',
    'sortDefsChildren',
    'removeTitle',
    'removeDesc',
    {
      name: 'removeDimensions',
      active: true // 如果有 viewBox，删除宽高属性
    },
    'removeAttrs',
    // 'removeAttributesBySelector',
    'removeElementsByAttr',
    'collapseGroups',
    'reusePaths'
  ]
}; 