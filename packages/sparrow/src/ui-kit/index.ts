import React from "react";

import { Kit } from "./base";
import emptyImpl from "./emptyImpl";

export const kitContext = React.createContext<Kit>(emptyImpl);

export * from "./base";
