import Button from "@src/core/Button";
import Card from "@src/core/Card";
import { ConfigProvider } from "@src/core/ConfigProvider";
import Token from "@src/core/Token";
import { Alert, Form, Input, Select } from "antd";
import { ConfigProvider as Ant5Provider, Input as Ant5Input } from "antd5";
import React from "react";

const meta = { title: "Regression/ComputedStyle" };
export default meta;

// Fixed data and stable identifiers keep the baseline independent of Linaria hashes.
export const Baseline = () => (
  <ConfigProvider>
    <div data-style-root>
      {(["primary", "secondary", "tertiary", "ordinary", "quiet"] as const).map(
        (type) => (
          <section key={type} data-style-id={type}>
            <Button type={type}>保存</Button>
            <Button type={type} danger>
              删除
            </Button>
            <Button type={type} disabled>
              不可用
            </Button>
          </section>
        )
      )}
      <section data-style-id="form">
        <Input placeholder="资源名称" />
        <Input disabled value="禁用资源" />
        <Form.Item validateStatus="error" help="名称无效">
          <Input value="错误资源" readOnly />
        </Form.Item>
      </section>
      <section data-style-id="select">
        <Select
          defaultValue="a"
          style={{ width: 240 }}
          options={[
            { value: "a", label: "资源 A" },
            { value: "b", label: "资源 B", disabled: true },
          ]}
        />
      </section>
      <section data-style-id="alerts">
        {(["success", "warning", "error", "info"] as const).map((type) => (
          <Alert key={type} type={type} message="资源状态" showIcon />
        ))}
      </section>
      <section data-style-id="tokens">
        {(["blue", "red", "yellow", "green", "purple"] as const).map(
          (color) => (
            <Token key={color} color={color}>
              资源标签
            </Token>
          )
        )}
      </section>
      <section data-style-id="card">
        <Card>资源内容</Card>
      </section>
      <Ant5Provider prefixCls="antd5">
        <section data-style-id="ant5">
          <Ant5Input placeholder="资源名称" />
          <Ant5Input status="error" value="错误资源" readOnly />
          <Ant5Input disabled />
        </section>
      </Ant5Provider>
    </div>
  </ConfigProvider>
);
