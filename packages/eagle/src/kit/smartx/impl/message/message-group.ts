import { parrotI18n } from "@cloudtower/parrot";
import { makeUUID } from "@tower/utils";
import { message as _message } from "antd";
import { ArgsProps, MessageType } from "antd/lib/message";

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
  private patterMap: Record<string, { patterns: RegExp[]; batchKey: string }> =
    {};

  private originalMethod: typeof _message["success"];

  constructor(
    originalMethod: typeof _message["success"],
    patternMap: Record<string, { patterns: RegExp[]; batchKey: string }>
  ) {
    this.originalMethod = originalMethod;
    this.patterMap = patternMap;
  }

  public addMessage(content: KeyedArgsProps) {
    const batchKey = this.getBatchKey(content);
    const action = this.getAction(batchKey);

    if (process.env.NODE_ENV !== "production") {
      if (window.__cloudtower_i18n__?.i18next == null) {
        throw new Error("i18n not exist on window");
      }
    }

    if (!(window.__cloudtower_i18n__?.i18next ?? parrotI18n).exists(action)) {
      // can not be batched when i18n not ready
      this.originalMethod(content);
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
      this.applyContent(batchKey, content, messageStore);
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
        key: content.key,
        count: messageCount + 1,
      };
      this.applyContent(batchKey, content, messageStore);
      return;
    }

    // wait a moment to batch future messages
    pendingMessages[content.key] = content;
    setTimeout(() => {
      // if do not collect enough messages in the batchTime
      // fire the pending messages as usual
      if (content.key in pendingMessages) {
        delete pendingMessages[content.key];

        content.onClose = () => {
          delete firedHandlers[content.key];
          delete messageStore.groupedCtx;
        };

        const handler = this.originalMethod(content);
        firedHandlers[content.key] = handler;
      }
    }, this.batchTime);
  }

  private applyContent(
    batchKey: string,
    content: KeyedArgsProps,
    store: MessageStore
  ) {
    content.content = this.getBatchContent(batchKey, store.groupedCtx!.count);

    content.key = store.groupedCtx!.key;

    content.onClose = () => {
      delete store.groupedCtx;
    };

    this.originalMethod(content);
  }

  private getBatchKey(content: ArgsProps): string {
    // TODO: better performance?
    let action = "";
    for (const key of Object.keys(this.patterMap)) {
      const { patterns, batchKey } = this.patterMap[key];
      if (patterns.some((p) => p.test(String(content.content)))) {
        action = batchKey;
        break;
      }
    }

    if (!action) {
      return action;
    }

    return `${content.type}$$${action}`;
  }

  private getBatchContent(batchKey: string, count: number): string {
    if (process.env.NODE_ENV !== "production") {
      if (window.__cloudtower_i18n__?.i18next == null) {
        throw new Error("i18n not exist on window");
      }
    }
    return (window.__cloudtower_i18n__?.i18next?.td ?? parrotI18n.t)(
      this.getAction(batchKey),
      {
        count,
      }
    );
  }

  private getAction(batchKey: string) {
    const [, action] = batchKey.split("$$");
    return action || "";
  }
}

export function patchMessageMethods(m: typeof _message): typeof _message {
  const methods = [
    "success",
    "error",
    "info",
    "warning",
    "warn",
    "loading",
  ] as const;

  for (const method of methods) {
    const originalMethod = m[method];
    if (process.env.NODE_ENV !== "production") {
      if (window.i18nBatchHelper == null) {
        throw new Error("i18nBatchHelper not exist on window");
      }
    }
    const batcher = new Batcher(originalMethod, window.i18nBatchHelper);
    m[method] = function (...args: Parameters<typeof _message["success"]>) {
      const key = makeUUID();
      const content = normalizeContent(args, method);

      batcher.addMessage({ ...content, key });
      return (() => {}) as MessageType;
    };
  }

  return m;
}

function normalizeContent(
  args: Parameters<typeof _message["success"]>,
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

export const message = patchMessageMethods(_message);
