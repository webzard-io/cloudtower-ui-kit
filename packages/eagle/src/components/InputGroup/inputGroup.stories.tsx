import React from "react";
import InputGroup from "./";
import InputInteger from "../InputInteger";
import Select from "../Select";

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
