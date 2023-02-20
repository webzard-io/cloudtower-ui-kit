import { render } from "@testing-library/react";
import React from "react";
import { describe, it, vi } from "vitest";

import FieldsDateTimeRange from "..";

describe("Input h5_css", () => {
  it("h5_css without_tags", ({ expect }) => {
    const inputName = "inputName1";
    const onBlur = vi.fn();
    const onChange = vi.fn();
    const onFocus = vi.fn();

    const { container } = render(
      <FieldsDateTimeRange
        input={{
          name: inputName,
          onBlur,
          onChange,
          onFocus,
          value: ["2020-03-13", "2020-03-15"],
        }}
        meta={{}}
      />
    );

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <div
          class=datatime-range
        >
          <div
            class=ant-picker,ant-picker-range
          >
            <div
              class=ant-picker-input,ant-picker-input-active
            >
              <input
                autocomplete=off
                placeholder=Start,date
                readonly=
                size=21
                value=2020-03-13,00:00:00
              />
            </div>
            <div
              class=ant-picker-range-separator
            >
              <span
                aria-label=to
                class=ant-picker-separator
              >
                <span
                  aria-label=swap-right
                  class=anticon,anticon-swap-right
                  role=img
                >
                  <svg
                    aria-hidden=true
                    class=
                    data-icon=swap-right
                    fill=currentColor
                    focusable=false
                    height=1em
                    viewBox=0,0,1024,1024
                    width=1em
                  >
                    <path
                      d=M873.1,596.2l-164-208A32,32,0,00684,376h-64.8c-6.7,0-10.4,7.7-6.3,13l144.3,183H152c-4.4,0-8,3.6-8,8v60c0,4.4,3.6,8,8,8h695.9c26.8,0,41.7-30.8,25.2-51.8z
                    />
                  </svg>
                </span>
              </span>
            </div>
            <div
              class=ant-picker-input
            >
              <input
                autocomplete=off
                placeholder=End,date
                readonly=
                size=21
                value=2020-03-15,00:00:00
              />
            </div>
            <div
              class=ant-picker-active-bar
              style=left:,0px;,width:,0px;,position:,absolute;
            />
            <span
              class=ant-picker-suffix
            >
              <span
                aria-label=calendar
                class=anticon,anticon-calendar
                role=img
              >
                <svg
                  aria-hidden=true
                  class=
                  data-icon=calendar
                  fill=currentColor
                  focusable=false
                  height=1em
                  viewBox=64,64,896,896
                  width=1em
                >
                  <path
                    d=M880,184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4,0-8,3.6-8,8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4,0-8,3.6-8,8v64H144c-17.7,0-32,14.3-32,32v664c0,17.7,14.3,32,32,32h736c17.7,0,32-14.3,32-32V216c0-17.7-14.3-32-32-32zm-40,656H184V460h656v380zM184,392V256h128v48c0,4.4,3.6,8,8,8h56c4.4,0,8-3.6,8-8v-48h256v48c0,4.4,3.6,8,8,8h56c4.4,0,8-3.6,8-8v-48h128v136H184z
                  />
                </svg>
              </span>
            </span>
            <span
              class=ant-picker-clear
            >
              <span
                aria-label=close-circle
                class=anticon,anticon-close-circle
                role=img
              >
                <svg
                  aria-hidden=true
                  class=
                  data-icon=close-circle
                  fill=currentColor
                  focusable=false
                  height=1em
                  viewBox=64,64,896,896
                  width=1em
                >
                  <path
                    d=M512,64C264.6,64,64,264.6,64,512s200.6,448,448,448,448-200.6,448-448S759.4,64,512,64zm165.4,618.2l-66-.3L512,563.4l-99.3,118.4-66.1.3c-4.4,0-8-3.5-8-8,0-1.9.7-3.7,1.9-5.2l130.1-155L340.5,359a8.32,8.32,0,01-1.9-5.2c0-4.4,3.6-8,8-8l66.1.3L512,464.6l99.3-118.4,66-.3c4.4,0,8,3.5,8,8,0,1.9-.7,3.7-1.9,5.2L553.5,514l130,155c1.2,1.5,1.9,3.3,1.9,5.2,0,4.4-3.6,8-8,8z
                  />
                </svg>
              </span>
            </span>
          </div>
        </div>
      </div>
    `);
  });
});
