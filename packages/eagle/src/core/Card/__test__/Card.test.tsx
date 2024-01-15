import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import { mountTest } from "../../../utils/testSuit";
import Card, { CardProps } from "..";

const defaultProps: CardProps = {
  title: "title-string",
  subInfo: "subinfo-string",
  className: "class-string",
};

const bodyContent = "body-string";

mountTest(<Card {...defaultProps}>{bodyContent}</Card>, "card");

describe("ui unit test - card", () => {
  it("test card render without props title", () => {
    const { container } = render(<Card {...defaultProps}>{bodyContent}</Card>);
    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <div
          class=
        box-shadow:
          0px 0.119595px 0.438513px rgba(129, 138, 153, 0.14),
          0px 0.271728px 0.996336px rgba(129, 138, 153, 0.106447),
          0px 0.472931px 1.73408px rgba(129, 138, 153, 0.0912224),
          0px 0.751293px 2.75474px rgba(129, 138, 153, 0.0799253),
          0px 1.15919px 4.25036px rgba(129, 138, 153, 0.07),
          0px 1.80882px 6.63236px rgba(129, 138, 153, 0.0600747),
          0px 3.00293px 11.0107px rgba(129, 138, 153, 0.0487776),
          0px 6px 22px rgba(129, 138, 153, 0.0335534);
      ,card-wrapper,class-string,
        border-radius: 8px;
        background-color: white;
        &.hoverable {
          cursor: pointer;

          &:hover {
            transition: all 200ms ease;
            box-shadow:
              0px 9px 22px rgb(107 125 153 / 23%),
              0px 1.12694px 2.75474px rgb(107 125 153 / 12%);
            transform: translateY(-4px);
          }
        }

        >
          <div
            class=card-title,
        color: $text-primary-light;
        padding: 7px 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &.has-arrow {
          padding-left: 10px;

          .title-wrapper {
            cursor: pointer;
            color: $text-light-primary;

            &.is-open {
              color: $text-primary-light;
              font-weight: 600;

              .collapse-arrow {
                transform: rotate(90deg);
              }
            }
          }
        }

        .sub-info {
          font-size: 12px;
          line-height: 18px;
        }

        .title-wrapper {
          display: flex;
          align-items: center;
          user-select: none;
          flex-grow: 1;
          font-size: 12px;
          line-height: 18px;
          color: $text-primary-light;
          font-weight: 700;
        }

        .collapse-arrow {
          transition: all 50ms ease-out 0ms;
          margin-right: 2px;
        }

          >
            <div
              class=title-wrapper
            >
              title-string
            </div>
            <div
              class=sub-info
            >
              subinfo-string
            </div>
          </div>
          <div
            class=card-body,
        padding: 0 12px 14px 12px;

          >
            body-string
          </div>
        </div>
      </div>
    `);
  });
  it("test card would not collapse if the collapsible is false", () => {
    render(<Card {...defaultProps}>{bodyContent}</Card>);
    expect(screen.getByText(bodyContent)).not.toBeNull();
    fireEvent.click(screen.getByText(defaultProps.title as string));
    expect(screen.getByText(bodyContent)).not.toBeNull();
  });
  it("test it can invoke collapse if the collapsible is true", () => {
    render(
      <Card {...defaultProps} collapsible={true}>
        {bodyContent}
      </Card>
    );
    fireEvent.click(screen.getByText(defaultProps.title as string));
    expect(screen.getByText(bodyContent)).not.toBeNull();
  });
});
