import "antd/dist/antd.less";
import "./overrideRoot.css";
import "../src/styles/components.scss";

import { initParrotI18n } from "@cloudtower/parrot";

initParrotI18n();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
