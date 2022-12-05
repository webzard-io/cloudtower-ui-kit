import "antd/dist/antd.css";
import "@cloudtower/eagle/kit/smartx/style.css";
import "@cloudtower/eagle/styles/reset.css";
import "@cloudtower/eagle/styles/fonts/font.css";

import { antdKit, Icon } from "@cloudtower/eagle/kit/smartx";
import { Button } from "antd";

function App() {
  return (
    <div className="App">
      <Icon type={"1-active-connection-16-gradiendt-blue"} />
      <antdKit.button loading={true} />
      <antdKit.button loading={true}>button</antdKit.button>
      <Button loading={true}>button</Button>
    </div>
  );
}

export default App;
