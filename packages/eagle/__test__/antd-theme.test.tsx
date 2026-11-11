import { render, screen } from "@testing-library/react";
import { useUIKitTheme } from "@src/hooks/useUIKitTheme";
import type { EagleTheme } from "@src/core/ConfigProvider";
import { useEagleTheme } from "@src/core/ConfigProvider";
import { useEffect } from "react";
import { ConfigProvider } from "@src/core/ConfigProvider";
import { theme } from "antd5";
import React from "react";

const Probe = () => {
  const { token } = theme.useToken();
  return (
    <span
      data-testid="tokens"
      data-primary={token.colorPrimary}
      data-background={token.colorBgContainer}
      data-success={token.colorSuccess}
      data-border={token.colorBorder}
      data-text={token.colorText}
    />
  );
};

it("maps Eagle tokens and preserves caller token and algorithm overrides", () => {
  const { rerender } = render(
    <ConfigProvider>
      <Probe />
    </ConfigProvider>,
  );
  expect(screen.getByTestId("tokens")).toHaveAttribute(
    "data-primary",
    "#1677ff",
  );
  expect(screen.getByTestId("tokens")).toHaveAttribute("data-success", "#52c41a");
  expect(screen.getByTestId("tokens")).toHaveAttribute("data-border", "#d9d9d9");
  expect(screen.getByTestId("tokens")).toHaveAttribute("data-text", "rgba(0, 0, 0, 0.88)");
  rerender(
    <ConfigProvider
      theme="dark"
      antd5Configs={{
        theme: {
          algorithm: theme.defaultAlgorithm,
          token: { colorPrimary: "#123456", colorBorder: "#654321" },
        },
      }}
    >
      <Probe />
    </ConfigProvider>,
  );
  expect(screen.getByTestId("tokens")).toHaveAttribute(
    "data-primary",
    "#123456",
  );
  expect(screen.getByTestId("tokens")).toHaveAttribute(
    "data-background",
    "#ffffff",
  );
  expect(screen.getByTestId("tokens")).toHaveAttribute("data-border", "#654321");
});

const observedRootThemes: Array<string | undefined> = [];
const HostProbe = () => {
  const theme = useEagleTheme();
  useEffect(() => {
    observedRootThemes.push(document.documentElement.dataset.theme);
  }, [theme]);
  return <Probe />;
};

const Host = ({ value }: { value: EagleTheme }) => {
  useUIKitTheme(value);
  return (
    <ConfigProvider theme={value}>
      <HostProbe />
    </ConfigProvider>
  );
};

it("lets the host synchronize CSS and Ant themes while providers leave the root alone", () => {
  document.documentElement.dataset.theme = "host-owned";
  const island = render(
    <ConfigProvider theme="dark">
      <Probe />
    </ConfigProvider>,
  );
  expect(document.documentElement.dataset.theme).toBe("host-owned");
  island.unmount();

  observedRootThemes.length = 0;
  const host = render(<Host value="light" />);
  expect(document.documentElement.dataset.theme).toBe("light");
  expect(screen.getByTestId("tokens").getAttribute("data-background")).toMatch(
    /^#ffffff$/i,
  );
  host.rerender(<Host value="dark" />);
  expect(document.documentElement.dataset.theme).toBe("dark");
  expect(
    screen.getByTestId("tokens").getAttribute("data-background"),
  ).not.toMatch(/^#ffffff$/i);
  host.rerender(<Host value="light" />);
  expect(document.documentElement.dataset.theme).toBe("light");
  expect(screen.getByTestId("tokens").getAttribute("data-background")).toMatch(
    /^#ffffff$/i,
  );
  expect(observedRootThemes).toEqual(["light", "dark", "light"]);
  host.unmount();
  delete document.documentElement.dataset.theme;
});
