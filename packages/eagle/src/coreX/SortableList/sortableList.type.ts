import { Draggable } from "react-beautiful-dnd";

export type SortableListComponentType = React.FC<{
  moveItem: (from: number, to: number) => void;
}> & { Item: typeof Draggable };
