import SortableList from "@src/coreX/SortableList";
import { SortableListComponentType } from "@src/spec/base";
import { Container } from "@stories/components";
import type { Meta } from "@storybook/react";
import { useState } from "react";
import React from "react";

const meta: Meta<SortableListComponentType> = {
  title: "CoreX/SortableList",
  component: SortableList,
  parameters: {
    docs: {
      description: {
        component:
          "SortableList组件是一个可排序列表组件，它基于react-beautiful-dnd库实现了拖放功能。它的主要用途是允许用户通过拖动和重新排序项目来改变它们的顺序。",
      },
    },
  },
  argTypes: {},
};

export default meta;

export const Basic = () => {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);

  const moveItem = (from: number, to: number) => {
    const updatedItems = [...items];
    const [removed] = updatedItems.splice(from, 1);
    updatedItems.splice(to, 0, removed);
    setItems(updatedItems);
  };

  return (
    <div>
      <p>拖动某一项来进行重新排序</p>
      <Container>
        <SortableList moveItem={moveItem}>
          {items.map((item, index) => (
            <SortableList.Item
              key={index}
              draggableId={`item-${index}`}
              index={index}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {item}
                </div>
              )}
            </SortableList.Item>
          ))}
        </SortableList>
      </Container>
    </div>
  );
};
