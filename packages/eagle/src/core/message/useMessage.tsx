import { createContext, useContext } from "react";

import api, { MessageApi } from "./message";

export const MessageContext = createContext<MessageApi>(api);

export const useMessage = () => {
  return useContext(MessageContext);
};
