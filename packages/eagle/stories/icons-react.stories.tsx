import * as Icons from "@cloudtower/icons-react";
import { styled } from "@linaria/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Divider, message } from "antd";
import Copy from "copy-to-clipboard";
import _ from "lodash";
import React, { useCallback, useMemo, useState } from "react";

import Button from "@src//components/Button";
import Input from "@src/components/Input";

const IconWrapper = styled.div`
  border-radius: 0.75em;
  border: 1px solid #e5e7eb;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
`;

const Text = styled.span`
  font-size: 12px;
  word-break: break-all;
  width: 100px;
  display: block;
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  row-gap: 32px;
`;

const Wrapper = styled.div`
  margin: auto;
  height: 180px;
  position: relative;
  &:hover {
    .button-group {
      display: flex;
    }
  }
`;
const ButtonWrapper = styled.div`
  display: none;
  flex-direction: column;
  background: rgb(128 128 128 / 30%);
  position: absolute;
  top: 0px;
  height: 100px;
  width: 100px;
  justify-content: space-evenly;
  align-items: center;
  .ant-btn-sm {
    width: 80px;
    font-size: 12px;
  }
`;
const IconStories = (props: any) => {
  const [filter, setFilter] = useState<string>("");
  const filteredIcons = useMemo(() => {
    const keys = Object.keys(Icons).filter((k) =>
      k.toLocaleLowerCase().includes(filter.trim().toLocaleLowerCase()),
    );
    return _.pick(Icons, keys);
  }, [filter]);

  const onClickSVG = useCallback((e: React.MouseEvent) => {
    const group = (e.target as HTMLElement).closest(".button-group");
    if (group) {
      const svg = (group as HTMLElement).previousSibling;
      Copy((svg as SVGElement).outerHTML);
    }
    message.success("复制 SVG 成功！");
  }, []);

  const onClickEle = useCallback((k: string) => {
    Copy(`<${k}/>`);
    message.success("复制 React 组件成功！");
  }, []);

  return (
    <div>
      <Input onChange={(e) => setFilter(e.target.value)} />
      <Divider />
      <div></div>
      <Body>
        {Object.keys(filteredIcons).map((k) => {
          const I = _.get(filteredIcons, k);
          return (
            <Wrapper key={k}>
              <IconWrapper>
                <I />
                <ButtonWrapper className="button-group">
                  <Button onClick={(e) => onClickSVG(e)} size="small">
                    Copy SVG
                  </Button>
                  <Button onClick={() => onClickEle(k)} size="small">
                    Copy Ele
                  </Button>
                </ButtonWrapper>
              </IconWrapper>
              <Text>{k}</Text>
            </Wrapper>
          );
        })}
      </Body>
    </div>
  );
};
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "@cloudtower/react-icons",
  component: IconStories,
} as ComponentMeta<typeof IconStories>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof IconStories> = (args) => {
  return <IconStories {...args} />;
};

export const Simple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Simple.args = {};
