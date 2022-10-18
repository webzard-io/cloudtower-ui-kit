import React from "react";

import { getAntdKit } from "./antd";
import { Kit } from "./base";

export const antdKit = getAntdKit();
export const kitContext = React.createContext<Kit>(antdKit);
