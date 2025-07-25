import { XmarkFailed16RedIcon } from "@cloudtower/icons-react";
import Button from "@src/core/Button";
import Link from "@src/core/Link";
import Tag from "@src/core/Tag";
import { Timeline } from "@src/core/Timeline";
import { TimelineItemData } from "@src/core/Timeline/Timeline.type";
import { Typo } from "@src/core/Typo";
import { Color } from "@src/styles/token/color";
import { Meta, StoryObj } from "@storybook/react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import React from "react";

dayjs.extend(duration);

/**
 * * Timeline 时间线组件
 * * 用于展示操作记录、系统事件的时间线
 * * 支持多种状态展示：成功、失败、进行中、通知、空闲
 * * 支持自定义标签和操作按钮
 * * 支持使用 Area 组件灵活自定义辅助信息展示
 */
const meta = {
  component: Timeline,
  title: "Core/Timeline | 时间线",
  parameters: {
    docs: {
      description: {
        component:
          "时间线组件，用于展示系统操作历史、版本升级历史等时间线记录。支持多种状态和自定义内容。",
      },
      source: {
        type: "code",
      },
    },
    controls: {
      sort: "requiredFirst",
    },
  },
} satisfies Meta<typeof Timeline>;

export default meta;

type Story = StoryObj<typeof Timeline>;

// 示例数据
const mockSuccessItems: TimelineItemData[] = [
  {
    status: "success",
    infos: [
      {
        items: [
          {
            category: "tag",
            color: "blue",
            children: "升级",
          },
          {
            category: "info",
            children: "v1.0.0",
          },
        ],
      },
    ],
    subInfo: {
      split: "dot",
      items: [
        { category: "subinfo_label", children: "2023-06-01 10:00:00 开始" },
        { category: "subinfo_label", children: "用时30分钟" },
      ],
    },
  },
  {
    status: "success",
    infos: [
      {
        items: [
          {
            category: "tag",
            color: "green",
            children: "更新",
          },
          {
            category: "info_bold",
            children: "v0.9.5",
          },
        ],
      },
    ],
    subInfo: {
      split: "dot",
      items: [
        { category: "subinfo_label", children: "2023-05-15 08:15:00 开始" },
        { category: "subinfo_label", children: "用时45分钟" },
        {
          category: "link",
          children: "查看详情",
          onClick: () => console.log("查看详情"),
        },
      ],
    },
  },
];

const mockErrorItems: TimelineItemData[] = [
  {
    status: "failed",
    detailMessage: {
      message: "升级过程中发生错误：无法连接到服务器",
    },
    infos: [
      {
        items: [
          {
            category: "tag",
            color: "red",
            children: "失败",
          },
          {
            category: "info",
            children: "v1.1.0",
          },
        ],
      },
    ],
    subInfo: {
      split: "dot",
      items: [
        { category: "subinfo_label", children: "2023-04-20 14:30:00 开始" },
        { category: "subinfo_label", children: "用时30分钟" },
      ],
    },
  },
  {
    status: "failed",
    infos: [{ items: [{ category: "info_bold", children: "v1.1.0" }] }],
  },
];
// 自定义详情按钮组件
const DetailButton = ({ onClick }: { onClick?: () => void }) => (
  <Link onClick={onClick}>查看详情</Link>
);

/*
 * 基础用法 - 成功状态
 */
export const SuccessTimeline: Story = {
  name: "基础用法 ",
  parameters: {
    docs: {
      description: {
        story: "展示成功操作的时间线。",
      },
    },
  },
  args: {
    items: mockSuccessItems.map((item) => ({
      ...item,
      infoAction: (
        <DetailButton
          onClick={() =>
            console.log(
              `查看详情: ${item.infos[0].items.find((i) => i.category.includes("label"))?.children}`,
            )
          }
        />
      ),
    })),
    emptyText: "暂无历史记录",
    emptyTextClassName: Typo.Label.l2_bold_title,
  },
};

export const FailedTimeline: Story = {
  name: "紧凑模式",
  args: {
    items: mockErrorItems,
    compact: true,
  },
};

/*
 * 空状态
 */
export const EmptyTimeline: Story = {
  name: "空状态",
  parameters: {
    docs: {
      description: {
        story: "无数据时的空状态展示。",
      },
    },
  },
  args: {
    items: [],
    emptyText: "暂无历史记录",
  },
};

/*
 * 自定义空状态
 */
export const CustomEmptyState: Story = {
  name: "自定义空状态",
  parameters: {
    docs: {
      description: {
        story: "使用自定义组件渲染空状态。",
      },
    },
  },
  args: {
    items: [],
    emptyText: "暂无历史记录",
    emptyRender: (emptyText) => (
      <div
        style={{
          height: "40px",
        }}
      >
        <div>{emptyText}</div>
        <Button type="primary">刷新数据</Button>
      </div>
    ),
  },
};

/*
 * 自定义次要文本样式
 */
export const CustomSecondaryTextStyle: Story = {
  name: "自定义次要文本样式",
  parameters: {
    docs: {
      description: {
        story: "使用不同类型和样式的次要文本。",
      },
    },
  },
  args: {
    items: [
      {
        status: "success",
        infos: [
          {
            items: [
              {
                category: "tag",
                color: "blue",
                children: "升级",
              },
              {
                category: "info_bold",
                children: "v1.0.0",
              },
            ],
          },
        ],
        subInfo: {
          split: "dot",
          items: [
            {
              category: "subinfo_label",
              children: "2023-06-01 开始",
              className: Typo.Label.l3_bold,
            },
            {
              category: "subinfo_label",
              children: "用时30分钟",
              className: Typo.Label.l4_regular,
            },
          ],
        },
      },
      {
        status: "success",
        infos: [
          {
            items: [
              {
                category: "tag",
                color: "green",
                children: "更新",
              },
              {
                category: "info_bold",
                children: "v0.9.5",
              },
            ],
          },
        ],
        subInfo: {
          split: "dot",
          items: [
            {
              category: "subinfo_label",
              children: "2023-05-15 开始",
              className: Typo.Label.l3_bold,
            },
            {
              category: "subinfo_label",
              children: "用时45分钟",
              className: Typo.Label.l4_regular,
            },
          ],
        },
      },
    ],
    emptyText: "暂无历史记录",
  },
};

/*
 * 自定义错误信息渲染
 */
export const CustomErrorMessage: Story = {
  name: "自定义错误信息渲染",
  parameters: {
    docs: {
      description: {
        story: "使用自定义函数渲染错误信息。",
      },
    },
  },
  args: {
    items: [
      {
        status: "failed",
        detailMessage: {
          message: "升级过程中发生错误：无法连接到服务器",
        },
        detailMessageRender: (message) => (
          <div
            style={{
              padding: "8px 12px",
              background: Color.fill.serious.light,
              borderRadius: "4px",
              marginTop: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <XmarkFailed16RedIcon style={{ marginRight: "8px" }} />
              <span className={Typo.Label.l3_bold}>错误详情</span>
            </div>
            <div>{message?.message}</div>
            <Button size="small" style={{ marginTop: "8px" }}>
              重试
            </Button>
          </div>
        ),
        infos: [
          {
            items: [
              {
                category: "tag",
                color: "red",
                children: "失败",
              },
              {
                category: "info",
                children: "v2.5.0",
              },
            ],
          },
        ],
        subInfo: {
          split: "dot",
          items: [
            { category: "subinfo_label", children: "2023-06-15 开始" },
            { category: "subinfo_label", children: "用时30分钟" },
          ],
        },
      },
      ...mockSuccessItems,
    ],
    emptyText: "暂无历史记录",
  },
};

/*
 * 自定义标签
 */
export const CustomTags: Story = {
  name: "自定义标签",
  parameters: {
    docs: {
      description: {
        story: "使用自定义组件作为前缀标签。",
      },
    },
  },
  args: {
    items: [
      {
        status: "success",
        infos: [
          {
            items: [
              {
                category: "tag",
                color: "blue",
                children: "自定义",
              },
              {
                category: "info",
                children: "v2.0.0",
              },
            ],
          },
        ],
        subInfo: {
          split: "dot",
          items: [
            { category: "subinfo_label", children: "2023-07-10 开始" },
            { category: "subinfo_label", children: "用时75分钟" },
          ],
        },
        infoAction: <DetailButton onClick={() => console.log("查看详情")} />,
      },
      {
        status: "success",
        infos: [
          {
            items: [
              {
                category: "tag",
                color: "purple",
                children: "高级标签",
              },
              {
                category: "info",
                children: "自定义标签组件",
              },
            ],
          },
        ],
        subInfo: {
          split: "dot",
          items: [
            { category: "subinfo_label", children: "2023-07-05 开始" },
            { category: "subinfo_label", children: "用时75分钟" },
          ],
        },
        infoAction: <DetailButton onClick={() => console.log("查看详情")} />,
      },
      {
        status: "failed",
        infos: [
          {
            items: [
              {
                category: "tag",
                color: "red",
                children: "自定义错误",
              },
              {
                category: "info",
                children: "错误示例",
              },
            ],
          },
        ],
        detailMessage: {
          message: "自定义错误信息示例",
        },
        subInfo: {
          split: "dot",
          items: [
            { category: "subinfo_label", children: "2023-07-01 开始" },
            { category: "subinfo_label", children: "用时75分钟" },
          ],
        },
        infoAction: <DetailButton onClick={() => console.log("查看详情")} />,
      },
    ],
    emptyText: "暂无历史记录",
  },
};

/*
 * 自定义信息渲染
 */
export const CustomInfoRender: Story = {
  name: "自定义信息渲染",
  parameters: {
    docs: {
      description: {
        story: "使用自定义函数渲染主要信息。",
      },
    },
  },
  args: {
    items: [
      {
        status: "success",
        infos: [
          {
            items: [
              {
                category: "tag",
                color: "blue",
                children: "升级",
              },
              {
                category: "info",
                children: "系统升级到v3.0.0",
              },
            ],
          },
        ],
        infosRender: (info) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontWeight: "bold", marginRight: "8px" }}>
              {
                info[0].items.find((i) => i.category.includes("label"))
                  ?.children
              }
            </span>
            <Tag color="green" style={{ fontSize: "12px" }}>
              稳定版
            </Tag>
          </div>
        ),
        subInfo: {
          split: "dot",
          items: [{ category: "subinfo_label", children: "2023-08-10 完成" }],
        },
      },
      {
        status: "success",
        infos: [
          {
            items: [
              {
                category: "tag",
                color: "green",
                children: "配置",
              },
              {
                category: "info",
                children: "更新系统配置",
              },
            ],
          },
        ],
        infosRender: (info) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontWeight: "bold", marginRight: "8px" }}>
              {
                info[0].items.find((i) => i.category.includes("label"))
                  ?.children
              }
            </span>
            <span
              style={{ color: Color.text.neutral.secondary, fontSize: "12px" }}
            >
              (配置文件: config.json)
            </span>
          </div>
        ),
        subInfo: {
          split: "dot",
          items: [{ category: "subinfo_label", children: "2023-08-09 完成" }],
        },
      },
    ],
    emptyText: "暂无历史记录",
  },
};

/*
 * 自定义辅助信息渲染
 */
export const CustomSubInfoRender: Story = {
  name: "自定义辅助信息渲染",
  parameters: {
    docs: {
      description: {
        story: "使用自定义函数渲染辅助信息。",
      },
    },
  },
  args: {
    items: [
      {
        status: "success",
        infos: [
          {
            items: [
              {
                category: "tag",
                color: "blue",
                children: "升级",
              },
              {
                category: "info",
                children: "系统升级到v3.0.0",
              },
            ],
          },
        ],
        subInfo: {
          split: "dot",
          items: [
            { category: "subinfo_label", children: "2023-08-10 08:30:00" },
            { category: "subinfo_label", children: "2023-08-10 10:45:30" },
          ],
        },
        subInfoRender: (subInfo) => {
          const startTime = String(subInfo?.items[0].children || "");
          const endTime = String(subInfo?.items[1].children || "");
          const diffMinutes =
            startTime && endTime
              ? dayjs(endTime).diff(dayjs(startTime), "minute")
              : 0;

          return (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span
                  style={{
                    fontWeight: "bold",
                    marginRight: "8px",
                    color: Color.text.neutral.primary,
                  }}
                >
                  开始时间:
                </span>
                <span>{startTime}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "4px",
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    marginRight: "8px",
                    color: Color.text.neutral.primary,
                  }}
                >
                  结束时间:
                </span>
                <span>{endTime}</span>
              </div>
              <div style={{ marginTop: "4px", color: Color.green["green-50"] }}>
                总用时: {diffMinutes} 分钟
              </div>
            </div>
          );
        },
      },
    ],
    emptyText: "暂无历史记录",
  },
};

/*
 * DetailMessages 多个详情信息
 */
export const DetailMessages: Story = {
  name: "多个详情信息",
  parameters: {
    docs: {
      description: {
        story:
          "使用 detailMessages 展示多个详情信息，优先级高于 detailMessage。",
      },
    },
  },
  args: {
    items: [
      {
        status: "failed",
        detailMessages: [
          {
            message: "升级过程中发生错误：无法连接到服务器",
            type: "error",
          },
          {
            message: "错误详情：网络超时，请检查网络连接",
            type: "warning",
          },
          {
            message: "建议：稍后重试或联系系统管理员",
            type: "info",
          },
        ],
        infos: [
          {
            items: [
              {
                category: "tag",
                color: "red",
                children: "失败",
              },
              {
                category: "info",
                children: "v2.1.0 升级失败",
              },
            ],
          },
        ],
        subInfo: {
          split: "dot",
          items: [
            { category: "subinfo_label", children: "2023-08-15 14:30:00 开始" },
            { category: "subinfo_label", children: "用时30分钟" },
          ],
        },
      },
      {
        status: "notice",
        detailMessages: [
          {
            message: "检测到配置文件变更",
            type: "warning",
          },
          {
            message: "部分配置可能需要重启服务生效",
            type: "info",
          },
        ],
        infos: [
          {
            items: [
              {
                category: "tag",
                color: "yellow",
                children: "配置",
              },
              {
                category: "info",
                children: "更新系统配置",
              },
            ],
          },
        ],
        subInfo: {
          split: "dot",
          items: [
            { category: "subinfo_label", children: "2023-08-14 09:15:00 完成" },
          ],
        },
      },
    ],
    emptyText: "暂无历史记录",
  },
};

/*
 * 自定义DetailMessages渲染
 */
export const CustomDetailMessages: Story = {
  name: "自定义多个详情信息渲染",
  parameters: {
    docs: {
      description: {
        story: "使用 detailMessageRender 函数自定义每个详情信息的展示。",
      },
    },
  },
  args: {
    items: [
      {
        status: "failed",
        detailMessages: [
          {
            message: "数据库连接失败",
            action: <Button size="small">重试连接</Button>,
          },
          {
            message: "缓存服务器不可用",
            action: <Button size="small">刷新缓存</Button>,
          },
          {
            message: "配置文件格式错误",
            action: <Button size="small">修复配置</Button>,
          },
        ],
        detailMessageRender: (message, index) => {
          const safeIndex = index ?? 0;
          return (
            <div
              key={`custom-detail-${safeIndex}`}
              style={{
                padding: "12px",
                background:
                  safeIndex === 0
                    ? Color.fill.serious.light
                    : Color.fill.neutral["opaque-1"],
                borderLeft: `4px solid ${
                  safeIndex === 0
                    ? Color.red["red-50"]
                    : safeIndex === 1
                      ? Color.yellow["yellow-50"]
                      : Color.blue["blue-50"]
                }`,
                marginBottom: "8px",
                borderRadius: "4px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div className={Typo.Label.l3_bold}>
                    错误 {safeIndex + 1}: {message?.message}
                  </div>
                  <div
                    style={{
                      color: Color.text.neutral.secondary,
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    优先级:{" "}
                    {safeIndex === 0 ? "高" : safeIndex === 1 ? "中" : "低"}
                  </div>
                </div>
                {message?.action}
              </div>
            </div>
          );
        },
        infos: [
          {
            items: [
              {
                category: "tag",
                color: "red",
                children: "多重错误",
              },
              {
                category: "info",
                children: "系统启动失败",
              },
            ],
          },
        ],
        subInfo: {
          split: "dot",
          items: [
            { category: "subinfo_label", children: "2023-08-20 16:45:00 开始" },
            { category: "subinfo_label", children: "用时15分钟" },
          ],
        },
      },
    ],
    emptyText: "暂无历史记录",
  },
};

/*
 * DetailMessages与DetailMessage兼容性
 */
export const CompatibilityTest: Story = {
  name: "兼容性测试 - detailMessages优先于detailMessage",
  parameters: {
    docs: {
      description: {
        story:
          "测试detailMessages和detailMessage的兼容性，detailMessages优先级更高。",
      },
    },
  },
  args: {
    items: [
      {
        status: "failed",
        // 只有 detailMessage
        detailMessage: {
          message: "这是一个旧的单个详情信息",
        },
        infos: [
          {
            items: [
              {
                category: "tag",
                color: "red",
                children: "兼容",
              },
              {
                category: "info",
                children: "只有detailMessage",
              },
            ],
          },
        ],
        subInfo: {
          items: [
            { category: "subinfo_label", children: "2023-08-18 10:00:00" },
          ],
        },
      },
      {
        status: "failed",
        // 同时有 detailMessages 和 detailMessage，detailMessages 优先
        detailMessages: [
          {
            message: "这是新的多个详情信息 - 第1条",
            type: "error",
          },
          {
            message: "这是新的多个详情信息 - 第2条",
            type: "warning",
          },
        ],
        detailMessage: {
          message: "这条信息不会显示，因为detailMessages优先",
        },
        infos: [
          {
            items: [
              {
                category: "tag",
                color: "red",
                children: "优先级",
              },
              {
                category: "info",
                children: "detailMessages优先于detailMessage",
              },
            ],
          },
        ],
        subInfo: {
          items: [
            { category: "subinfo_label", children: "2023-08-18 11:00:00" },
          ],
        },
      },
    ],
    emptyText: "暂无历史记录",
  },
};
