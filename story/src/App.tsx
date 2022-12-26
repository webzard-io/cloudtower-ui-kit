import "antd/dist/antd.css";
import "@cloudtower/eagle/dist/style.css";

import {
  GraphType,
  IChartProps,
  RenderChart,
  TowerTable,
} from "@cloudtower/eagle";
import { antdKit, CustomizeColumnType, Icon } from "@cloudtower/eagle";
import { kitContext } from "@cloudtower/eagle";
import { initParrotI18n } from "@cloudtower/parrot";
import { Button } from "antd";
import dayjs from "dayjs";
import React from "react";

import mockMetric from "./mockMetric";

initParrotI18n();

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

const renderChartArgs: IChartProps = {
  mode: "legend",
  showLegend: true,
  metricName: "hello",
  metric: mockMetric,
  uuid: "abc",
  height: 200,
  type: GraphType.Area,
  dateRange: [dayjs("2022-12-13 16:00"), dayjs("2022-12-13 18:00")],
  now: new Date("2022-12-13 18:00").getTime(),
  showXAxis: true,
  tooltipProps: {
    format: () => {
      return "hello tooltip";
    },
  },
};

function App() {
  return (
    <kitContext.Provider value={antdKit}>
      <div className="App">
        <Icon type={"1-active-connection-16-gradiendt-blue"} />
        <antdKit.button loading={true} />
        <antdKit.button loading={true}>button</antdKit.button>
        <Button loading={true}>button</Button>
        <TowerTable {...args} />
        <RenderChart {...renderChartArgs} />
      </div>
    </kitContext.Provider>
  );
}

export default App;
