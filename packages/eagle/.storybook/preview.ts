import { Preview } from "@storybook/react";
import "../src/styles/components.scss";
import "./overrideRoot.css";

import { initParrotI18n } from "@cloudtower/parrot";

initParrotI18n({
  resources: {
    "en-US": {
      test: {
        error_message_batch: "Batch Error Message {count}",
      },
    },
    "zh-CN": {
      test: {
        error_message_batch: "错误信息 {count}",
      },
    },
  },
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    options: {
      storySort: {
        order: ["Core", "CoreX", "Tokens", "@cloudtower", "*"],
      },
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

export default preview;
