import { Color, Effect } from "@src/styles/token";
import React from "react";

export default { title: "Tokens/Shadow, Glow & Outline" };

const groups = {
  Shadow: {
    "Dashboard Card / Normal": Effect.shadow.dashboardCard.normal,
    "Dashboard Card / Hover Float": Effect.shadow.dashboardCard.hoverFloat,
    "List Item / Hover": Effect.shadow.listItem.hover,
    "List Item / Selected": Effect.shadow.listItem.selected,
    "Menu / Default": Effect.shadow.menu.default,
    "Menu / Above": Effect.shadow.menu.above,
    "Button / CTA": Effect.shadow.button.cta,
    "Button / Ordinary": Effect.shadow.button.ordinary,
    "Preview Panel / Default": Effect.shadow.previewPanel.default,
    "Preview Panel / Above": Effect.shadow.previewPanel.above,
    Tooltip: Effect.shadow.tooltip,
  },
  "Toast Glow (tokens only; not enabled in messages)": Effect.glow.toast,
  Outline: Effect.outline,
};

export const DesignSystemEffects = () => (
  <div
    style={{
      padding: 32,
      background: Color.fill.neutral["opaque-1"],
      color: Color.text.neutral.primary,
    }}
  >
    {Object.entries(groups).map(([group, examples]) => (
      <section key={group}>
        <h2>{group}</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 48,
            padding: "32px 0 48px",
          }}
        >
          {Object.entries(examples).map(([name, shadow]) => (
            <div key={name} style={{ width: 180 }}>
              <div
                style={{
                  height: 80,
                  width: 80,
                  background: Color.fill.neutral.white,
                  boxShadow: shadow,
                }}
              />
              <p>{name}</p>
            </div>
          ))}
        </div>
      </section>
    ))}
  </div>
);
