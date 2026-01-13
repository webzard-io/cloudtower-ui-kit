import { css } from "@linaria/core";
import CopyButton, { CopyButtonProps } from "@src/coreX/Copy/CopyButton";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

/**
 *
 * CopyButton 组件是一个带有复制功能的按钮，点击后会将指定文本复制到剪贴板，并通过 tooltip 提供复制成功的反馈。
 *
 * ### 主要特性
 * - 点击按钮复制指定文本到剪贴板
 * - 复制成功后显示 tooltip 提示（默认显示 1 秒）
 * - 支持自定义按钮文本和 tooltip 提示文本
 * - 使用现代的 `navigator.clipboard` API
 *
 */
const meta: Meta<React.FC<CopyButtonProps>> = {
  title: "CoreX/Copy/CopyButton | 复制按钮",
  component: CopyButton,
};
export default meta;

/**
 *
 * 最基本的用法，使用默认的按钮文本和提示文本。
 *
 * 点击按钮后会显示"已复制到剪贴板"的提示。
 *
 */
export const Default: StoryObj<CopyButtonProps> = {
  name: "基本用例",
  render: (props) => {
    return (
      <div>
        <p>点击按钮复制文本: vm-12345678</p>
        <CopyButton {...props} />
      </div>
    );
  },
  args: {
    text: "vm-12345678",
  },
};

/**
 *
 * 自定义按钮的显示文本，可以根据业务场景提供更明确的按钮文案。
 *
 */
export const CustomButtonText: StoryObj<CopyButtonProps> = {
  name: "自定义按钮文本",
  render: (props) => {
    return (
      <div
        className={css`
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        `}
      >
        <CopyButton text="192.168.1.100" buttonText="复制 IP 地址" />
        <CopyButton text="kubectl get pods -n default" buttonText="复制命令" />
        <CopyButton
          text="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
          buttonText="复制 Token"
        />
        <CopyButton text="user@example.com" buttonText="复制邮箱" />
      </div>
    );
  },
  args: {},
};

/**
 *
 * 自定义复制成功后的 tooltip 提示文本。
 *
 */
export const CustomTooltipText: StoryObj<CopyButtonProps> = {
  name: "自定义提示文本",
  render: (props) => {
    return (
      <div
        className={css`
          display: flex;
          gap: 12px;
          flex-direction: column;
        `}
      >
        <div>
          <CopyButton
            text="配置内容"
            buttonText="复制配置"
            tooltipText="配置已复制成功！"
          />
        </div>
        <div>
          <CopyButton
            text="密钥内容"
            buttonText="复制密钥"
            tooltipText="密钥已复制，请妥善保管"
          />
        </div>
        <div>
          <CopyButton
            text="分享链接"
            buttonText="复制链接"
            tooltipText="链接已复制，快去分享吧"
          />
        </div>
      </div>
    );
  },
  args: {},
};

/**
 *
 * 在实际业务场景中使用，如复制配置文件、命令行、代码片段等。
 *
 */
export const RealWorldScenarios: StoryObj<CopyButtonProps> = {
  name: "实际业务场景",
  render: () => {
    const configText = `apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: MyApp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376`;

    const commandText =
      'curl -X POST https://api.example.com/v1/deploy -H \'Authorization: Bearer token\' -d \'{"app":"myapp","version":"1.0.0"}\'';

    const connectionString =
      "mongodb://username:password@cluster0.example.mongodb.net/myDatabase?retryWrites=true&w=majority";

    return (
      <div
        className={css`
          display: flex;
          flex-direction: column;
          gap: 24px;
        `}
      >
        <div>
          <h4>Kubernetes 配置文件</h4>
          <div
            className={css`
              background: #f5f5f5;
              padding: 12px;
              border-radius: 4px;
              font-family: monospace;
              font-size: 12px;
              margin-bottom: 8px;
            `}
          >
            <pre
              className={css`
                margin: 0;
                white-space: pre-wrap;
              `}
            >
              {configText}
            </pre>
          </div>
          <CopyButton text={configText} buttonText="复制配置" />
        </div>

        <div>
          <h4>API 请求命令</h4>
          <div
            className={css`
              background: #f5f5f5;
              padding: 12px;
              border-radius: 4px;
              font-family: monospace;
              font-size: 12px;
              margin-bottom: 8px;
              overflow-x: auto;
            `}
          >
            {commandText}
          </div>
          <CopyButton text={commandText} buttonText="复制命令" />
        </div>

        <div>
          <h4>数据库连接串</h4>
          <div
            className={css`
              background: #f5f5f5;
              padding: 12px;
              border-radius: 4px;
              font-family: monospace;
              font-size: 12px;
              margin-bottom: 8px;
              overflow-x: auto;
            `}
          >
            {connectionString}
          </div>
          <CopyButton text={connectionString} buttonText="复制连接串" />
        </div>
      </div>
    );
  },
  args: {},
};

/**
 *
 * 多个复制按钮组合使用，比如在表单或信息展示页面中。
 *
 */
export const MultipleButtons: StoryObj<CopyButtonProps> = {
  name: "多个按钮组合",
  render: () => {
    return (
      <div
        className={css`
          max-width: 600px;
        `}
      >
        <h4>集群信息</h4>
        <div
          className={css`
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            padding: 16px;
          `}
        >
          <div
            className={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 12px 0;
              border-bottom: 1px solid #f0f0f0;
              &:last-child {
                border-bottom: none;
              }
            `}
          >
            <div>
              <div
                className={css`
                  font-weight: 500;
                  margin-bottom: 4px;
                `}
              >
                集群 ID
              </div>
              <div
                className={css`
                  color: #666;
                  font-family: monospace;
                `}
              >
                cluster-abc123xyz
              </div>
            </div>
            <CopyButton text="cluster-abc123xyz" buttonText="复制" />
          </div>

          <div
            className={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 12px 0;
              border-bottom: 1px solid #f0f0f0;
            `}
          >
            <div>
              <div
                className={css`
                  font-weight: 500;
                  margin-bottom: 4px;
                `}
              >
                API 地址
              </div>
              <div
                className={css`
                  color: #666;
                  font-family: monospace;
                `}
              >
                https://api.cluster.example.com
              </div>
            </div>
            <CopyButton
              text="https://api.cluster.example.com"
              buttonText="复制"
            />
          </div>

          <div
            className={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 12px 0;
            `}
          >
            <div>
              <div
                className={css`
                  font-weight: 500;
                  margin-bottom: 4px;
                `}
              >
                访问密钥
              </div>
              <div
                className={css`
                  color: #666;
                  font-family: monospace;
                `}
              >
                ak_prod_xxxxxxxxxxxxxxxxxxx
              </div>
            </div>
            <CopyButton text="ak_prod_xxxxxxxxxxxxxxxxxxx" buttonText="复制" />
          </div>
        </div>
      </div>
    );
  },
  args: {},
};

/**
 *
 * 复制超长文本内容，如大型配置文件、日志等。
 *
 */
export const LongText: StoryObj<CopyButtonProps> = {
  name: "超长文本",
  render: (props) => {
    return (
      <div>
        <p>复制一个包含 1000+ 行的超长配置文件</p>
        <CopyButton {...props} />
      </div>
    );
  },
  args: {
    text: Array(1000)
      .fill(0)
      .map(
        (_, i) =>
          `line-${
            i + 1
          }: Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
      )
      .join("\n"),
    buttonText: "复制超长文本",
    tooltipText: "1000+ 行文本已复制",
  },
};

/**
 *
 * 边界场景测试，包括空文本、特殊字符等。
 *
 */
export const EdgeCases: StoryObj<CopyButtonProps> = {
  name: "边界场景",
  render: () => {
    return (
      <div
        className={css`
          display: flex;
          flex-direction: column;
          gap: 12px;
        `}
      >
        <div>
          <span>空文本: </span>
          <CopyButton text="" buttonText="复制空文本" />
        </div>
        <div>
          <span>单个字符: </span>
          <CopyButton text="A" buttonText="复制字符 A" />
        </div>
        <div>
          <span>只包含空格: </span>
          <CopyButton text="     " buttonText="复制空格" />
        </div>
        <div>
          <span>特殊字符: </span>
          <CopyButton
            text={"!@#$%^&*()_+-=[]{}|;':\",./<>?"}
            buttonText="复制特殊字符"
          />
        </div>
        <div>
          <span>换行符: </span>
          <CopyButton text="第一行\n第二行\n第三行" buttonText="复制多行文本" />
        </div>
        <div>
          <span>制表符: </span>
          <CopyButton text="列1\t列2\t列3" buttonText="复制制表符文本" />
        </div>
        <div>
          <span>Emoji: </span>
          <CopyButton text="🎉 🚀 ⭐ 💡 🔥" buttonText="复制 Emoji" />
        </div>
        <div>
          <span>中文字符: </span>
          <CopyButton
            text="这是一段中文文本，包含中文标点符号：，。！？「」『』"
            buttonText="复制中文"
          />
        </div>
        <div>
          <span>混合多语言: </span>
          <CopyButton
            text="Hello 你好 こんにちは 안녕하세요 مرحبا Привет"
            buttonText="复制多语言"
          />
        </div>
      </div>
    );
  },
  args: {},
};

/**
 *
 * 在卡片布局中使用复制按钮。
 *
 */
export const InCard: StoryObj<CopyButtonProps> = {
  name: "在卡片中使用",
  render: () => {
    const cards = [
      {
        title: "开发环境",
        env: "development",
        apiKey: "dev_key_abc123xyz789",
        endpoint: "https://dev-api.example.com",
      },
      {
        title: "测试环境",
        env: "staging",
        apiKey: "stg_key_def456uvw012",
        endpoint: "https://staging-api.example.com",
      },
      {
        title: "生产环境",
        env: "production",
        apiKey: "prod_key_ghi789rst345",
        endpoint: "https://api.example.com",
      },
    ];

    return (
      <div
        className={css`
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
        `}
      >
        {cards.map((card) => (
          <div
            key={card.env}
            className={css`
              border: 1px solid #d9d9d9;
              border-radius: 8px;
              padding: 16px;
              background: #fff;
            `}
          >
            <h4
              className={css`
                margin: 0 0 16px 0;
              `}
            >
              {card.title}
            </h4>
            <div
              className={css`
                margin-bottom: 12px;
              `}
            >
              <div
                className={css`
                  font-size: 12px;
                  color: #666;
                  margin-bottom: 4px;
                `}
              >
                API Key
              </div>
              <div
                className={css`
                  font-family: monospace;
                  font-size: 12px;
                  background: #f5f5f5;
                  padding: 8px;
                  border-radius: 4px;
                  margin-bottom: 8px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                `}
              >
                {card.apiKey}
              </div>
              <CopyButton text={card.apiKey} buttonText="复制 Key" />
            </div>
            <div>
              <div
                className={css`
                  font-size: 12px;
                  color: #666;
                  margin-bottom: 4px;
                `}
              >
                Endpoint
              </div>
              <div
                className={css`
                  font-family: monospace;
                  font-size: 12px;
                  background: #f5f5f5;
                  padding: 8px;
                  border-radius: 4px;
                  margin-bottom: 8px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                `}
              >
                {card.endpoint}
              </div>
              <CopyButton text={card.endpoint} buttonText="复制地址" />
            </div>
          </div>
        ))}
      </div>
    );
  },
  args: {},
};
