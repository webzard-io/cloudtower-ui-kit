import { message } from "antd";
import { ArgsProps, MessageType } from "antd/lib/message";
import { ReactNode } from "react";

export function makeUUID(length = 25) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

type MessageKey = string;
type MessageStore = {
  pendingFrom?: number;
  pendingMessages: Record<string, ArgsProps>;
  firedHandlers: Record<string, MessageType>;
  groupedCtx?: { key: string; count: number };
};

type KeyedArgsProps = ArgsProps & { key: string };

export class Batcher {
  private batchSize = 2;
  private batchTime = 200;
  private scheduler: Partial<Record<MessageKey, MessageStore>> = {};

  private originalMethod: typeof message["success"];
  private batchHelper: {
    getBatchKey: (content: ReactNode) => string | undefined;
    getBatchContent: (batchKey: string, count: number) => ReactNode;
  };

  constructor(
    originalMethod: typeof message["success"],
    batchHelper: {
      getBatchKey: (content: ReactNode) => string | undefined;
      getBatchContent: (batchKey: string, count: number) => ReactNode;
    }
  ) {
    this.originalMethod = originalMethod;
    this.batchHelper = batchHelper;
  }

  public addMessage(originContent: KeyedArgsProps) {
    const batchKey = this.batchHelper.getBatchKey(originContent.content);
    if (batchKey == null) {
      // can not be batched when i18n not ready
      this.originalMethod(originContent);
      return;
    }

    if (!this.scheduler[batchKey]) {
      this.scheduler[batchKey] = {
        firedHandlers: {},
        pendingMessages: {},
      };
    }

    const messageStore = this.scheduler[batchKey]!;

    const { firedHandlers, pendingMessages, groupedCtx } = messageStore;

    // if there are grouped messages, update the group context and re-render
    if (groupedCtx) {
      groupedCtx.count++;
      this.applyContent(batchKey, originContent, messageStore);
      return;
    }

    const messageCount =
      Object.keys(firedHandlers).length + Object.keys(pendingMessages).length;

    // if batched enough messages
    if (messageCount + 1 > this.batchSize) {
      // clear fired messages
      for (const k in firedHandlers) {
        try {
          firedHandlers[k]();
        } catch {
          // ignore
        }
        delete firedHandlers[k];
      }

      // clear pending messages
      for (const k in pendingMessages) {
        delete pendingMessages[k];
      }

      // render batched message
      messageStore.groupedCtx = {
        key: originContent.key,
        count: messageCount + 1,
      };
      this.applyContent(batchKey, originContent, messageStore);
      return;
    }

    // wait a moment to batch future messages
    pendingMessages[originContent.key] = originContent;
    setTimeout(() => {
      // if do not collect enough messages in the batchTime
      // fire the pending messages as usual
      if (originContent.key in pendingMessages) {
        delete pendingMessages[originContent.key];

        originContent.onClose = () => {
          delete firedHandlers[originContent.key];
          delete messageStore.groupedCtx;
        };
        const handler = this.originalMethod(originContent);
        firedHandlers[originContent.key] = handler;
      }
    }, this.batchTime);
  }

  private applyContent(
    batchKey: string,
    content: KeyedArgsProps,
    store: MessageStore
  ) {
    content.content = this.batchHelper.getBatchContent(
      batchKey,
      store.groupedCtx!.count
    );

    content.key = store.groupedCtx!.key;

    content.onClose = () => {
      delete store.groupedCtx;
    };

    this.originalMethod(content);
  }
}

export function createBatchMessageMethods(batchHelper?: {
  getBatchKey: (content: ReactNode) => string | undefined;
  getBatchContent: (batchKey: string, count: number) => ReactNode;
}): typeof message {
  if (batchHelper == null) {
    return message;
  }

  let _message = message;

  const methods = [
    "success",
    "error",
    "info",
    "warning",
    "warn",
    "loading",
  ] as const;

  for (const method of methods) {
    const originalMethod = _message[method];
    const batcher = new Batcher(originalMethod, batchHelper);
    _message[method] = function (
      ...args: Parameters<typeof _message["success"]>
    ) {
      const key = makeUUID();
      const content = normalizeContent(args, method);

      batcher.addMessage({ ...content, key });
      return (() => {}) as MessageType;
    };
  }

  return _message;
}

function normalizeContent(
  args: Parameters<typeof message["success"]>,
  type: ArgsProps["type"] | "warn"
): ArgsProps {
  const c = args[0];
  if (c && typeof c === "object" && "content" in c) {
    return c;
  }
  return {
    content: c,
    duration: typeof args[1] === "number" ? args[1] : undefined || 6,
    type: type === "warn" ? "warning" : type,
  };
}
