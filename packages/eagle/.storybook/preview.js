import "antd/dist/antd.css";

import "./overrideRoot.css";

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
