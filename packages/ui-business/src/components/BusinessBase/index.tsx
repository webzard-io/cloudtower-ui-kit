import { TestBase } from "@cloudtower/sparrow";

interface IProps {
  color?: string;
}

const BusinessBase = (props: IProps) => {
  return (
    <div>
      <TestBase />
      <TestBase />
    </div>
  );
};

export default BusinessBase;

export type { IProps as IBusinessBaseProps };
