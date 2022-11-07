import React from "react";

import { Kit } from "./base";
import mockImpl from "./mockImpl";

export const kitContext = React.createContext<Kit>(mockImpl);

export * from "./base";
