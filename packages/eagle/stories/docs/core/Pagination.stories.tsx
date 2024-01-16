import Pagination from "@src/core/Pagination";
import { useState } from "react";
import React from "react";

const meta = {
  title: "Core/Pagination",
};

export default meta;

export const DefaultPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <Pagination
      current={currentPage}
      count={50}
      size={5}
      onChange={setCurrentPage}
    />
  );
};
