import "antd/dist/antd.css";
import "@cloudtower/eagle/kit/smartx/style.css";
import "@cloudtower/eagle/styles/reset.css";
import "@cloudtower/eagle/styles/fonts/font.css";
import "@cloudtower/eagle/styles/override.scss";

import { IMetricsQuery, Metric, TowerTable } from "@cloudtower/eagle";
import { MetricUnit } from "@cloudtower/eagle/generated/react-hooks";
import {
  antdKit,
  CustomizeColumnType,
  Icon,
} from "@cloudtower/eagle/kit/smartx";
import { kitContext } from "@cloudtower/eagle/kit/specify";
import { initParrotI18n } from "@cloudtower/parrot";
import { Button } from "antd";
import React from "react";

import sample_streams from "./sample_streams";

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

const metricArgs = {
  metric: "test",
  formatLegendItemName: () => {
    return "hello legend";
  },
  getDeselectedValueWithSuffix: () => {
    return "hello suffix";
  },
  chartData: {
    metrics: {
      dropped: false,
      step: 1,
      unit: MetricUnit.Count,
    },
  },
  topkData: {
    metrics: {
      dropped: false,
      step: 1,
      unit: MetricUnit.Count,
    },
  },
  getColorsByMetric: () => {
    return "#ABCABC";
  },
  metricColors: ["#ABCABC"],
  metricType: "hellometricType",
  step: 1,
  deselectedIndex: [1],
  topk: 0,
  bottomk: 1,
};

const chartData: IMetricsQuery = {
  metrics: {
    sample_streams: sample_streams,
    samples: null,
    unit: MetricUnit.DataSize,
    step: 30000,
    dropped: false,
    __typename: "Metric",
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
        <Metric
          {...metricArgs}
          metricLegendData={[{ id: "1" }, { id: "2" }]}
          chartData={chartData}
        />
      </div>
    </kitContext.Provider>
  );
}

export default App;
