export type I18nNameTagType = {
  /**
   * 需要高亮的内容，对应 i18n 词条 <1>{name}<1> 部分
   */
  name: string;
  /**
   * i18n 词条 key
   */
  i18nKey: string;

  /**
   * 其它透传给 i18n Trans 组件的内容，具体参考 [trans-component](https://react.i18next.com/latest/trans-component)
   */
  [key: string]: unknown;
};
