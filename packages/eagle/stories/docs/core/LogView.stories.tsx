import { LogView } from "@src/core";
import type { LogViewProps } from "@src/core/LogView";
import Button from "@src/core/Button";
import { CoreMeta } from "@stories/types";
import { StoryObj } from "@storybook/react";
import React from "react";

type LogViewStoryArgs = LogViewProps;

const LogViewStoryComponent = LogView as React.ComponentType<LogViewStoryArgs>;

const meta = {
  component: LogViewStoryComponent,
  title: "Core/LogView | 日志查看器",
  parameters: {
    docs: {
      description: {
        component:
          "日志查看器组件，基于 xterm 封装，支持静态日志展示、关键字搜索、滚动缓冲控制，以及通过 EventSource 追加流式日志。",
      },
    },
    controls: {
      sort: "requiredFirst",
    },
  },
  args: {
    showSearch: true,
    rows: 16,
    enableKeyboardShortcuts: true,
  },
  argTypes: {
    content: {
      control: false,
      description: "静态日志内容，换行后会按终端逐行渲染。",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '""' },
      },
    },
    showSearch: {
      control: "boolean",
      description: "是否显示顶部搜索栏。",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    rows: {
      control: "number",
      description: "终端可视区域的行数。",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "23" },
      },
    },
    scrollback: {
      control: "number",
      description: "终端滚动缓冲区大小，用于限制保留的历史日志行数。",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "9999999" },
      },
    },
    enableKeyboardShortcuts: {
      control: "boolean",
      description: "是否启用终端内置的翻页、全选、复制等快捷键增强。",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    searchHighlightLimit: {
      control: "number",
      description:
        "搜索高亮结果的最大数量。日志数据量较大时建议设置较小值以避免性能问题。",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "999999" },
      },
    },
    emptyRenderer: {
      control: false,
      description: "无日志数据时的自定义空态渲染函数。",
      table: {
        type: { summary: "(terminal: Terminal) => ReactNode" },
      },
    },
    errorRenderer: {
      control: false,
      description: "日志流连接报错时的自定义错误态渲染函数。",
      table: {
        type: {
          summary:
            "(terminal: Terminal, error: Error | Event, reconnect: () => void) => ReactNode",
        },
      },
    },
    eventSource: {
      control: false,
      description:
        "是否通过 EventSource 实时接收日志。本文件未单独补充流式日志示例。",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    eventSourceOptions: {
      control: false,
      description: "EventSource 连接、重连和消息格式化等配置。",
      table: {
        type: { summary: "EventSourceOptions" },
      },
    },
    searchInputProps: {
      control: false,
      description: "顶部搜索框的配置项，例如防抖时间、占位文案等。",
      table: {
        type: { summary: "Partial<SearchInputProps>" },
      },
    },
  },
} satisfies CoreMeta<LogViewStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

const previewStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 1080,
};

const overlayTitleStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 600,
  marginBottom: 8,
};

const overlayTextStyle: React.CSSProperties = {
  fontSize: 12,
  lineHeight: "20px",
  color: "rgba(255, 255, 255, 0.85)",
  textAlign: "center",
};

const renderPreview = (args: LogViewStoryArgs) => {
  return (
    <div style={previewStyle}>
      <LogView {...args} />
    </div>
  );
};

const createLogContent = (count: number) => {
  const lines = new Array(count);

  for (let index = 1; index <= count; index += 1) {
    const second = String(index % 60).padStart(2, "0");
    const millisecond = String(index % 1000).padStart(3, "0");
    const host = `node-${String((index % 12) + 1).padStart(2, "0")}`;
    const requestId = `req-${String(index).padStart(6, "0")}`;
    const level =
      index % 200 === 0 ? "ERROR" : index % 25 === 0 ? "WARN" : "INFO";
    const action =
      index % 200 === 0
        ? "log stream interrupted while waiting for storage replica"
        : index % 25 === 0
          ? "checkpoint latency increased, fallback to secondary path"
          : "replica sync completed successfully";

    lines[index - 1] =
      `[2026-04-24 14:30:${second}.${millisecond}] ${level} ${host} ` +
      `component=cloudtower-agent requestId=${requestId} ${action}`;
  }

  return lines.join("\n");
};

const basicLogContent = [
  "[2026-04-24 14:30:00.101] INFO node-01 component=cloudtower-agent requestId=req-000001 bootstrap started",
  "[2026-04-24 14:30:01.233] INFO node-01 component=cloudtower-agent requestId=req-000002 loading cluster metadata",
  "[2026-04-24 14:30:02.418] INFO node-02 component=cloudtower-agent requestId=req-000003 storage pool health check passed",
  "[2026-04-24 14:30:03.557] WARN node-03 component=cloudtower-agent requestId=req-000004 replica lag detected on observer node",
  "[2026-04-24 14:30:04.889] ERROR node-03 component=cloudtower-agent requestId=req-000005 failed to fetch event payload, retry in 3s",
  "[2026-04-24 14:30:06.120] INFO node-03 component=cloudtower-agent requestId=req-000006 retry succeeded and stream resumed",
  "[2026-04-24 14:30:06.120] INFO node-03 component=cloudtower-agent requestId=req-000007 retry succeeded and stream resumed",
  "[2026-04-24 14:30:06.120] INFO node-03 component=cloudtower-agent requestId=req-000008 retry succeeded and stream resumed",
  "[2026-04-24 14:30:06.120] INFO node-03 component=cloudtower-agent requestId=req-000009 retry succeeded and stream resumed",
  "[2026-04-24 14:30:06.120] INFO node-03 component=cloudtower-agent requestId=req-000010 retry succeeded and stream resumed",
  "[2026-04-24 14:30:06.120] INFO node-03 component=cloudtower-agent requestId=req-000011 retry succeeded and stream resumed",
  "[2026-04-24 14:30:06.120] INFO node-03 component=cloudtower-agent requestId=req-000012 retry succeeded and stream resumed",
  "[2026-04-24 14:30:06.120] INFO node-03 component=cloudtower-agent requestId=req-000013 retry succeeded and stream resumed",
  "[2026-04-24 14:30:06.120] INFO node-03 component=cloudtower-agent requestId=req-000014 retry succeeded and stream resumed",
  "[2026-04-24 14:30:06.120] INFO node-03 component=cloudtower-agent requestId=req-000015 retry succeeded and stream resumed",
  "[2026-04-24 14:30:06.120] INFO node-03 component=cloudtower-agent requestId=req-000016 retry succeeded and stream resumed",
  "[2026-04-24 14:30:07.541] INFO node-01 component=cloudtower-agent requestId=req-000017 log view ready",
  "[2026-04-24 14:30:07.541] INFO node-02 component=cloudtower-agent requestId=req-000018 log view ready",
  "[2026-04-24 14:30:07.541] INFO node-03 component=cloudtower-agent requestId=req-000019 log view ready",
  "[2026-04-24 14:30:07.541] INFO node-04 component=cloudtower-agent requestId=req-000020 log view ready",
  "[2026-04-24 14:30:07.541] INFO node-05 component=cloudtower-agent requestId=req-000021 log view ready",
  "[2026-04-24 14:30:07.541] INFO node-06 component=cloudtower-agent requestId=req-000022 log view ready",
  "[2026-04-24 14:30:07.541] INFO node-07 component=cloudtower-agent requestId=req-000023 log view ready",
].join("\n");

const mediumLogContent = createLogContent(120);
const limitedScrollbackLogContent = createLogContent(80);
const realtimeLogTotal = 20;
const largeLogBaseTotal = 100000;
const largeRealtimeAppendLogTotal = 20;
const largeRealtimeIntervalMs = 1000;

const createRealtimeLogLine = (index: number) => {
  const second = String(index).padStart(2, "0");
  const millisecond = String((index * 97) % 1000).padStart(3, "0");
  const requestId = `stream-${String(index).padStart(4, "0")}`;
  const host = `node-${String(((index - 1) % 3) + 1).padStart(2, "0")}`;

  const action =
    index === realtimeLogTotal
      ? "log persistence successful"
      : index % 6 === 0
        ? "sync latency increased, continue retrying"
        : "receiving incremental log chunk";

  const level =
    index === realtimeLogTotal ? "INFO" : index % 6 === 0 ? "WARN" : "INFO";

  return (
    `[2026-04-27 10:00:${second}.${millisecond}] ${level} ${host} ` +
    `component=cloudtower-agent requestId=${requestId} ${action}`
  );
};

const createLargeRealtimeLogLine = (index: number) => {
  const second = String(index).padStart(2, "0");
  const millisecond = String((index * 17) % 1000).padStart(3, "0");
  const requestId = `stream-${String(largeLogBaseTotal + index).padStart(6, "0")}`;
  const host = `node-${String(((index - 1) % 12) + 1).padStart(2, "0")}`;
  const action =
    index === largeRealtimeAppendLogTotal
      ? "log persistence successful"
      : index % 6 === 0
        ? "checkpoint latency increased, fallback engaged"
        : "receiving incremental log chunk";
  const level =
    index === largeRealtimeAppendLogTotal
      ? "INFO"
      : index % 6 === 0
        ? "WARN"
        : "INFO";

  return (
    `[2026-04-27 11:30:${second}.${millisecond}] ${level} ${host} ` +
    `component=cloudtower-agent requestId=${requestId} ${action}`
  );
};

let largeLogContentCache: string | null = null;

const getLargeLogContent = () => {
  if (!largeLogContentCache) {
    largeLogContentCache = createLogContent(largeLogBaseTotal);
  }

  return largeLogContentCache;
};

const LargeVolumePreview = () => {
  const largeLogContent = React.useMemo(() => getLargeLogContent(), []);

  const searchInputProps = React.useMemo(
    () => ({
      debounceWait: 400,
    }),
    [],
  );

  return (
    <div style={previewStyle}>
      <div
        style={{
          marginBottom: 12,
          color: "#4D5969",
          fontSize: 12,
          lineHeight: "20px",
        }}
      >
        当前示例会一次性加载 100,000 行日志，可直接搜索
        <code style={{ margin: "0 4px" }}>ERROR</code>
        <code style={{ margin: "0 4px" }}>WARN</code>或
        <code style={{ margin: "0 4px" }}>req-100000</code>
        观察搜索与滚动体验。
      </div>
      <LogView
        searchHighlightLimit={1000}
        searchInputProps={searchInputProps}
        content={largeLogContent}
        rows={18}
        scrollback={largeLogBaseTotal}
        showSearch
      />
    </div>
  );
};

const RealtimeLogPreview = () => {
  const [logs, setLogs] = React.useState<string[]>([]);
  const [sessionId, setSessionId] = React.useState(0);
  const terminalContent = logs.length === 0 ? "" : `${logs.join("\n")}\n`;

  React.useEffect(() => {
    let current = 0;

    setLogs([]);

    const timer = window.setInterval(() => {
      current += 1;

      setLogs((prevLogs) =>
        [...prevLogs, createRealtimeLogLine(current)].slice(-realtimeLogTotal),
      );

      if (current >= realtimeLogTotal) {
        window.clearInterval(timer);
      }
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [sessionId]);

  return (
    <div style={previewStyle}>
      <div
        style={{
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
          color: "#4D5969",
          fontSize: 12,
          lineHeight: "20px",
        }}
      >
        <div>
          模拟实时日志流：每 1 秒新增 1 条，最多 20 条，最后一条包含
          <code style={{ margin: "0 4px" }}>successful</code>
          关键字。
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span>
            当前进度: {logs.length}/{realtimeLogTotal}
          </span>
          <Button size="small" onClick={() => setSessionId((id) => id + 1)}>
            重新播放
          </Button>
        </div>
      </div>
      <LogView
        content={terminalContent}
        rows={14}
        scrollback={realtimeLogTotal}
        showSearch
        emptyRenderer={() => {
          return (
            <div style={{ textAlign: "center" }}>
              <div style={overlayTitleStyle}>等待实时日志接入</div>
              <div style={overlayTextStyle}>
                日志会在 1 秒后开始逐条追加，最终输出 20 条。
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

const LargeRealtimeLogPreview = () => {
  const baseLogContent = React.useMemo(() => getLargeLogContent(), []);
  const [appendLogs, setAppendLogs] = React.useState<string[]>([]);
  const [sessionId, setSessionId] = React.useState(0);
  const terminalContent =
    appendLogs.length === 0
      ? baseLogContent
      : `${baseLogContent}\n${appendLogs.join("\n")}\n`;

  React.useEffect(() => {
    let current = 0;

    setAppendLogs([]);

    const timer = window.setInterval(() => {
      current += 1;

      setAppendLogs((prevLogs) =>
        [...prevLogs, createLargeRealtimeLogLine(current)].slice(
          -largeRealtimeAppendLogTotal,
        ),
      );

      if (current >= largeRealtimeAppendLogTotal) {
        window.clearInterval(timer);
      }
    }, largeRealtimeIntervalMs);

    return () => {
      window.clearInterval(timer);
    };
  }, [sessionId]);

  const searchInputProps = React.useMemo(
    () => ({
      debounceWait: 400,
    }),
    [],
  );

  return (
    <div style={previewStyle}>
      <div
        style={{
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
          color: "#4D5969",
          fontSize: 12,
          lineHeight: "20px",
        }}
      >
        <div>
          初始即加载
          <code style={{ margin: "0 4px" }}>
            {largeLogBaseTotal.toLocaleString()}
          </code>
          行日志，随后每
          <code style={{ margin: "0 4px" }}>{largeRealtimeIntervalMs}ms</code>
          新增 1 条，最多新增
          <code style={{ margin: "0 4px" }}>{largeRealtimeAppendLogTotal}</code>
          条，最后一条包含
          <code style={{ margin: "0 4px" }}>successful</code>
          关键字。
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span>
            新增进度: {appendLogs.length}/{largeRealtimeAppendLogTotal}
          </span>
          <Button size="small" onClick={() => setSessionId((id) => id + 1)}>
            重新播放
          </Button>
        </div>
      </div>
      <LogView
        searchHighlightLimit={1000}
        searchInputProps={searchInputProps}
        content={terminalContent}
        rows={18}
        scrollback={largeLogBaseTotal + largeRealtimeAppendLogTotal}
        showSearch
      />
    </div>
  );
};

export const Basic: Story = {
  name: "基础用法",
  parameters: {
    docs: {
      description: {
        story:
          "通过 `content` 直接展示静态日志内容，适合查看一次性加载完成的日志文本。",
      },
    },
  },
  args: {
    content: basicLogContent,
  },
  render: renderPreview,
};

export const HideSearch: Story = {
  name: "关闭顶部搜索栏",
  parameters: {
    docs: {
      description: {
        story: "关闭顶部搜索栏，仅保留纯日志终端视图。",
      },
    },
  },
  args: {
    content: basicLogContent,
    showSearch: false,
  },
  render: renderPreview,
};

export const CustomRows: Story = {
  name: "自定义可视区域日志行数",
  parameters: {
    docs: {
      description: {
        story:
          "通过 `rows` 控制终端可视区域高度，适合嵌入卡片或抽屉等紧凑布局。",
      },
    },
  },
  args: {
    content: mediumLogContent,
    rows: 10,
  },
  render: renderPreview,
};

export const LimitedScrollback: Story = {
  name: "自定义滚动缓冲区大小",
  parameters: {
    docs: {
      description: {
        story:
          "限制滚动缓冲为 20 行，只保留最近日志，适合超长时间运行的实时日志场景控制内存占用。",
      },
    },
  },
  args: {
    content: limitedScrollbackLogContent,
    rows: 12,
    scrollback: 20,
  },
  render: renderPreview,
};

export const DisableKeyboardShortcuts: Story = {
  name: "禁用键盘快捷键",
  parameters: {
    docs: {
      description: {
        story:
          "关闭组件内部对复制、全选、翻页等快捷键的接管，便于交给外层页面统一处理键盘行为。",
      },
    },
  },
  args: {
    content: mediumLogContent,
    enableKeyboardShortcuts: false,
  },
  render: renderPreview,
};

export const CustomEmptyRenderer: Story = {
  name: "自定义空状态",
  parameters: {
    docs: {
      description: {
        story:
          "当没有日志内容时，通过 `emptyRenderer` 渲染引导信息或操作入口。",
      },
    },
  },
  args: {
    content: "",
    rows: 12,
    emptyRenderer: () => {
      return (
        <div style={{ textAlign: "center" }}>
          <div style={overlayTitleStyle}>暂无日志输出</div>
          <div style={overlayTextStyle}>
            任务刚启动或尚未产生日志时，可以在这里给出状态说明、排查建议或刷新提示。
          </div>
        </div>
      );
    },
  },
  render: renderPreview,
};

export const CustomErrorRenderer: Story = {
  name: "自定义错误展示",
  parameters: {
    docs: {
      description: {
        story:
          "通过一个不可达的本地事件流地址触发错误态，用于展示 `errorRenderer` 的自定义兜底内容。",
      },
    },
  },
  args: {
    rows: 12,
    eventSource: true,
    eventSourceOptions: {
      url: "http://127.0.0.1:65535/mock-log-stream",
      reconnect: false,
    },
    errorRenderer: (_terminal, error, reconnect) => {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            textAlign: "center",
          }}
        >
          <div>
            <div style={overlayTitleStyle}>日志流连接失败</div>
            <div style={overlayTextStyle}>
              当前示例使用不可达地址来模拟错误场景，可用来验证自定义错误提示和重连入口。
            </div>
          </div>
          <Button type="primary" onClick={reconnect}>
            重新连接
          </Button>
          <div style={overlayTextStyle}>
            错误类型：{"type" in error ? error.type : "unknown"}
          </div>
        </div>
      );
    },
  },
  render: renderPreview,
};

export const LargeVolume100K: Story = {
  name: "10w 行日志",
  parameters: {
    docs: {
      description: {
        story:
          "大数据量示例，使用 100,000 行日志验证初始渲染、搜索命中和滚动浏览体验。由于日志量大，全日志搜索高亮会导致页面卡顿，因此这里设置了搜索高亮结果的最大数量为 1000。",
      },
    },
  },
  render: () => <LargeVolumePreview />,
};

export const RealtimeLogs: Story = {
  name: "模拟实时日志",
  parameters: {
    docs: {
      description: {
        story:
          "通过定时更新 `content` 模拟实时获取日志的场景，每秒新增 1 条，共 20 条，最后一条包含 `successful`。",
      },
    },
  },
  render: () => <RealtimeLogPreview />,
};

export const RealtimeLargeVolume100K: Story = {
  name: "10w 行实时日志",
  parameters: {
    docs: {
      description: {
        story:
          "大数据量实时日志示例，初始即加载 100,000 行日志，随后每秒追加 1 条新日志，共追加 20 条，适合验证大基数日志上的增量渲染体验。",
      },
    },
  },
  render: () => <LargeRealtimeLogPreview />,
};
