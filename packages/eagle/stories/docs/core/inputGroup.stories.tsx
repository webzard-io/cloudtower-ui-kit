import InputGroup from "@src/core/InputGroup";
import InputInteger from "@src/core/InputInteger";
import Select from "@src/core/Select";
import React from "react";

export const Simple = () => {
  return (
    <InputGroup compact={true}>
      <InputInteger />
      <Select input={{}} />
      <InputInteger />
      <Select input={{}} />
    </InputGroup>
  );
};

const meta = {
  title: "Core/InputGroup",
};

export default meta;
