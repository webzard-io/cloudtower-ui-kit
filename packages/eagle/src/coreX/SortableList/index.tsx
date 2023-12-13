import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";

import { SortableListComponentType } from "../../spec";

const SortableList: SortableListComponentType = ({ moveItem, children }) => {
  const onDragEnd: OnDragEndResponder = (result) => {
    // dropped outside the list
    if (!result.destination) return;
    moveItem(result.source.index, result.destination.index);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {children}
            {/* TODO: try to add custom placeholder, which rbd not support now */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

SortableList.Item = Draggable;

export default SortableList;
