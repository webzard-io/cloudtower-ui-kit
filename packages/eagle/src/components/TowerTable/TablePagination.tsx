import React, { useContext } from "react";

import { kitContext } from "../../spec";

const TablePagination = (props: {
  count?: number;
  skip: number;
  size: number;
  onSizeChange?: ((size: number) => void) | undefined;
  onChange: (page: number) => void;
}) => {
  const { count, skip, size, onSizeChange, onChange } = props;
  const kit = useContext(kitContext);

  return (
    <kit.pagination
      current={(skip || 0) / size + 1}
      count={count || 0}
      size={size}
      onChange={onChange}
      onSizeChange={onSizeChange}
    />
  );
};

export default TablePagination;
