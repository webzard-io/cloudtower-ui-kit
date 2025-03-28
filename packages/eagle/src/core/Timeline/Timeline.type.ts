import { AlertProps } from "@src/core/Alert";
import { ReactNode } from "react";
import { TagProps } from "@src/core/Tag";
import { LinkProps } from "@src/core/Link";

/**
 * 标签属性，扩展自基础Tag组件属性
 * @property {string} category - 固定为 'tag'，标识这是一个标签元素
 */
export type TimelineTagProps = TagProps & {
  category: "tag";
};

/**
 * 信息文本属性
 * @property {string} category - 文本类型，决定样式和用途
 * @property {React.ReactNode} children - 文本内容
 * @property {number} multiLines - 多行文本显示行数限制，超出将被省略
 * @property {string} className - 自定义CSS类名
 */
export type TimelineInfoProps = {
  category: "subinfo_label" | "info" | "info_bold";
  children?: React.ReactNode;
  multiLines?: number;
  className?: string;
};

/**
 * 链接属性，扩展自基础Link组件属性
 * @property {string} category - 固定为 'link'，标识这是一个链接元素
 */
export type TimelineLinkProps = LinkProps & {
  category: "link";
};

/**
 * 时间线信息区域属性
 * @property {number} gap - 元素之间的间距，控制项目间的空白
 * @property {React.ReactNode} split - 分隔符，用于在项目之间显示分隔符，如点、线等
 * @property {string} className - 自定义CSS类名，用于自定义区域样式
 * @property {Array} items - 区域中包含的元素列表，可以是标签、文本、链接
 * @property {React.ReactNode} suffix - 后缀内容，通常用于放置操作按钮
 */
export type TimelineAreaProps = {
  gap?: number;
  split?: React.ReactNode;
  className?: string;
  items: Array<TimelineInfoProps | TimelineLinkProps | TimelineTagProps>;
  suffix?: React.ReactNode;
};

/**
 * 时间线项目数据结构
 * 定义单个时间线项目的所有属性和配置
 */
export interface TimelineItemData {
  /**
   * 条目的状态，影响图标和颜色样式
   * - success: 成功状态，显示绿色对勾图标
   * - failed: 失败状态，显示红色错误图标
   * - pending: 等待状态，显示黄色等待图标
   * - notice: 通知状态，显示黄色警告图标
   * - progress: 进行中状态，显示蓝色加载图标（带旋转动画）
   * - idle: 空闲状态，显示灰色图标
   */
  status: "success" | "failed" | "pending" | "notice" | "progress" | "idle";

  /**
   * 详情信息，通常用于显示错误详情或额外说明
   * 默认使用Alert组件展示，样式会根据status自动匹配
   * @example
   * detailMessage: {
   *   message: "升级失败，请检查网络连接",
   *   action: <Button>重试</Button>
   * }
   */
  detailMessage?: AlertProps;

  /**
   * 自定义详情信息渲染函数，优先级高于detailMessage
   * 可以完全自定义详情区域的展示内容和样式
   * @param detailMessage - 默认的详情信息配置
   * @returns 自定义渲染的React节点
   * @example
   * detailMessageRender: (message) => (
   *   <div style={{ padding: "8px" }}>
   *     <div>{message?.message}</div>
   *     <Button>重试</Button>
   *   </div>
   * )
   */
  detailMessageRender?: (detailMessage?: AlertProps) => ReactNode;

  /**
   * 主要信息区域，展示操作标题、版本号等重要信息
   * 支持多行信息，每行可以包含多个不同类型的元素（标签、文本、链接等）
   * 注意：标签元素(tag)应放在文本前面，以符合设计规范
   * @example
   * infos: [
   *   {
   *     items: [
   *       { category: 'tag', color: 'blue', children: '升级' },
   *       { category: 'info', children: 'v1.0.0' }
   *     ]
   *   }
   * ]
   */
  infos: TimelineAreaProps[];

  /**
   * 自定义主要信息渲染函数，优先级高于infos
   * 可以完全自定义主要信息区域的展示内容和样式
   * @param infos - 默认的主要信息配置
   * @returns 自定义渲染的React节点
   * @example
   * infosRender: (infos) => (
   *   <div style={{ display: "flex", alignItems: "center" }}>
   *     <span style={{ fontWeight: "bold" }}>
   *       {infos[0].items.find(i => i.category.includes("info"))?.children}
   *     </span>
   *     <Tag color="green">稳定版</Tag>
   *   </div>
   * )
   */
  infosRender?: (infos: TimelineAreaProps[]) => ReactNode;

  /**
   * 主要信息区域的操作按钮，通常用于放置查看详情等操作
   * 会显示在主要信息区域的右侧
   * @example
   * infoAction: <Link onClick={() => console.log("查看详情")}>查看详情</Link>
   */
  infoAction?: ReactNode;

  /**
   * 次要信息区域，通常用于展示时间、状态等辅助信息
   * 支持多种元素类型和分隔符
   * @example
   * subInfo: {
   *   split: 'dot',
   *   items: [
   *     { category: 'subinfo_label', children: '2023-06-01 10:00:00' },
   *     { category: 'subinfo_label', children: '用时30分钟' }
   *   ]
   * }
   */
  subInfo?: TimelineAreaProps;

  /**
   * 自定义次要信息渲染函数，优先级高于subInfo
   * 可以完全自定义次要信息区域的展示内容和样式
   * @param subInfo - 默认的次要信息配置
   * @returns 自定义渲染的React节点
   * @example
   * subInfoRender: (subInfo) => {
   *   const startTime = String(subInfo?.items[0].children || "");
   *   const endTime = String(subInfo?.items[1].children || "");
   *   return (
   *     <div>
   *       <div>开始时间: {startTime}</div>
   *       <div>结束时间: {endTime}</div>
   *     </div>
   *   );
   * }
   */
  subInfoRender?: (subInfo?: TimelineAreaProps) => ReactNode;
}

/**
 * Timeline组件属性
 * 定义Timeline组件接收的所有属性
 */
export interface TimelineProps {
  /**
   * 是否启用紧凑模式，启用后时间线项目之间的间距会减小
   * 适合在有限空间内展示更多时间线项目
   * @default false
   * @example
   * compact={true}
   */
  compact?: boolean;

  /**
   * 时间线项目数据数组，包含要显示的所有时间线条目
   * 数组中的每个项目定义一个时间线条目的全部内容和样式
   * @example
   * items={[
   *   {
   *     status: "success",
   *     infos: [{ items: [{ category: "info", children: "操作成功" }] }],
   *     subInfo: { items: [{ category: "subinfo_label", children: "2023-06-01" }] }
   *   }
   * ]}
   */
  items: TimelineItemData[];

  /**
   * 空状态显示文本，当items为空数组时显示
   * @default "暂无数据"
   * @example
   * emptyText="暂无历史记录"
   */
  emptyText?: string;

  /**
   * 空状态文本的样式类名，可用于自定义空状态文本的样式
   * @example
   * emptyTextClassName={Typo.Label.l2_bold_title}
   */
  emptyTextClassName?: string;

  /**
   * 自定义空状态渲染函数，优先级高于emptyText
   * 可以完全自定义空状态的展示内容和样式
   * @param emptyText - 默认的空状态文本
   * @returns 自定义渲染的React节点
   * @example
   * emptyRender={(text) => (
   *   <div>
   *     <div>{text}</div>
   *     <Button type="primary">刷新数据</Button>
   *   </div>
   * )}
   */
  emptyRender?: (emptyText?: string) => ReactNode;
}
