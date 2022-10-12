import { css } from "@linaria/core";

const test = css`
  color: blue;
`;

const TestBase = () => {
  return <div className={test}>TestBase</div>;
};

export default TestBase;
