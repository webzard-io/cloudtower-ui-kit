import "antd/dist/antd.css";
import "@cloudtower/eagle/dist/style.css";

import { antdKit, Icon } from "@cloudtower/eagle";
import { kitContext } from "@cloudtower/eagle";
import { initParrotI18n } from "@cloudtower/eagle";
import { Button } from "antd";
import React from "react";

initParrotI18n();

function App() {
  return (
    <kitContext.Provider value={antdKit}>
      <div className="App">
        <Icon type={"1-active-connection-16-gradiendt-blue"} />
        <antdKit.button loading={true} />
        <antdKit.button loading={true}>button</antdKit.button>
        <Button loading={true}>button</Button>
      </div>
    </kitContext.Provider>
  );
}

export default App;
