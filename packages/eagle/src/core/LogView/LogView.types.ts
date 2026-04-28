import type { EventSourceInit } from "eventsource";
import type { Terminal } from "@xterm/xterm";
import type { SearchInputProps } from "../SearchInput";

export interface EventSourceOptions {
  closeEventName?: string;
  openEventName?: string;
  errorEventName?: string;
  messageEventName?: string;

  url?: string;

  initOptions?: EventSourceInit;
  /**
   * Callback when the eventsource is opened
   */
  onOpen?:
    | ((
        e: Event,
        eventSource: EventSource,
        params: {
          terminal: Terminal;
        },
      ) => void)
    | undefined;
  /**
   * Callback when the eventsource is closed
   */
  onClose?: ((e: Event) => void) | undefined;
  /**
   * Callback when the eventsource has an error
   */
  onError?: ((e: Event) => void) | undefined;
  /**
   * Callback which formats the eventsource data stream.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onMessage?: ((message: any) => void) | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formatMessage?: ((message: any) => string) | undefined;
  /**
   * Set to true, to reconnect the EventSource automatically.
   */
  reconnect?: boolean;
  /**
   * Set the time to wait between reconnects in seconds.
   * Default is 1s
   */
  reconnectWait?: number;
  onSetupEventSource?: (params: { setupFn: () => void }) => void;
}

export interface LogViewProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 是否显示顶部搜索栏。
   * @default true
   */
  showSearch?: boolean;
  /**
   * 静态日志内容，换行后会按终端逐行渲染。
   */
  content?: string;
  /**
   * 是否启用 EventSource
   * @default false
   */
  eventSource?: boolean;
  /**
   * EventSource 的配置
   */
  eventSourceOptions?: EventSourceOptions;
  /**
   * 终端滚动缓冲区大小，用于限制保留的历史日志行数。
   * @default 9999999
   */
  scrollback?: number;
  /**
   * 终端可视区域的行数
   * @default 23
   */
  rows?: number;
  /**
   * 搜索高亮结果的最大数量，注意：在日志数据量较大时需要设置为较小的值（比如 1000），否则可能会导致性能问题，请根据实际情况进行调整
   * @default 999999
   */
  searchHighlightLimit?: number;
  /**
   * 是否启用键盘快捷键
   * @default true
   */
  enableKeyboardShortcuts?: boolean;
  /**
   * 自定义无数据时的内容渲染
   * @param terminal xterm终端实例，可用于写入自定义内容
   */
  emptyRenderer?: (terminal: Terminal) => React.ReactNode;
  /**
   * 自定义错误时的内容渲染
   * @param terminal xterm终端实例
   * @param error 错误对象
   * @param reconnect 重新连接函数
   */
  errorRenderer?: (
    terminal: Terminal,
    error: Error | Event,
    reconnect: () => void,
  ) => React.ReactNode;
  /**
   * 搜索框的配置
   */
  searchInputProps?: Partial<SearchInputProps>;
}
