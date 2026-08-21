import { render, screen } from "@testing-library/react";
import React from "react";

import Time from "../";

const data = {
  date: "2019-04-17 05:20",
  empty: "-",
  defaultDateFormat: "2019-04-17",
  defaultTimeFormat: "05:20",
};

describe("ui unit test - time", () => {
  it('test time would return "-" if do not pass the date', () => {
    render(<Time />);
    expect(screen.getByText(data.empty)).not.toBeNull();
  });
  it("test time would return default format if pass the date", () => {
    render(<Time date={data.date} />);
    expect(screen.getByText(data.defaultDateFormat)).not.toBeNull();
    expect(screen.getByText(data.defaultTimeFormat)).not.toBeNull();
  });
  it("test time will use props timeTemplate as expected", () => {
    const { container } = render(
      <Time date={data.date} timeTemplate="HH:mm:ss" />,
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <span
          class="time-wrapper t1ko7tvc"
        >
          <span
            class="date"
          >
            2019-04-17
          </span>
          <span
            class="time"
          >
            05:20:00
          </span>
        </span>
      </div>
    `);
  });
  it("test time will use props dateTemplate as expected", () => {
    const { container } = render(
      <Time date={data.date} dateTemplate="YYYY/MM/DD" />,
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <span
          class="time-wrapper t1ko7tvc"
        >
          <span
            class="date"
          >
            2019/04/17
          </span>
          <span
            class="time"
          >
            05:20
          </span>
        </span>
      </div>
    `);
  });
});
