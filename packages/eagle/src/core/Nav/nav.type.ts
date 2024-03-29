export type NavProps = {
  /**
   * 导航栏左侧区域
   */
  left?: React.ReactNode[];
  /**
   * 导航栏右侧区域
   */
  right?: React.ReactNode[];
  /**
   * 导航栏中央区域
   */
  center?: React.ReactNode[];
  isScrolled?: boolean;
  navRef?: React.RefObject<HTMLHeadElement>;
};
