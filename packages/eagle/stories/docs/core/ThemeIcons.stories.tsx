import * as icons from "@cloudtower/icons-react";
import Alert from "@src/core/Alert";
import Breadcrumb from "@src/core/Breadcrumb";
import Button from "@src/core/Button";
import KitStoreProvider, { usePushModal } from "@src/core/KitStoreProvider";
import ModalStack from "@src/core/ModalStack";
import Pagination from "@src/core/Pagination";
import { SmallDialog } from "@src/core/SmallDialog";
import Tooltip from "@src/core/Tooltip";
import React, { Fragment, useEffect, useState } from "react";

import manifest from "../../../../icons-react/scripts/theme-icon-manifest.json";

const meta = {
  title: "Core/ThemeIcons | 主题图标",
  parameters: {
    docs: {
      description: {
        component:
          "对比中性图标的原色回退、浅色与暗色，以及实际组件和弹层中的表现。",
      },
    },
  },
};

export default meta;

const darkTokens = {
  "--text-neutral-super": "#e5edf8",
  "--text-neutral-primary": "#d3deeb",
  "--text-neutral-secondary": "#c0cddd",
  "--text-neutral-tertiary": "#a8b8cd",
  "--text-neutral-quaternary": "#93a4ba",
};
const fallback = Object.fromEntries(
  Object.keys(darkTokens).map((token) => [token, "initial"]),
) as React.CSSProperties;
const darkSurface = "#121b27";
const darkPopup = "#182332";

export const Palette = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "minmax(260px, 1fr) repeat(3, minmax(80px, 1fr))",
      alignItems: "stretch",
    }}
  >
    <strong>图标</strong>
    <strong>原色回退</strong>
    <strong>浅色</strong>
    <strong>暗色</strong>
    {Object.entries(manifest).map(([file, [componentName]]) => {
      const Glyph = icons[componentName as keyof typeof icons];
      return (
        <Fragment key={file}>
          <code style={{ padding: 8 }}>{file.slice(0, -4)}</code>
          <div data-theme="light" style={{ ...fallback, padding: 8 }}>
            <Glyph />
          </div>
          <div style={{ background: "#ffffff", padding: 8 }}>
            <Glyph />
          </div>
          <div
            data-theme="dark"
            style={{ ...darkTokens, background: darkSurface, padding: 8 }}
          >
            <Glyph />
          </div>
        </Fragment>
      );
    })}
  </div>
);

const OpenDialog = () => {
  const pushModal = usePushModal();
  return (
    <Button
      onClick={() =>
        pushModal({
          component: () => (
            <SmallDialog title="弹窗图标">
              <div data-testid="theme-icon-modal">
                <icons.CaretTriangleDown16Icon />
              </div>
            </SmallDialog>
          ),
          props: {},
        })
      }
    >
      打开弹窗
    </Button>
  );
};

export const Components = () => {
  const [dark, setDark] = useState(false);
  const [localDark, setLocalDark] = useState(false);
  const [current, setCurrent] = useState(1);
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.dataset.theme;
    root.dataset.theme = dark ? "dark" : "light";
    return () => {
      if (previous === undefined) delete root.dataset.theme;
      else root.dataset.theme = previous;
    };
  }, [dark]);

  return (
    <KitStoreProvider>
      <ModalStack />
      <div
        data-testid="theme-icon-components"
        style={{ background: dark ? darkSurface : "#ffffff", padding: 24 }}
      >
        <style>
          {`:root[data-theme="dark"]:has([data-testid="theme-icon-components"]) {
            ${Object.entries(darkTokens)
              .map(([key, value]) => `${key}: ${value};`)
              .join("\n")}
          }
          [data-testid="theme-icon-tooltip"], [data-testid="theme-icon-modal"] {
            background: #ffffff;
          }
          :root[data-theme="dark"]:has([data-testid="theme-icon-components"])
            :is([data-testid="theme-icon-tooltip"], [data-testid="theme-icon-modal"]) {
            background: ${darkPopup};
          }`}
        </style>
        <Button onClick={() => setDark(!dark)}>切换页面主题</Button>
        <Button onClick={() => setLocalDark(!localDark)}>切换图标主题</Button>
        <div
          data-testid="theme-icon-local"
          data-theme={localDark ? "dark" : undefined}
          style={localDark ? { ...darkTokens, background: darkSurface } : {}}
        >
          <icons.CaretTriangleDown16Icon />
        </div>
        <Alert
          type="info"
          message="警告图标"
          closable
          data-testid="theme-icon-alert"
        />
        <Pagination
          current={current}
          count={50}
          size={10}
          onChange={setCurrent}
          data-testid="theme-icon-pagination"
        />
        <Breadcrumb
          data-testid="theme-icon-breadcrumb"
          items={[
            { id: "home", resource: "demo", name: "首页", onClick: () => {} },
            { id: "icons", resource: "demo", name: "图标", onClick: () => {} },
          ]}
        />
        <Tooltip
          title={
            <div data-testid="theme-icon-tooltip">
              <icons.CaretTriangleDown16Icon />
            </div>
          }
        >
          <Button>查看提示</Button>
        </Tooltip>
        <OpenDialog />
      </div>
    </KitStoreProvider>
  );
};
