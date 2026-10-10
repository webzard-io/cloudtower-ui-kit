import { ImmersiveDialog } from "@src/core/ImmersiveDialog";
import KitStoreProvider from "@src/core/KitStoreProvider";
import { MediumDialog } from "@src/core/MediumDialog";
import type { SmallDialogProps } from "@src/core/SmallDialog";
import { SmallDialog } from "@src/core/SmallDialog";
import { WizardDialog } from "@src/core/WizardDialog";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

const dialogs = [
  { name: "SmallDialog", Dialog: SmallDialog },
  { name: "MediumDialog", Dialog: MediumDialog },
  { name: "ImmersiveDialog", Dialog: ImmersiveDialog },
  { name: "WizardDialog", Dialog: WizardDialog },
];

describe.each(dialogs)("$name 初始化", ({ Dialog }) => {
  it("默认在首次成功后保留内容、标题、footer 和表单状态", () => {
    const view = (initializing: boolean) => (
      <Dialog initializing={initializing} title="主机配置" data-testid="dialog">
        <input aria-label="主机名称" defaultValue="host-01" />
      </Dialog>
    );
    const { rerender } = render(view(true), { wrapper: KitStoreProvider });

    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryByText("主机配置")).not.toBeInTheDocument();
    expect(screen.queryByTestId("dialog-ok")).not.toBeInTheDocument();

    rerender(view(false));
    const input = screen.getByRole("textbox", { name: "主机名称" });
    fireEvent.change(input, { target: { value: "host-edited" } });

    rerender(view(true));
    expect(screen.getByRole("textbox", { name: "主机名称" })).toBe(input);
    expect(input).toHaveValue("host-edited");
    expect(screen.getByText("主机配置")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-ok")).toHaveAttribute("type", "button");
    expect(screen.getByTestId("dialog-cancel")).toHaveAttribute(
      "type",
      "button",
    );
  });

  it("成功后的刷新错误不替换内容、默认按钮文案或错误样式", () => {
    const view = (initializing: boolean, initializingError?: string) => (
      <Dialog
        title=""
        initializing={initializing}
        initializingError={initializingError}
        data-testid="dialog"
      >
        <input aria-label="主机名称" defaultValue="host-01" />
      </Dialog>
    );
    const { rerender } = render(view(true), { wrapper: KitStoreProvider });
    rerender(view(false));
    const input = screen.getByRole("textbox");
    const okText = screen.getByTestId("dialog-ok").textContent;
    fireEvent.change(input, { target: { value: "host-edited" } });

    rerender(view(true, "刷新失败"));
    expect(screen.getByRole("textbox")).toBe(input);
    rerender(view(false, "刷新失败"));
    expect(screen.getByRole("textbox")).toHaveValue("host-edited");
    expect(screen.queryByText("刷新失败")).not.toBeInTheDocument();
    expect(screen.getByRole("document")).not.toHaveClass("initializing-error");
    expect(screen.getByTestId("dialog-ok").textContent).toBe(okText);
  });

  it("首次失败后可以手动重试多次，成功前继续显示加载和错误状态", () => {
    const view = (initializing: boolean, initializingError?: string) => (
      <Dialog
        title=""
        initializing={initializing}
        initializingError={initializingError}
        data-testid="dialog"
        onOk={() => rerender(view(true, initializingError))}
      >
        <p>主机详情</p>
      </Dialog>
    );
    const { rerender } = render(view(true), { wrapper: KitStoreProvider });
    rerender(view(false, "首次加载失败"));
    expect(screen.getByText("首次加载失败")).toBeInTheDocument();
    expect(screen.getByRole("document")).toHaveClass("initializing-error");

    fireEvent.click(screen.getByTestId("dialog-ok"));
    expect(screen.queryByText("首次加载失败")).not.toBeInTheDocument();
    expect(screen.queryByText("主机详情")).not.toBeInTheDocument();
    expect(screen.queryByTestId("dialog-ok")).not.toBeInTheDocument();

    rerender(view(false, "重试加载失败"));
    expect(screen.getByText("重试加载失败")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("dialog-ok"));
    expect(screen.queryByText("主机详情")).not.toBeInTheDocument();
    expect(screen.queryByTestId("dialog-ok")).not.toBeInTheDocument();

    rerender(view(false));
    expect(screen.getByText("主机详情")).toBeInTheDocument();
    expect(screen.getByRole("document")).not.toHaveClass("initializing-error");
    rerender(view(true));
    expect(screen.getByText("主机详情")).toBeInTheDocument();
  });

  it("首次渲染已有错误时，仍允许随后重试加载", () => {
    const view = (initializing: boolean, initializingError?: string) => (
      <Dialog
        title=""
        initializing={initializing}
        initializingError={initializingError}
      >
        <p>主机详情</p>
      </Dialog>
    );
    const { rerender } = render(view(false, "首次加载失败"), {
      wrapper: KitStoreProvider,
    });
    expect(screen.getByText("首次加载失败")).toBeInTheDocument();
    rerender(view(true));
    expect(screen.queryByText("主机详情")).not.toBeInTheDocument();
    rerender(view(false));
    expect(screen.getByText("主机详情")).toBeInTheDocument();
  });

  it("首次渲染没有加载和错误时即视为成功", () => {
    const view = (
      props: Pick<SmallDialogProps, "initializing" | "initializingError">,
    ) => (
      <Dialog title="" {...props}>
        <p>缓存的主机详情</p>
      </Dialog>
    );
    const { rerender } = render(view({}), { wrapper: KitStoreProvider });
    rerender(view({ initializing: true }));
    expect(screen.getByText("缓存的主机详情")).toBeInTheDocument();
    rerender(view({ initializingError: "刷新失败" }));
    expect(screen.getByText("缓存的主机详情")).toBeInTheDocument();
    expect(screen.queryByText("刷新失败")).not.toBeInTheDocument();
  });

  it("initializeOnce=false 时，加载和错误完全受控", () => {
    const view = (initializing: boolean, initializingError?: string) => (
      <Dialog
        initializeOnce={false}
        initializing={initializing}
        initializingError={initializingError}
        title="主机配置"
        data-testid="dialog"
      >
        <p>主机详情</p>
      </Dialog>
    );
    const { rerender } = render(view(false), { wrapper: KitStoreProvider });
    rerender(view(true));
    expect(screen.queryByText("主机详情")).not.toBeInTheDocument();
    expect(screen.queryByText("主机配置")).not.toBeInTheDocument();
    expect(screen.queryByTestId("dialog-ok")).not.toBeInTheDocument();

    rerender(view(false, "刷新失败"));
    expect(screen.getByText("刷新失败")).toBeInTheDocument();
    expect(screen.queryByText("主机详情")).not.toBeInTheDocument();
    expect(screen.getByRole("document")).toHaveClass("initializing-error");
    rerender(view(true));
    expect(screen.queryByTestId("dialog-ok")).not.toBeInTheDocument();
    rerender(view(false));
    expect(screen.getByText("主机详情")).toBeInTheDocument();
  });

  it("通过 key 重新挂载时允许重新初始化", () => {
    const view = (hostId: string, initializing: boolean) => (
      <Dialog key={hostId} title="" initializing={initializing}>
        <p>{hostId}</p>
      </Dialog>
    );
    const { rerender } = render(view("host-01", true), {
      wrapper: KitStoreProvider,
    });
    rerender(view("host-01", false));
    expect(screen.getByText("host-01")).toBeInTheDocument();
    rerender(view("host-02", true));
    expect(screen.queryByText("host-02")).not.toBeInTheDocument();
    rerender(view("host-02", false));
    expect(screen.getByText("host-02")).toBeInTheDocument();
  });
});

describe.each([
  { name: "ImmersiveDialog", Dialog: ImmersiveDialog },
  { name: "WizardDialog", Dialog: WizardDialog },
])("$name 可见性", ({ Dialog }) => {
  it("仅切换 visible 不重置初始化完成的记录", () => {
    const view = (visible: boolean, initializing: boolean) => (
      <Dialog
        visible={visible}
        initializing={initializing}
        initializingError="刷新失败"
      >
        <p>主机详情</p>
      </Dialog>
    );
    const { rerender } = render(
      <Dialog>
        <p>主机详情</p>
      </Dialog>,
      { wrapper: KitStoreProvider },
    );
    rerender(view(false, true));
    rerender(view(true, true));
    expect(screen.getByText("主机详情")).toBeInTheDocument();
    expect(screen.queryByText("刷新失败")).not.toBeInTheDocument();
  });
});

it("WizardDialog 刷新时保留实际步骤中的表单状态", () => {
  const steps = [
    {
      title: "基本信息",
      children: <input aria-label="主机名称" defaultValue="host-01" />,
    },
  ];
  const view = (initializing: boolean) => (
    <WizardDialog steps={steps} initializing={initializing} />
  );
  const { rerender } = render(view(true), { wrapper: KitStoreProvider });
  rerender(view(false));
  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "host-edited" },
  });
  rerender(view(true));
  expect(screen.getByRole("textbox")).toHaveValue("host-edited");
  expect(screen.getByText("基本信息")).toBeInTheDocument();
});
