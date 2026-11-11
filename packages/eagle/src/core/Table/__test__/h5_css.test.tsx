import { render } from "@testing-library/react";
import React, { PropsWithChildren } from "react";
import { describe, it } from "vitest";

import KitStoreProvider from "../../KitStoreProvider";
import ModalStack from "../../ModalStack";
import Table from "..";
import { RequiredColumnProps } from "../table.type";

const AllTheProviders = ({ children }: PropsWithChildren<{}>) => {
  return (
    <KitStoreProvider>
      <ModalStack />
      {children}
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
  return <Table<DataType> dataSource={data} columns={columns} />;
};

describe("Table h5_css", () => {
  it("image", async () => {});

  it.concurrent("h5_css", ({ expect }) => {
    const { container } = render(<Component />, {
      wrapper: AllTheProviders,
    });

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <div
          class=
        height: 100%;
      ,table-container,no-scroll-bar
        >
          <div
            class=ant-table-wrapper,
        height: 100%;

        .ant-table.ant-table-small .ant-table-tbody > tr > td {
          padding-top: 6px;
          padding-bottom: 6px;
        }

        .active-row td:nth-child(1) {
          font-weight: 700;
        }
        &.has-selection .active-row td:nth-child(2) {
          font-weight: 700;
        }

        .ant-spin-nested-loading {
          height: 100%;

          .ant-spin-container {
            height: 100%;
            overflow: visible;
          }
          .ant-spin {
            max-height: none;
          }
        }

        td.ant-table-column-sort {
          background: transparent;
        }

        td.ant-table-cell-fix-left,
        td.ant-table-cell-fix-right {
          background: var(--fill-neutral-white);
          padding: 0 !important;
          .ant-table-cell-content {
            display: flex;
            align-items: center;
            height: 100%;
            padding: 8px;
            > span {
              overflow: hidden;
              text-overflow: ellipsis;
              width: 100%;
            }
          }
        }

        .ant-table-container {
          height: 100%;
          &::before,
          &::after {
            box-shadow: none !important;
          }
        }

        div.ant-table {
          $columnAlignRightPaddingRight: 25px;
          border-radius: 0px;
          border-left: none;
          border-right: none;
          border-bottom: none;
          height: 100%;
          font-size: 12px;
          background: transparent;

          .ant-table-header {
            position: relative;
            z-index: $table-header-index;
            border-bottom: 1px solid var(--stroke-neutral-trans-2);
            margin-bottom: -1px;
          }

          .time-wrapper .date,
          .value {
            color: var(--gray-gray-80);
          }

          .time-wrapper .time,
          .unit {
            color: var(--text-neutral-tertiary);
          }

          .ant-table-selection {
            position: unset;
            text-align: center;
          }

          .ant-table-tbody > tr.ant-table-row-selected td {
            background: var(--fill-neutral-white);
          }

          .anticon-setting {
            cursor: pointer;
            position: absolute;
            top: 50%;
            right: 12px;
            transform: translateY(-50%);
          }

          &.ant-table-ping-left {
            .ant-table-cell-fix-left-last::after {
              box-shadow: none;
              width: 1px;
              background: rgba(213, 219, 227, 0.6);
            }
          }

          &.ant-table-ping-right {
            .ant-table-cell-fix-right-first::after {
              box-shadow: none;
              width: 1px;
              background: rgba(213, 219, 227, 0.6);
            }
          }

          .ant-table-tbody {
            position: relative;
            .ant-table-row {
              td {
                border-top: 1px solid var(--stroke-neutral-trans-2);
                border-bottom: 1px solid var(--stroke-neutral-white);
                height: 40px;
                vertical-align: middle;
                transition: background 0ms;
                color: var(--text-neutral-primary);

                &.header-hover {
                  background: var(--fill-neutral-opaque-1);
                  border-bottom-color: var(--fill-neutral-opaque-1);
                }

                .ant-btn.ant-btn-link {
                  height: auto;
                  color: var(--text-neutral-primary);
                  font-size: 12px;
                  text-align: left;
                  transition: none;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;

                  &:hover {
                    color: #0096ff;
                  }

                  > span {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    width: 100%;
                    vertical-align: middle;
                  }
                }

                &.cell_status {
                  line-height: 0px;
                }
                &.align-right {
                  padding-right: $columnAlignRightPaddingRight;
                }
              }

              &:hover {
                & + tr td {
                  border-top-color: transparent;
                }
                td {
                  background: var(--fill-neutral-trans-2);
                  border-color: transparent transparent var(--stroke-neutral-white);

                  &:first-child {
                    border-radius: 8px 0 0 8px;
                    .ant-table-cell-content {
                      border-radius: 8px 0 0 8px;
                    }
                    &::before {
                      content: "";
                      width: 4px;
                      top: -1px;
                      bottom: -1px;
                      background: var(--fill-neutral-white);
                    }
                  }
                  &:last-child {
                    border-radius: 0 8px 8px 0;
                  }
                  &:last-child.cell__action_ {
                    border-radius: 0;
                    background: var(--fill-neutral-white);
                    border-top: none;

                    > * {
                      border-top: 1px solid transparent;
                      border-radius: 0 8px 8px 0;
                      background: var(--fill-neutral-trans-2);
                    }
                  }
                  &.ant-table-cell-fix-right {
                    background: var(--fill-neutral-white);
                    border-top: 1px solid var(--stroke-neutral-trans-2);
                    .ant-table-cell-content {
                      display: flex;
                      align-items: center;
                      height: 100%;
                      background: var(--fill-neutral-trans-2);
                    }
                  }

                  &.ant-table-cell-fix-left {
                    background: var(--fill-neutral-white);
                    border-top: 1px solid var(--stroke-neutral-trans-2);
                    .ant-table-cell-content {
                      display: flex;
                      align-items: center;
                      height: 100%;
                      background: var(--fill-neutral-trans-2);
                    }
                  }
                }
              }

              &:last-child td {
                border-bottom: 1px solid var(--stroke-neutral-trans-2);
              }

              &.active-row {
                box-shadow: inset 0px 0px 0 2px rgba(0, 136, 255, 0.1);
                border-radius: 8px;

                & + tr td {
                  border-top-color: var(--stroke-neutral-white);
                }
                td {
                  background: rgba(0, 136, 255, 0.1);
                  border-bottom-color: transparent;
                  border-top-color: transparent;

                  &:first-child {
                    border-radius: 8px 0 0 8px;
                  }
                  &:last-child {
                    border-radius: 0 8px 8px 0;
                  }
                  &:hover {
                    background: rgba(0, 136, 255, 0.1);
                  }
                }
              }
            }
          }

          .ant-table-thead {
            > tr > th {
              background: var(--fill-neutral-white);
              font-weight: 400;
              position: relative;
              border-bottom: none;
              color: var(--text-neutral-primary);
              transition: none;
              padding: 14px 8px 14px 8px;
              line-height: 20px;

              &:not(:last-child):after {
                content: "";
                width: 1px;
                top: 0;
                bottom: 0;
                background: var(--stroke-neutral-trans-2);
                position: absolute;
                right: 0;
              }

              &.is-blank {
                padding: unset;

                &:after {
                  display: none;
                }
              }

              &.ant-table-cell-ellipsis.ant-table-column-has-sorters
                .ant-table-column-sorters {
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                > span {
                  overflow: hidden;
                  text-overflow: ellipsis;
                  flex: 1;
                }
              }

              &.ant-table-column-has-sorters {
                padding: 15px $columnAlignRightPaddingRight 15px 8px;

                .ant-table-column-sorters {
                  padding: 0;
                  .order-icon {
                    position: absolute;
                    right: 6px;
                    top: 50%;
                    transform: translateY(-50%);
                    height: 16px;
                    display: none;
                    transition: transform 320ms ease;

                    &.descend {
                      display: block;
                      transform: translateY(-50%) rotateX(180deg);
                    }
                    &.ascend {
                      display: block;
                    }
                  }
                }
                .ant-table-column-sorter {
                  display: none;
                }
              }

              &:active {
                .ant-table-column-sorters .order-icon {
                  &.descend {
                    transform: translateY(-50%);
                  }
                  &.ascend {
                    transform: translateY(-50%) rotateX(180deg);
                  }
                }
              }

              &:hover:not(.is-blank) {
                background: var(--fill-neutral-opaque-1);
                .ant-table-column-sorters .order-icon {
                  display: block;
                }
              }
              &.align-right {
                padding-right: $columnAlignRightPaddingRight;
              }
            }
          }

          .ant-table-selection-column {
            padding: 0 !important;

            .ant-checkbox-wrapper {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              .ant-checkbox {   height: 22px;   display: flex;   align-items: center;   top: 0; } .ant-checkbox-checked::after {   border: none; } &.ant-checkbox-wrapper:hover .ant-checkbox-inner, &.ant-checkbox-wrapper.__pseudo-states-hover .ant-checkbox-inner, .ant-checkbox:hover .ant-checkbox-inner {   border-color: var(--fill-outstanding-base); } .ant-checkbox .ant-checkbox-inner {   border: 1px solid var(--stroke-neutral-trans-4); } .ant-checkbox.ant-checkbox-checked, .ant-checkbox.ant-checkbox-indeterminate {   .ant-checkbox-inner {     border: 1px solid var(--fill-outstanding-base);   } } .ant-checkbox.ant-checkbox-indeterminate .ant-checkbox-inner {   background: var(--fill-outstanding-base);   &:after {     background-color: var(--fill-neutral-white);     height: 2px;     width: 10px;     border-radius: 2px;   } } &.ant-checkbox-wrapper-disabled {   opacity: 0.5;   .ant-checkbox-disabled .ant-checkbox-inner {     background: var(--fill-neutral-trans-3);     border-color: var(--stroke-neutral-trans-4) !important;   }   .ant-checkbox-disabled.ant-checkbox-checked .ant-checkbox-inner:after {     border-color: var(--gray-gray-80);   }   .ant-checkbox-disabled.ant-checkbox-indeterminate     .ant-checkbox-inner:after {     background: var(--gray-gray-80);   } } .ant-checkbox + span, .ant-checkbox-disabled + span {   padding: 0;   .main {     display: inline-block;     margin-left: 12px;     color: var(--gray-gray-80);   }   .sub {     margin-left: 28px;     color: var(--text-neutral-tertiary);   } } &.compact {   .ant-checkbox + span,   .ant-checkbox-disabled + span {     .main {       margin-left: 8px;     }     .sub {       margin-left: 24px;     }   } }
            }
            &:after {
              display: none;
            }
          }

          .ant-table-hide-scrollbar {
            background: var(--fill-neutral-white);
          }
          .ant-table-placeholder {
            background: inherit;

            td {
              position: static;
              border: none;
              background: inherit !important;
              height: 100px;
              vertical-align: middle;
            }

            .table-default-empty,
            .ant-table-expanded-row-fixed {
              font-weight: bold;
              font-size: 20px;
              color: var(--gray-gray-a60-7);
            }
          }
          th.ant-table-cell-scrollbar,
          th.cell__action_ {
            z-index: 10;
          }
          td.cell__action_ {
            padding: 0 !important;
            position: relative;
            background: var(--fill-neutral-white);
            > * {
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: flex-end;
              padding-right: 8px;
            }
            .menu-button {
              width: 24px;
              height: 24px;
              cursor: pointer;
              justify-content: center;
              border-radius: 4px;

              &:hover {
                background: var(--fill-neutral-white);
              }
            }
          }
        }

          >
            <div
              class=ant-spin-nested-loading
            >
              <div
                class=ant-spin-container
              >
                <div
                  class=ant-table,ant-table-small,ant-table-layout-fixed
                >
                  <div
                    class=ant-table-container
                  >
                    <div
                      class=ant-table-content
                    >
                      <table
                        style=table-layout:,fixed;
                      >
                        <colgroup />
                        <thead
                          class=ant-table-thead
                        >
                          <tr>
                            <th
                              class=ant-table-cell
                            >
                              Name
                            </th>
                            <th
                              class=ant-table-cell
                            >
                              Age
                            </th>
                            <th
                              class=ant-table-cell
                            >
                              Address
                            </th>
                          </tr>
                        </thead>
                        <tbody
                          class=ant-table-tbody
                        >
                          <tr
                            class=ant-table-row,ant-table-row-level-0
                            data-row-key=1
                          >
                            <td
                              class=ant-table-cell
                            >
                              <div>
                                <p>
                                  John Brown
                                </p>
                              </div>
                            </td>
                            <td
                              class=ant-table-cell
                            >
                              32
                            </td>
                            <td
                              class=ant-table-cell
                            >
                              New York No. 1 Lake Park
                            </td>
                          </tr>
                          <tr
                            class=ant-table-row,ant-table-row-level-0
                            data-row-key=2
                          >
                            <td
                              class=ant-table-cell
                            >
                              <div>
                                <p>
                                  Jim Green
                                </p>
                              </div>
                            </td>
                            <td
                              class=ant-table-cell
                            >
                              42
                            </td>
                            <td
                              class=ant-table-cell
                            >
                              London No. 1 Lake Park
                            </td>
                          </tr>
                          <tr
                            class=ant-table-row,ant-table-row-level-0
                            data-row-key=3
                          >
                            <td
                              class=ant-table-cell
                            >
                              <div>
                                <p>
                                  Joe Black
                                </p>
                              </div>
                            </td>
                            <td
                              class=ant-table-cell
                            >
                              32
                            </td>
                            <td
                              class=ant-table-cell
                            >
                              Sydney No. 1 Lake Park
                            </td>
                          </tr>
                          <tr
                            class=ant-table-row,ant-table-row-level-0
                            data-row-key=4
                          >
                            <td
                              class=ant-table-cell
                            >
                              <div>
                                <p>
                                  Disabled User
                                </p>
                              </div>
                            </td>
                            <td
                              class=ant-table-cell
                            >
                              99
                            </td>
                            <td
                              class=ant-table-cell
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
});
