import "antd/dist/antd.less";
import "../src/styles/components.scss";
import "./overrideRoot.css";

import { initParrotI18n } from "@cloudtower/parrot";

initParrotI18n({
  resources: {
    "en-US": {
      translation: {
        test: {
          error_message_batch: "Batch Error Message {count}",
        },
      },
    },
    "zh-CN": {
      translation: {
        test: {
          error_message_batch: "错误信息 {count}",
        },
      },
    },
  },
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
