import Time from "@src/core/Time";
import React from "react";
export const Simple = () => {
  return <Time date={new Date("2023-10-1")} />;
};

const meta = {
  title: "Time",
};

export default meta;
