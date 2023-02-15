import React from "react";

import Pagination from "../Pagination";

const TablePagination = (props: {
  count?: number;
  skip: number;
  size: number;
  onSizeChange?: ((size: number) => void) | undefined;
  onChange: (page: number) => void;
}) => {
  const { count, skip, size, onSizeChange, onChange } = props;

  return (
    <Pagination
      current={(skip || 0) / size + 1}
      count={count || 0}
      size={size}
      onChange={onChange}
      onSizeChange={onSizeChange}
    />
  );
};

export default TablePagination;
