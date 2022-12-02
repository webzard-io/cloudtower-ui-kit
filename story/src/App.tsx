import "antd/dist/antd.css";
import "@cloudtower/eagle/kit/smartx/style.css";
import "@cloudtower/eagle/styles/reset.css";
import "@cloudtower/eagle/styles/fonts/font.css";
import "@cloudtower/eagle/styles/override.scss";

import { TowerTable } from "@cloudtower/eagle";
import {
  antdKit,
  CustomizeColumnType,
  Icon,
} from "@cloudtower/eagle/kit/smartx";
import { kitContext } from "@cloudtower/eagle/kit/specify";
import { Button } from "antd";
import React, { useRef } from "react";

const args = {
  uniqueTableKey: "TestTowerTable",
  loading: false,
  dataSource: [
    {
      id: "1",
      h1: "hello",
      h2: "hello2",
    },
    {
      id: "2",
      h1: "hello",
      h2: "hello2",
    },
  ],
  pagination: {
    count: 4,
    skip: 0,
    size: 2,
    defaultSize: 10,
  },
  columns: [
    {
      title: "h1",
      key: "h1",
      index: 0,
      onHeaderCell: () => ({
        index: 0,
      }),
      dataIndex: "h1",
      sortable: true,
    },
    {
      title: "h2",
      key: "h2",
      index: 1,
      onHeaderCell: () => ({
        index: 1,
      }),
      dataIndex: "h2",
      sortable: true,
    },
  ],
  defaultCustomizeColumn: [
    "h1",
    () => {
      return [
        {
          key: "h1",
          width: 100,
          display: true,
        },
        {
          key: "h2",
          width: 100,
          display: true,
        },
      ];
    },
  ] as [string, () => CustomizeColumnType[]],
  refetch: async () => {
    return [];
  },
};

function App() {
  const wrapper = useRef<HTMLDivElement | null>(null);

  return (
    <kitContext.Provider value={antdKit}>
      <div className="App">
        <Icon type={"1-active-connection-16-gradiendt-blue"} />
        <antdKit.button loading={true} />
        <antdKit.button loading={true}>button</antdKit.button>
        <Button loading={true}>button</Button>
        <TowerTable {...args} wrapper={wrapper} />
      </div>
    </kitContext.Provider>
  );
}

export default App;
