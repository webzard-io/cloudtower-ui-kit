import { TestBase } from "@cloudtower/ui-kit";

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
