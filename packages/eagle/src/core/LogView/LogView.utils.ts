import { EventSource } from "eventsource";
import { Terminal } from "@xterm/xterm";
import { EventSourceOptions } from "./LogView.types";

export const ENCODED_NEWLINE = 10; // \n
export const ENCODED_CARRIAGE_RETURN = 13; // \r
export const SEARCH_BAR_HEIGHT = 45;

/**
 * Create an event source connection to stream logs
 * @param url The URL to connect to
 * @param options The options for the connection
 * @param terminal Terminal instance to append logs to directly
 * @returns Function to close/abort the connection
 */
export const eventsource = (
  url: string | URL,
  options: EventSourceOptions,
  terminal: Terminal,
) => {
  const {
    initOptions,
    onOpen,
    onClose,
    onError,
    formatMessage,
    closeEventName = "close",
    openEventName = "open",
    errorEventName = "error",
    messageEventName = "message",
    onMessage,
  } = options;
  let aborted: boolean = false;
  let eventSource: EventSource | null = null;

  // Function to close connection
  const close = () => {
    aborted = true;
    if (eventSource) {
      eventSource.close();
      eventSource = null;
    }
  };

  // Function to start connection
  const start = () => {
    try {
      // Try to connect to eventSource
      eventSource = new EventSource(url, initOptions);

      eventSource.addEventListener(openEventName, (e) => {
        onOpen &&
          onOpen(e, eventSource as EventSource, {
            terminal,
          });
      });

      eventSource.addEventListener(errorEventName, (err) => {
        onError && onError(err);

        // Handle reconnection if needed
        if (
          !aborted &&
          options.reconnect &&
          eventSource?.readyState === EventSource.CLOSED
        ) {
          const timeout = options.reconnectWait ?? 1;
          setTimeout(start, timeout * 1000);
        }
      });

      eventSource.addEventListener(messageEventName, (e) => {
        onMessage && onMessage(e);
        let msg = formatMessage ? formatMessage(e.data) : e.data;

        if (typeof msg !== "string") {
          return;
        }

        // Add a new line character if one doesn't exist
        msg = msg.endsWith("\n") ? msg : `${msg}\n`;

        // Write directly to terminal
        terminal.write(msg);
      });

      // Handle custom close event if EventSource doesn't support it natively

      eventSource.addEventListener(closeEventName, (e) => {
        onClose?.(e);
        close();
        if (!aborted && options.reconnect) {
          const timeout = options.reconnectWait ?? 1;
          setTimeout(start, timeout * 1000);
        }
      });
    } catch (err) {
      console.error("Error connecting to EventSource:", err);

      // Try to reconnect if needed
      if (!aborted && options.reconnect) {
        const timeout = options.reconnectWait ?? 1;
        setTimeout(start, timeout * 1000);
      }
    }
  };

  // Start the connection immediately
  start();

  // Return function to close connection
  return close;
};

type KeyboardAction = Pick<
  KeyboardEvent,
  "ctrlKey" | "shiftKey" | "key" | "metaKey"
>;
const macBasic: Omit<KeyboardAction, "key" | "metaKey"> = {
  ctrlKey: false,
  shiftKey: false,
};
export const customShortcutsForMac: KeyboardAction[] = [
  { ...macBasic, metaKey: false, key: "arrowup" },
  { ...macBasic, metaKey: false, key: "arrowdown" },
  { ...macBasic, metaKey: false, key: "pageup" },
  { ...macBasic, metaKey: false, key: "pagedown" },
  { ...macBasic, metaKey: true, key: "c" },
  { ...macBasic, metaKey: true, key: "a" },
];

const winBasic: Omit<KeyboardAction, "key" | "ctrlKey"> = {
  metaKey: false,
  shiftKey: false,
};
export const customShortcutsForWin: KeyboardAction[] = [
  { ...winBasic, ctrlKey: false, key: "pageup" },
  { ...winBasic, ctrlKey: false, key: "pagedown" },
  { ...winBasic, ctrlKey: true, key: "arrowup" },
  { ...winBasic, ctrlKey: true, key: "arrowdown" },
  { ...winBasic, ctrlKey: true, key: "c" },
  { ...winBasic, ctrlKey: true, key: "a" },
];

export const isCustomKeyboardAction = (
  event: KeyboardEvent,
  actions: KeyboardAction[],
) =>
  actions.some(
    (a) =>
      a.ctrlKey === event.ctrlKey &&
      a.shiftKey == event.shiftKey &&
      a.metaKey === event.metaKey &&
      a.key.toLocaleLowerCase() === event.key.toLocaleLowerCase(),
  );

// 检测操作系统
export const isMacOS = () => {
  return (
    navigator.platform.indexOf("Mac") !== -1 ||
    navigator.userAgent.indexOf("Mac") !== -1
  );
};

// 滚动处理函数
export const scrollPages = (
  direction: "up" | "down",
  terminal: Terminal | null | undefined,
) => {
  if (terminal) {
    const pageCount = direction === "up" ? -1 : 1;
    terminal.scrollPages(pageCount);
  }
};

export const scrollLines = (
  direction: "up" | "down",
  terminal: Terminal | null | undefined,
) => {
  if (terminal) {
    const lineCount = direction === "up" ? -1 : 1;
    terminal.scrollLines(lineCount);
  }
};

export const selectAll = (terminal: Terminal | null | undefined) => {
  if (terminal) {
    terminal.selectAll();
  }
};

export const copySelectLines = (terminal: Terminal | null | undefined) => {
  if (terminal) {
    navigator.clipboard.writeText(terminal.getSelection());
  }
};
