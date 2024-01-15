import InputGroup from "@src/components/InputGroup";
import InputInteger from "@src/components/InputInteger";
import Select from "@src/components/Select";
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
  title: "InputGroup",
};

export default meta;
