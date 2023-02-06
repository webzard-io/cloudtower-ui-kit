import { render } from "@testing-library/react";
import React, { PropsWithChildren, useContext } from "react";
import { describe, it } from "vitest";

import getAllStyles from "../../../../__test__/getAllStyles";
import { kitContext, RequiredColumnProps } from "../../../spec";
import { antdKit } from "../../antd";
import KitStoreProvider from "../../KitStoreProvider";
import ModalStack from "../../ModalStack";

const AllTheProviders = ({ children }: PropsWithChildren<{}>) => {
  return (
    <KitStoreProvider>
      <kitContext.Provider value={antdKit}>
        <ModalStack />
        {children}
      </kitContext.Provider>
    </KitStoreProvider>
  );
};

interface DataType {
  id: string;
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: RequiredColumnProps<DataType>[] = [
  {
    key: "1",
    dataIndex: "name",
    title: "Name",
    render: (text: string) => (
      <div>
        <p>{text}</p>
      </div>
    ),
  },
  {
    key: "2",
    title: "Age",
    dataIndex: "age",
  },
  {
    key: "3",
    title: "Address",
    dataIndex: "address",
  },
];

const data: DataType[] = [
  {
    id: "1",
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    id: "2",
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    id: "3",
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    id: "4",
    key: "4",
    name: "Disabled User",
    age: 99,
    address: "Sydney No. 1 Lake Park",
  },
];

const Component = () => {
  const kit = useContext(kitContext);

  return <kit.table<DataType> dataSource={data} columns={columns} />;
};

describe("Table h5_css", () => {
  it.todo("image", ({ expect }) => {});

  it.concurrent("h5", ({ expect }) => {
    const { container } = render(<Component />, {
      wrapper: AllTheProviders,
    });

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="t1upn1sz table-container no-scroll-bar"
        >
          <div
            class="ant-table-wrapper tta5kd2"
          >
            <div
              class="ant-spin-nested-loading"
            >
              <div>
                <div
                  class="ant-spin ant-spin-spinning"
                >
                  <div
                    class="loading-full-view f1rest1f"
                  >
                    <div
                      class="loading"
                    >
                      <div
                        class="loading__sugar"
                      />
                      <div
                        class="loading__sugar"
                      />
                      <div
                        class="loading__sugar"
                      />
                      <div
                        class="loading__sugar"
                      />
                      <div
                        class="loading__sugar"
                      />
                      <div
                        class="loading__sugar"
                      />
                      <div
                        class="loading__sugar"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="ant-spin-container ant-spin-blur"
              >
                <div
                  class="ant-table ant-table-small ant-table-layout-fixed"
                >
                  <div
                    class="ant-table-container"
                  >
                    <div
                      class="ant-table-content"
                    >
                      <table
                        style="table-layout: fixed;"
                      >
                        <colgroup />
                        <thead
                          class="ant-table-thead"
                        >
                          <tr>
                            <th
                              class="ant-table-cell"
                            >
                              Name
                            </th>
                            <th
                              class="ant-table-cell"
                            >
                              Age
                            </th>
                            <th
                              class="ant-table-cell"
                            >
                              Address
                            </th>
                          </tr>
                        </thead>
                        <tbody
                          class="ant-table-tbody"
                        >
                          <tr
                            class="ant-table-row ant-table-row-level-0"
                            data-row-key="1"
                          >
                            <td
                              class="ant-table-cell"
                            >
                              <div>
                                <p>
                                  John Brown
                                </p>
                              </div>
                            </td>
                            <td
                              class="ant-table-cell"
                            >
                              32
                            </td>
                            <td
                              class="ant-table-cell"
                            >
                              New York No. 1 Lake Park
                            </td>
                          </tr>
                          <tr
                            class="ant-table-row ant-table-row-level-0"
                            data-row-key="2"
                          >
                            <td
                              class="ant-table-cell"
                            >
                              <div>
                                <p>
                                  Jim Green
                                </p>
                              </div>
                            </td>
                            <td
                              class="ant-table-cell"
                            >
                              42
                            </td>
                            <td
                              class="ant-table-cell"
                            >
                              London No. 1 Lake Park
                            </td>
                          </tr>
                          <tr
                            class="ant-table-row ant-table-row-level-0"
                            data-row-key="3"
                          >
                            <td
                              class="ant-table-cell"
                            >
                              <div>
                                <p>
                                  Joe Black
                                </p>
                              </div>
                            </td>
                            <td
                              class="ant-table-cell"
                            >
                              32
                            </td>
                            <td
                              class="ant-table-cell"
                            >
                              Sydney No. 1 Lake Park
                            </td>
                          </tr>
                          <tr
                            class="ant-table-row ant-table-row-level-0"
                            data-row-key="4"
                          >
                            <td
                              class="ant-table-cell"
                            >
                              <div>
                                <p>
                                  Disabled User
                                </p>
                              </div>
                            </td>
                            <td
                              class="ant-table-cell"
                            >
                              99
                            </td>
                            <td
                              class="ant-table-cell"
                            >
                              Sydney No. 1 Lake Park
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  });

  it.concurrent("css", ({ expect }) => {
    const { container } = render(<Component />, {
      wrapper: AllTheProviders,
    });

    const style = getAllStyles(container);
    expect(style).toMatchInlineSnapshot(`
      [
        CSSStyleDeclaration {
          "0": "display",
          "1": "visibility",
          "_importants": {
            "display": "",
            "visibility": undefined,
          },
          "_length": 2,
          "_onChange": [Function],
          "_values": {
            "display": "block",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "visibility",
          "_importants": {
            "display": "",
            "visibility": undefined,
          },
          "_length": 2,
          "_onChange": [Function],
          "_values": {
            "display": "block",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "visibility",
          "_importants": {
            "display": "",
            "visibility": undefined,
          },
          "_length": 2,
          "_onChange": [Function],
          "_values": {
            "display": "block",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "visibility",
          "_importants": {
            "display": "",
            "visibility": undefined,
          },
          "_length": 2,
          "_onChange": [Function],
          "_values": {
            "display": "block",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "visibility",
          "_importants": {
            "display": "",
            "visibility": undefined,
          },
          "_length": 2,
          "_onChange": [Function],
          "_values": {
            "display": "block",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "visibility",
          "_importants": {
            "display": "",
            "visibility": undefined,
          },
          "_length": 2,
          "_onChange": [Function],
          "_values": {
            "display": "block",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "visibility",
          "_importants": {
            "display": "",
            "visibility": undefined,
          },
          "_length": 2,
          "_onChange": [Function],
          "_values": {
            "display": "block",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "visibility",
          "_importants": {
            "display": "",
            "visibility": undefined,
          },
          "_length": 2,
          "_onChange": [Function],
          "_values": {
            "display": "block",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "visibility",
          "_importants": {
            "display": "",
            "visibility": undefined,
          },
          "_length": 2,
          "_onChange": [Function],
          "_values": {
            "display": "block",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "visibility",
          "_importants": {
            "display": "",
            "visibility": undefined,
          },
          "_length": 2,
          "_onChange": [Function],
          "_values": {
            "display": "block",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "visibility",
          "_importants": {
            "display": "",
            "visibility": undefined,
          },
          "_length": 2,
          "_onChange": [Function],
          "_values": {
            "display": "block",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "visibility",
          "_importants": {
            "display": "",
            "visibility": undefined,
          },
          "_length": 2,
          "_onChange": [Function],
          "_values": {
            "display": "block",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "visibility",
          "_importants": {
            "display": "",
            "visibility": undefined,
          },
          "_length": 2,
          "_onChange": [Function],
          "_values": {
            "display": "block",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "visibility",
          "_importants": {
            "display": "",
            "visibility": undefined,
          },
          "_length": 2,
          "_onChange": [Function],
          "_values": {
            "display": "block",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "visibility",
          "_importants": {
            "display": "",
            "visibility": undefined,
          },
          "_length": 2,
          "_onChange": [Function],
          "_values": {
            "display": "block",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "visibility",
          "_importants": {
            "display": "",
            "visibility": undefined,
          },
          "_length": 2,
          "_onChange": [Function],
          "_values": {
            "display": "block",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "visibility",
          "_importants": {
            "display": "",
            "visibility": undefined,
          },
          "_length": 2,
          "_onChange": [Function],
          "_values": {
            "display": "block",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "visibility",
          "_importants": {
            "display": "",
            "visibility": undefined,
          },
          "_length": 2,
          "_onChange": [Function],
          "_values": {
            "display": "block",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "visibility",
          "_importants": {
            "display": "",
            "visibility": undefined,
          },
          "_length": 2,
          "_onChange": [Function],
          "_values": {
            "display": "block",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "border-collapse",
          "2": "border-spacing",
          "3": "border-color",
          "4": "visibility",
          "5": "table-layout",
          "_importants": {
            "border-collapse": "",
            "border-color": "",
            "border-spacing": "",
            "display": "",
            "table-layout": "",
            "visibility": undefined,
          },
          "_length": 6,
          "_onChange": [Function],
          "_values": {
            "border-bottom-color": "gray",
            "border-collapse": "separate",
            "border-color": "gray",
            "border-left-color": "gray",
            "border-right-color": "gray",
            "border-spacing": "2px",
            "border-top-color": "gray",
            "display": "table",
            "table-layout": "fixed",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "visibility",
          "_importants": {
            "display": "",
            "visibility": undefined,
          },
          "_length": 2,
          "_onChange": [Function],
          "_values": {
            "display": "table-column-group",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "vertical-align",
          "2": "visibility",
          "_importants": {
            "border-color": "",
            "display": "",
            "vertical-align": "",
            "visibility": undefined,
          },
          "_length": 3,
          "_onChange": [Function],
          "_values": {
            "display": "table-header-group",
            "vertical-align": "middle",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "vertical-align",
          "2": "visibility",
          "_importants": {
            "border-color": "",
            "display": "",
            "vertical-align": "",
            "visibility": undefined,
          },
          "_length": 3,
          "_onChange": [Function],
          "_values": {
            "display": "table-row",
            "vertical-align": "inherit",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "vertical-align",
          "2": "font-weight",
          "3": "visibility",
          "_importants": {
            "display": "",
            "font-weight": "",
            "vertical-align": "",
            "visibility": undefined,
          },
          "_length": 4,
          "_onChange": [Function],
          "_values": {
            "display": "table-cell",
            "font-weight": "bold",
            "vertical-align": "inherit",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "vertical-align",
          "2": "font-weight",
          "3": "visibility",
          "_importants": {
            "display": "",
            "font-weight": "",
            "vertical-align": "",
            "visibility": undefined,
          },
          "_length": 4,
          "_onChange": [Function],
          "_values": {
            "display": "table-cell",
            "font-weight": "bold",
            "vertical-align": "inherit",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "vertical-align",
          "2": "font-weight",
          "3": "visibility",
          "_importants": {
            "display": "",
            "font-weight": "",
            "vertical-align": "",
            "visibility": undefined,
          },
          "_length": 4,
          "_onChange": [Function],
          "_values": {
            "display": "table-cell",
            "font-weight": "bold",
            "vertical-align": "inherit",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "vertical-align",
          "2": "visibility",
          "_importants": {
            "border-color": "",
            "display": "",
            "vertical-align": "",
            "visibility": undefined,
          },
          "_length": 3,
          "_onChange": [Function],
          "_values": {
            "display": "table-row-group",
            "vertical-align": "middle",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "vertical-align",
          "2": "visibility",
          "_importants": {
            "border-color": "",
            "display": "",
            "vertical-align": "",
            "visibility": undefined,
          },
          "_length": 3,
          "_onChange": [Function],
          "_values": {
            "display": "table-row",
            "vertical-align": "inherit",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "vertical-align",
          "2": "visibility",
          "_importants": {
            "display": "",
            "vertical-align": "",
            "visibility": undefined,
          },
          "_length": 3,
          "_onChange": [Function],
          "_values": {
            "display": "table-cell",
            "vertical-align": "inherit",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "visibility",
          "_importants": {
            "display": "",
            "visibility": undefined,
          },
          "_length": 2,
          "_onChange": [Function],
          "_values": {
            "display": "block",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "visibility",
          "_importants": {
            "display": "",
            "visibility": undefined,
          },
          "_length": 2,
          "_onChange": [Function],
          "_values": {
            "display": "block",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "vertical-align",
          "2": "visibility",
          "_importants": {
            "display": "",
            "vertical-align": "",
            "visibility": undefined,
          },
          "_length": 3,
          "_onChange": [Function],
          "_values": {
            "display": "table-cell",
            "vertical-align": "inherit",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "vertical-align",
          "2": "visibility",
          "_importants": {
            "display": "",
            "vertical-align": "",
            "visibility": undefined,
          },
          "_length": 3,
          "_onChange": [Function],
          "_values": {
            "display": "table-cell",
            "vertical-align": "inherit",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "vertical-align",
          "2": "visibility",
          "_importants": {
            "border-color": "",
            "display": "",
            "vertical-align": "",
            "visibility": undefined,
          },
          "_length": 3,
          "_onChange": [Function],
          "_values": {
            "display": "table-row",
            "vertical-align": "inherit",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "vertical-align",
          "2": "visibility",
          "_importants": {
            "display": "",
            "vertical-align": "",
            "visibility": undefined,
          },
          "_length": 3,
          "_onChange": [Function],
          "_values": {
            "display": "table-cell",
            "vertical-align": "inherit",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "visibility",
          "_importants": {
            "display": "",
            "visibility": undefined,
          },
          "_length": 2,
          "_onChange": [Function],
          "_values": {
            "display": "block",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "visibility",
          "_importants": {
            "display": "",
            "visibility": undefined,
          },
          "_length": 2,
          "_onChange": [Function],
          "_values": {
            "display": "block",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "vertical-align",
          "2": "visibility",
          "_importants": {
            "display": "",
            "vertical-align": "",
            "visibility": undefined,
          },
          "_length": 3,
          "_onChange": [Function],
          "_values": {
            "display": "table-cell",
            "vertical-align": "inherit",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "vertical-align",
          "2": "visibility",
          "_importants": {
            "display": "",
            "vertical-align": "",
            "visibility": undefined,
          },
          "_length": 3,
          "_onChange": [Function],
          "_values": {
            "display": "table-cell",
            "vertical-align": "inherit",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "vertical-align",
          "2": "visibility",
          "_importants": {
            "border-color": "",
            "display": "",
            "vertical-align": "",
            "visibility": undefined,
          },
          "_length": 3,
          "_onChange": [Function],
          "_values": {
            "display": "table-row",
            "vertical-align": "inherit",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "vertical-align",
          "2": "visibility",
          "_importants": {
            "display": "",
            "vertical-align": "",
            "visibility": undefined,
          },
          "_length": 3,
          "_onChange": [Function],
          "_values": {
            "display": "table-cell",
            "vertical-align": "inherit",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "visibility",
          "_importants": {
            "display": "",
            "visibility": undefined,
          },
          "_length": 2,
          "_onChange": [Function],
          "_values": {
            "display": "block",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "visibility",
          "_importants": {
            "display": "",
            "visibility": undefined,
          },
          "_length": 2,
          "_onChange": [Function],
          "_values": {
            "display": "block",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "vertical-align",
          "2": "visibility",
          "_importants": {
            "display": "",
            "vertical-align": "",
            "visibility": undefined,
          },
          "_length": 3,
          "_onChange": [Function],
          "_values": {
            "display": "table-cell",
            "vertical-align": "inherit",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "vertical-align",
          "2": "visibility",
          "_importants": {
            "display": "",
            "vertical-align": "",
            "visibility": undefined,
          },
          "_length": 3,
          "_onChange": [Function],
          "_values": {
            "display": "table-cell",
            "vertical-align": "inherit",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "vertical-align",
          "2": "visibility",
          "_importants": {
            "border-color": "",
            "display": "",
            "vertical-align": "",
            "visibility": undefined,
          },
          "_length": 3,
          "_onChange": [Function],
          "_values": {
            "display": "table-row",
            "vertical-align": "inherit",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "vertical-align",
          "2": "visibility",
          "_importants": {
            "display": "",
            "vertical-align": "",
            "visibility": undefined,
          },
          "_length": 3,
          "_onChange": [Function],
          "_values": {
            "display": "table-cell",
            "vertical-align": "inherit",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "visibility",
          "_importants": {
            "display": "",
            "visibility": undefined,
          },
          "_length": 2,
          "_onChange": [Function],
          "_values": {
            "display": "block",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "visibility",
          "_importants": {
            "display": "",
            "visibility": undefined,
          },
          "_length": 2,
          "_onChange": [Function],
          "_values": {
            "display": "block",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "vertical-align",
          "2": "visibility",
          "_importants": {
            "display": "",
            "vertical-align": "",
            "visibility": undefined,
          },
          "_length": 3,
          "_onChange": [Function],
          "_values": {
            "display": "table-cell",
            "vertical-align": "inherit",
            "visibility": "visible",
          },
        },
        CSSStyleDeclaration {
          "0": "display",
          "1": "vertical-align",
          "2": "visibility",
          "_importants": {
            "display": "",
            "vertical-align": "",
            "visibility": undefined,
          },
          "_length": 3,
          "_onChange": [Function],
          "_values": {
            "display": "table-cell",
            "vertical-align": "inherit",
            "visibility": "visible",
          },
        },
      ]
    `);
  });
});
