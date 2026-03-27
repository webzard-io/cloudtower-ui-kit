export interface ITimeProps {
  className?: string;
  date?: string | number | Date | null;
  dateTemplate?: string | null;
  timeTemplate?: string | null;
  plainText?: boolean;
  /**
   * 仅在正常渲染分支（非空值、非 plainText）时生效，
   * 挂在根 `<span>` 上。空值和 plainText 分支返回 Fragment，不支持 data-testid。
   */
  "data-testid"?: string;
}
