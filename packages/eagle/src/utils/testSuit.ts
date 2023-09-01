import { render } from "@testing-library/react";

export function mountTest(Component: JSX.Element, name: string) {
  describe(`${name} -- mount and unmount test`, () => {
    it("can mount and unmount without error", () => {
      const { unmount, container } = render(Component);
      expect({
        linaria: true,
        dom: container,
      }).toMatchSnapshot();
      expect(() => {
        unmount();
      }).not.toThrowError();
    });
  });
}
