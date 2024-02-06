import React, { useEffect, useState } from "react";

import { ICountingProps } from "./counting.type";

const Counting: React.FC<ICountingProps> = (props) => {
  const { stop, interval = 1000, render } = props;
  const [, setState] = useState(true);

  useEffect(() => {
    if (stop) return;
    const timer = setInterval(() => {
      setState((state) => !state);
    }, interval);
    return () => {
      clearInterval(timer);
    };
  }, [stop, interval]);

  return <>{render()}</>;
};

export default Counting;

export * from "./counting.type";
