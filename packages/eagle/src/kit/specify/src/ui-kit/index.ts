import React from "react";

import { Kit } from "./base";
<<<<<<< HEAD
import emptyImpl from "./emptyImpl";

export const kitContext = React.createContext<Kit>(emptyImpl);
=======
import mockImpl from "./mockImpl";

export const kitContext = React.createContext<Kit>(mockImpl);
>>>>>>> 9980c9d (chore: delete sparrow package)

export * from "./base";
