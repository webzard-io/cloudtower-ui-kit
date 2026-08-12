import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cx } from "@linaria/core";
import type { Terminal } from "@xterm/xterm";
import type { ISearchOptions, SearchAddon } from "@xterm/addon-search";
import type { FitAddon } from "@xterm/addon-fit";
import {
  ArrowChevronDown16BlueIcon,
  ArrowChevronDown16OntintIcon,
  ArrowChevronUp16BlueIcon,
  ArrowChevronUp16OntintIcon,
  Search16OntintIcon,
  XmarkCloseCircleFill16OntintIcon,
  XmarkCloseCircleFill16OntintLightIcon,
} from "@cloudtower/icons-react";
import { Show } from "@src/coreX";
import { SearchInput } from "@src/core";
import { Color } from "@src/styles/token/color";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import {
  LogViewContainer,
  LogTerminal,
  LogViewInnerContaier,
  SearchInputStyle,
  CustomContentOverlay,
} from "./LogView.style";
import type { EventSourceOptions, LogViewProps } from "./LogView.types";
import { loadXtermModules as loadXtermModulesUntyped } from "./LogView.xtermLoader";
import {
  customShortcutsForMac,
  customShortcutsForWin,
  eventsource,
  isCustomKeyboardAction,
  scrollLines,
  scrollPages,
  isMacOS,
  selectAll,
  copySelectLines,
} from "./LogView.utils";

interface XtermModules {
  Terminal: typeof import("@xterm/xterm").Terminal;
  SearchAddon: typeof import("@xterm/addon-search").SearchAddon;
  FitAddon: typeof import("@xterm/addon-fit").FitAddon;
}

const loadXtermModules = loadXtermModulesUntyped as () => Promise<XtermModules>;

interface UseLogViewEventSourceParams {
  enabled: boolean;
  terminal: Terminal | null;
  options: EventSourceOptions;
  setHasData: React.Dispatch<React.SetStateAction<boolean>>;
  setEventSourceError: React.Dispatch<
    React.SetStateAction<Error | Event | null>
  >;
}

const useLogViewEventSource = ({
  enabled,
  terminal,
  options,
  setHasData,
  setEventSourceError,
}: UseLogViewEventSourceParams) => {
  const reconnectFnRef = useRef<(() => void) | null>(null);

  const optionsRef = useRef<EventSourceOptions>(options);
  optionsRef.current = options;

  const {
    url,
    closeEventName,
    errorEventName,
    messageEventName,
    openEventName,
    reconnect,
    reconnectWait,
  } = options;

  useEffect(() => {
    let closeEventSource: (() => void) | undefined;

    if (!enabled) {
      setEventSourceError(null);
      reconnectFnRef.current = null;
      return;
    }

    if (!terminal) return;

    const setupEventSource = () => {
      // 在创建新连接前，先关闭任何已存在的连接
      closeEventSource?.();
      setEventSourceError(null);

      closeEventSource = eventsource(
        optionsRef.current?.url || "",
        {
          ...optionsRef.current,
          onOpen: (...props) => {
            optionsRef.current?.onOpen?.(...props);
          },
          onClose: (...props) => {
            optionsRef.current?.onClose?.(...props);
          },
          onMessage: (...props) => {
            optionsRef.current?.onMessage?.(...props);
            setEventSourceError(null);
          },
          // 注入数据检测
          formatMessage: (data) => {
            const formatMessage = optionsRef.current?.formatMessage;
            const message = formatMessage ? formatMessage(data) : data;

            if (typeof message === "string" && message.length > 0)
              setHasData(true);

            return message;
          },
          // 增强错误处理
          onError: (err) => {
            setEventSourceError(err);
            optionsRef.current?.onError?.(err);
          },
        },
        terminal,
      );
    };

    // 保存重连函数
    reconnectFnRef.current = setupEventSource;

    optionsRef.current?.onSetupEventSource?.({
      setupFn: setupEventSource,
    });

    // 初始连接
    setupEventSource();

    return () => {
      closeEventSource?.();
      if (reconnectFnRef.current === setupEventSource)
        reconnectFnRef.current = null;
    };
  }, [
    enabled,
    terminal,
    url,
    closeEventName,
    errorEventName,
    messageEventName,
    openEventName,
    reconnect,
    reconnectWait,
  ]);

  return {
    reconnectFnRef,
  };
};

export const LogView: React.FC<LogViewProps> = ({
  className,
  content = "",
  showSearch = true,
  eventSource = false,
  eventSourceOptions = {},
  rows = 23,
  scrollback = 9999999,
  searchHighlightLimit = 1_000,
  enableKeyboardShortcuts = true,
  emptyRenderer,
  errorRenderer,
  searchInputProps,
}) => {
  const { t } = useParrotTranslation();

  const terminalContainerRef = useRef<HTMLDivElement | null>(null);
  const terminalRef = useRef<{
    searchAddon?: SearchAddon;
    fitAddon?: FitAddon;
    previousContent?: string;
    enableKeyboardShortcuts?: boolean;
  }>({ enableKeyboardShortcuts });

  terminalRef.current.enableKeyboardShortcuts = enableKeyboardShortcuts;

  const [readyTerminal, setReadyTerminal] = useState<Terminal | null>(null);
  const [hasData, setHasData] = useState(!!content);
  const [searchCount, setSearchCount] = useState(0);
  const [current, setCurrent] = useState(1);
  const [eventSourceError, setEventSourceError] = useState<
    Error | Event | null
  >(null);

  // Initialize terminal
  useEffect(() => {
    if (!terminalContainerRef.current) return;

    let disposed = false;
    let terminal: Terminal | null = null;

    setReadyTerminal(null);

    const initializeTerminal = async () => {
      try {
        const { Terminal, SearchAddon, FitAddon } = await loadXtermModules();

        if (disposed || !terminalContainerRef.current) return;

        // Create terminal instance
        terminal = new Terminal({
          fontFamily: "Roboto Mono, monospace",
          fontSize: 12,
          scrollOnUserInput: false,
          lineHeight: 1.5,
          theme: {
            background: "#00122E",
            foreground: "#FFFFFF",
            cursor: "#FFFFFF",
          },
          rows,
          convertEol: true,
          cursorBlink: false,
          disableStdin: true,
          allowProposedApi: true,
          scrollback,
        });

        terminal.attachCustomKeyEventHandler((event) => {
          if (!terminalRef.current.enableKeyboardShortcuts) return true;

          const target = event.target;
          const isXtermEvent =
            target instanceof HTMLElement && target.closest(".xterm");

          if (!isXtermEvent) return true;

          const shortcuts = isMacOS()
            ? customShortcutsForMac
            : customShortcutsForWin;

          if (
            event.type === "keydown" &&
            isCustomKeyboardAction(event, shortcuts)
          ) {
            event.stopPropagation();
            event.preventDefault();

            const keyActions = {
              arrowup: () => scrollLines("up", terminal),
              arrowdown: () => scrollLines("down", terminal),
              pageup: () => scrollPages("up", terminal),
              pagedown: () => scrollPages("down", terminal),
              c: () => copySelectLines(terminal),
              a: () => selectAll(terminal),
            };

            const action =
              keyActions[event.key.toLowerCase() as keyof typeof keyActions];
            if (action) action();

            return false;
          }

          return true;
        });

        // Add search addon
        const search = new SearchAddon({
          highlightLimit: searchHighlightLimit,
        });
        terminal.loadAddon(search);

        // Add fit addon
        const fit = new FitAddon();
        terminal.loadAddon(fit);

        // Store references
        terminalRef.current = {
          searchAddon: search,
          fitAddon: fit,
          enableKeyboardShortcuts: terminalRef.current.enableKeyboardShortcuts,
        };

        // Open terminal in the container
        terminal.open(terminalContainerRef.current);

        // Fit terminal to container
        try {
          fit.fit();
        } catch (e) {
          console.error("Error fitting terminal:", e);
        }

        // Write initial content
        if (content) {
          terminal.write(content);
          terminalRef.current.previousContent = content;
          setHasData(true);
        } else {
          setHasData(false);
        }

        terminalRef.current.searchAddon?.onDidChangeResults(
          ({ resultCount, resultIndex }) => {
            setSearchCount(resultCount);
            setCurrent(resultIndex + 1);
          },
        );

        setReadyTerminal(terminal);
      } catch (e) {
        if (!disposed) console.error("Error initializing terminal:", e);
      }
    };

    initializeTerminal();

    return () => {
      disposed = true;
      terminal?.dispose();
    };
  }, [rows, scrollback, searchHighlightLimit]);

  useEffect(() => {
    if (!readyTerminal || !terminalContainerRef.current) return;

    const fitTerminal = () => {
      if (terminalRef.current?.fitAddon)
        try {
          terminalRef.current.fitAddon.fit();
        } catch (e) {
          console.error("Error resizing terminal:", e);
        }
    };

    if (typeof ResizeObserver !== "undefined") {
      const resizeObserver = new ResizeObserver(fitTerminal);

      resizeObserver.observe(terminalContainerRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }

    window.addEventListener("resize", fitTerminal);

    return () => {
      window.removeEventListener("resize", fitTerminal);
    };
  }, [readyTerminal]);

  // Update content when it changes
  useEffect(() => {
    if (!readyTerminal) return;

    if (content) {
      const previousContent = terminalRef.current?.previousContent;

      if (content !== previousContent) {
        // 日志持续增长时只追加增量，避免每次 clear + write 导致闪烁。
        if (previousContent && content.startsWith(previousContent)) {
          const appendedContent = content.slice(previousContent.length);

          if (appendedContent) readyTerminal.write(appendedContent);
        } else {
          readyTerminal.clear();
          readyTerminal.write(content);
        }
      }

      terminalRef.current = {
        ...terminalRef.current,
        previousContent: content,
      };
      setHasData(true);
    } else if (!eventSource) {
      readyTerminal.clear();
      terminalRef.current = { ...terminalRef.current, previousContent: "" };
      // 如果既没有内容又不使用事件源，则标记为无数据
      setHasData(false);
    }
  }, [readyTerminal, content, eventSource]);

  const { searchNext, searchPrevious } = useMemo(() => {
    const searchOptions: ISearchOptions = {
      caseSensitive: false,
      decorations: {
        activeMatchColorOverviewRuler: "#000000",
        matchOverviewRuler: "#000000",
        activeMatchBackground: Color.chart.yellow["yellow-5"],
        matchBackground: Color.chart.yellow["yellow-1"],
      },
    };

    return {
      searchNext: (search: string) => {
        terminalRef.current?.searchAddon?.findNext(search || "", searchOptions);
      },
      searchPrevious: (search: string) => {
        terminalRef.current?.searchAddon?.findPrevious(
          search || "",
          searchOptions,
        );
      },
    };
  }, []);

  const { reconnectFnRef: eventSourceReconnectFnRef } = useLogViewEventSource({
    enabled: eventSource,
    terminal: readyTerminal,
    options: eventSourceOptions,
    setHasData,
    setEventSourceError,
  });

  // 封装重连函数
  const reconnect = useCallback(() => {
    if (eventSourceReconnectFnRef.current) {
      setEventSourceError(null);
      eventSourceReconnectFnRef.current();
    }
  }, []);

  // 渲染自定义内容
  const renderCustomContent = () => {
    if (eventSourceError && errorRenderer && readyTerminal)
      return (
        <CustomContentOverlay>
          {errorRenderer(readyTerminal, eventSourceError, reconnect)}
        </CustomContentOverlay>
      );

    if (!hasData && emptyRenderer && readyTerminal)
      return (
        <CustomContentOverlay>
          {emptyRenderer(readyTerminal)}
        </CustomContentOverlay>
      );

    return null;
  };

  return (
    <LogViewContainer className={cx("log-view-container", className)}>
      <LogViewInnerContaier className="log-view-inner-container">
        <Show condition={showSearch}>
          <SearchInput
            type="text"
            className={SearchInputStyle}
            width="100%"
            debounceWait={100}
            placeholder={t("common.search_log")}
            searchIcon={Search16OntintIcon}
            prefixIcon={ArrowChevronUp16OntintIcon}
            prefixHoverIcon={ArrowChevronUp16BlueIcon}
            nextIcon={ArrowChevronDown16OntintIcon}
            nextHoverIcon={ArrowChevronDown16BlueIcon}
            clearIcon={XmarkCloseCircleFill16OntintIcon}
            clearHoverIcon={XmarkCloseCircleFill16OntintLightIcon}
            total={searchCount}
            current={current}
            onChange={searchNext}
            onSearchNext={searchNext}
            onSearchPrev={searchPrevious}
            {...searchInputProps}
          />
        </Show>

        <LogTerminal className="log-terminal" ref={terminalContainerRef}>
          {renderCustomContent()}
        </LogTerminal>
      </LogViewInnerContaier>
    </LogViewContainer>
  );
};
