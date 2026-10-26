import { ImmersiveDialog } from "@src/core/ImmersiveDialog";
import { ImmersiveDialogProps } from "@src/core/ImmersiveDialog/type";
import KitStoreProvider from "@src/core/KitStoreProvider";
import { WizardDialog } from "@src/core/WizardDialog";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const popModal = vi.hoisted(() => vi.fn());

vi.mock("@src/core/KitStoreProvider", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@src/core/KitStoreProvider")>()),
  usePopModal: () => popModal,
}));

beforeEach(() => {
  popModal.mockClear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

/** 两种弹窗共用关闭实现，验证禁用入口、恢复原配置和独立 footer 行为。 */
describe.each([
  { name: "ImmersiveDialog", Dialog: ImmersiveDialog },
  { name: "WizardDialog", Dialog: WizardDialog },
])("$name 关闭锁定", ({ Dialog }) => {
  it("保留原生禁用的关闭按钮，测试标识直接定位按钮", () => {
    const onCancel = vi.fn();
    render(<Dialog closeDisabled data-testid="dialog" onCancel={onCancel} />, {
      wrapper: KitStoreProvider,
    });

    const close = screen.getByTestId("dialog-close");
    expect(close.tagName).toBe("BUTTON");
    expect(close).toBeDisabled();
    expect(close).toHaveAttribute("aria-label");
    expect(screen.getAllByRole("button")).toHaveLength(3);
    fireEvent.click(close);
    expect(popModal).not.toHaveBeenCalled();
    expect(onCancel).not.toHaveBeenCalled();
  });

  it("锁定期间即使显式允许 Escape 和遮罩关闭也不触发取消或出栈", () => {
    const onCancel = vi.fn();
    render(<Dialog closeDisabled keyboard maskClosable onCancel={onCancel} />, {
      wrapper: KitStoreProvider,
    });

    const wrapper = screen.getByRole("dialog");
    // rc-dialog 忽略弹窗打开后 300 毫秒内的遮罩点击，越过该保护窗口验证实际关闭限制。
    vi.spyOn(Date, "now").mockReturnValue(Date.now() + 1000);
    fireEvent.keyDown(wrapper, { key: "Escape", keyCode: 27 });
    fireEvent.click(wrapper);
    expect(popModal).not.toHaveBeenCalled();
    expect(onCancel).not.toHaveBeenCalled();
  });

  it.each(["关闭按钮", "Escape", "遮罩"])(
    "解除锁定后恢复%s入口，出栈后调用 onCancel",
    (entry) => {
      const onCancel = vi.fn(() => {
        expect(popModal).toHaveBeenCalledTimes(1);
      });
      const view = (closeDisabled?: boolean) => (
        <Dialog
          closeDisabled={closeDisabled}
          onCancel={onCancel}
          data-testid="dialog"
        />
      );
      const { rerender } = render(view(true), { wrapper: KitStoreProvider });
      rerender(view());

      const wrapper = screen.getByRole("dialog");
      switch (entry) {
        case "关闭按钮":
          fireEvent.click(screen.getByTestId("dialog-close"));
          break;
        case "Escape":
          fireEvent.keyDown(wrapper, { key: "Escape", keyCode: 27 });
          break;
        case "遮罩":
          // 越过 rc-dialog 打开后 300 毫秒的防误触窗口。
          vi.spyOn(Date, "now").mockReturnValue(Date.now() + 1000);
          fireEvent.click(wrapper);
          break;
      }

      expect(popModal).toHaveBeenCalledTimes(1);
      expect(onCancel).toHaveBeenCalledTimes(1);
    },
  );

  it("点击内容按钮解除锁定后，第一次点击遮罩即可关闭", async () => {
    const onCancel = vi.fn();
    const UnlockableDialog = () => {
      const [closeDisabled, setCloseDisabled] = React.useState(true);

      return (
        <Dialog closeDisabled={closeDisabled} onCancel={onCancel}>
          <button type="button" onClick={() => setCloseDisabled(false)}>
            解除锁定
          </button>
        </Dialog>
      );
    };
    render(<UnlockableDialog />, { wrapper: KitStoreProvider });
    vi.spyOn(Date, "now").mockReturnValue(Date.now() + 1000);

    const unlock = screen.getByRole("button", { name: "解除锁定" });
    // 按真实点击顺序触发事件，确保锁定期间的 mouseup 能清除 rc-dialog 内部按下状态。
    fireEvent.mouseDown(unlock);
    fireEvent.mouseUp(unlock);
    fireEvent.click(unlock);
    await new Promise<void>((resolve) => setTimeout(resolve, 0));

    const wrapper = screen.getByRole("dialog");
    fireEvent.mouseDown(wrapper);
    fireEvent.mouseUp(wrapper);
    fireEvent.click(wrapper);

    expect(popModal).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("closable=false 在锁定和解除锁定时都隐藏关闭按钮", () => {
    const view = (closeDisabled: boolean) => (
      <Dialog
        closeDisabled={closeDisabled}
        closable={false}
        data-testid="dialog"
      />
    );
    const { rerender } = render(view(true), { wrapper: KitStoreProvider });
    expect(screen.queryByTestId("dialog-close")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /关闭|Close/ }),
    ).not.toBeInTheDocument();
    rerender(view(false));
    expect(
      screen.queryByRole("button", { name: /关闭|Close/ }),
    ).not.toBeInTheDocument();
  });

  it("自定义关闭图标在锁定与解除锁定后都保留", () => {
    const view = (closeDisabled: boolean) => (
      <Dialog
        closeDisabled={closeDisabled}
        closeIcon={<span data-testid="custom-close">自定义关闭</span>}
        data-testid="dialog"
      />
    );
    const { rerender } = render(view(true), { wrapper: KitStoreProvider });
    expect(screen.getByTestId("custom-close")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-close")).toBeDisabled();
    rerender(view(false));
    expect(screen.getByTestId("custom-close")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close" })).not.toBeDisabled();
  });

  it("关闭锁定不自动禁用 footer 取消，调用方可独立禁用", () => {
    const onCancel = vi.fn();
    const view = (
      cancelButtonProps?: ImmersiveDialogProps["cancelButtonProps"],
    ) => (
      <Dialog
        closeDisabled
        onCancel={onCancel}
        cancelButtonProps={cancelButtonProps}
        data-testid="dialog"
      />
    );
    const { rerender } = render(view({ disabled: true }), {
      wrapper: KitStoreProvider,
    });
    fireEvent.click(screen.getByTestId("dialog-cancel"));
    expect(popModal).not.toHaveBeenCalled();
    rerender(view());
    expect(screen.getByTestId("dialog-cancel")).not.toBeDisabled();
    fireEvent.click(screen.getByTestId("dialog-cancel"));
    expect(popModal).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("解除锁定后保留调用方原有的 keyboard=false 与 maskClosable=false", () => {
    const onCancel = vi.fn();
    const view = (closeDisabled: boolean) => (
      <Dialog
        closeDisabled={closeDisabled}
        keyboard={false}
        maskClosable={false}
        onCancel={onCancel}
      />
    );
    const { rerender } = render(view(true), { wrapper: KitStoreProvider });
    rerender(view(false));
    const wrapper = screen.getByRole("dialog");
    // rc-dialog 忽略弹窗打开后 300 毫秒内的遮罩点击，越过该保护窗口验证实际关闭限制。
    vi.spyOn(Date, "now").mockReturnValue(Date.now() + 1000);
    fireEvent.keyDown(wrapper, { key: "Escape", keyCode: 27 });
    fireEvent.click(wrapper);
    expect(popModal).not.toHaveBeenCalled();
    expect(onCancel).not.toHaveBeenCalled();
  });
});
