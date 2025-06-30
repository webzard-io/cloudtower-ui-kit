import React, { useEffect } from "react";
import { Preview } from "@storybook/react";
import "@src/styles/index.scss";
import { initParrotI18n, parrotI18n } from "@cloudtower/parrot";
import "./overrideRoot.css";

initParrotI18n({
  resources: {
    "en-US": {
      CTError: {
        AXIOS_NETWORK_ERROR: "Network error",
        INVALID_PARAMETER: "Invalid parameter",
        INVALID_PARAMETER_DETAIL: "Invalid field: {field}",
      },
      test: {
        error_message_batch: "Batch Error Message {count}",
      },
    },
    "zh-CN": {
      CTError: {
        AXIOS_NETWORK_ERROR: "网络错误",
        INVALID_PARAMETER: "参数无效，请检查输入",
        INVALID_PARAMETER_DETAIL: "无效字段: {field}",
      },
      test: {
        error_message_batch: "错误信息 {count}",
        highlight: "这是一条会高亮传入 <1>{name}</1> 的词条",
        longHighlightText: "高亮内容 <1>{name}</1> 过长时，会自动换行",
        line: "<0>line</0>",
      },
    },
  },
});

const withI18next = (Story, context) => {
  const { locale } = context.globals;
  useEffect(() => {
    parrotI18n.changeLanguage(locale);
  }, [locale]);

  return (
    <>
      <Story />
    </>
  );
};

const preview: Preview = {
  decorators: [withI18next],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    options: {
      storySort: {
        order: ["Core", "CoreX", "Tokens", "@cloudtower", "*"],
      },
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#1e1e1e",
        },
      ],
    },
    docs: {
      toc: {
        headingSelector: "h2, h3",
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export const globalTypes = {
  locale: {
    name: "Locale",
    description: "Internationalization locale",
    toolbar: {
      icon: "globe",
      items: [
        { value: "zh-CN", title: "简体中文" },
        { value: "en-US", title: "English" },
      ],
      showName: true,
    },
  },
};

export default preview;
