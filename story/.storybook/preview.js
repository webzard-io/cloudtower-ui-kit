import "antd/dist/antd.css";

import "@cloudtower/eagle/dist/style.css";

import "./overrideRoot.css";

import { initParrotI18n } from "@cloudtower/eagle";

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
