import Fields from "@src/components/Fields";
import Form from "@src/components/Form";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
const FormItemStories = (props: any) => {
  return (
    <div>
      <div style={{ width: "648px" }}>
        <h1>普通状态 648px</h1>
        <Form.Item label="IP 地址" labelCol={{ span: 6 }}>
          <Fields.String
            input={{
              name: "value",
              value: "192.168.1.1",
              onBlur: () => null,
              onChange: () => null,
              onFocus: () => null,
            }}
            meta={{}}
          />
        </Form.Item>
        <Form.Item label="IP 地址" labelCol={{ span: 8 }}>
          <Fields.String
            input={{
              name: "value",
              value: "192.168.1.1",
              onBlur: () => null,
              onChange: () => null,
              onFocus: () => null,
            }}
            meta={{}}
          />
        </Form.Item>
        <Form.Item label="IP 地址" labelCol={{ span: 12 }}>
          <Fields.String
            input={{
              name: "value",
              value: "192.168.1.1",
              onBlur: () => null,
              onChange: () => null,
              onFocus: () => null,
            }}
            meta={{}}
          />
        </Form.Item>
      </div>
      <div style={{ width: "324px" }}>
        <h1>普通状态 324px</h1>
        <Form.Item label="IP 地址" labelCol={{ span: 6 }}>
          <Fields.String
            input={{
              name: "value",
              value: "192.168.1.1",
              onBlur: () => null,
              onChange: () => null,
              onFocus: () => null,
            }}
            meta={{}}
          />
        </Form.Item>
        <Form.Item label="IP 地址" labelCol={{ span: 8 }}>
          <Fields.String
            input={{
              name: "value",
              value: "192.168.1.1",
              onBlur: () => null,
              onChange: () => null,
              onFocus: () => null,
            }}
            meta={{}}
          />
        </Form.Item>
        <Form.Item label="IP 地址" labelCol={{ span: 12 }}>
          <Fields.String
            input={{
              name: "value",
              value: "192.168.1.1",
              onBlur: () => null,
              onChange: () => null,
              onFocus: () => null,
            }}
            meta={{}}
          />
        </Form.Item>
      </div>
      <div style={{ width: "648px" }}>
        <h1>其他状态 648px</h1>
        <Form.Item
          label="IP 地址"
          labelCol={{ span: 8 }}
          help="普通的 IP 地址， 普通的 IP 地址， 普通的 IP 地址"
        >
          <Fields.String
            input={{
              name: "value",
              value: "192.168.1.1.1",
              onBlur: () => null,
              onChange: () => null,
              onFocus: () => null,
            }}
            meta={{}}
          />
        </Form.Item>
        <Form.Item
          label="IP 地址"
          labelCol={{ span: 8 }}
          help="IP 地址错误，请重新输入一个正确的 IP 地址"
          validateStatus={"error"}
        >
          <Fields.String
            input={{
              name: "value",
              value: "192.168.1.1.1",
              onBlur: () => null,
              onChange: () => null,
              onFocus: () => null,
            }}
            meta={{}}
          />
        </Form.Item>
      </div>
    </div>
  );
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "FormItem",
  component: FormItemStories,
} as ComponentMeta<typeof Form.Item>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FormItemStories> = (args) => {
  return <FormItemStories {...args} />;
};

export const Simple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Simple.args = {};
