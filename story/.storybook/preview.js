import "antd/dist/antd.css";

import '@cloudtower/eagle/kit/smartx/style.css';
import '@cloudtower/eagle/styles/reset.css';
import '@cloudtower/eagle/styles/fonts/font.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}