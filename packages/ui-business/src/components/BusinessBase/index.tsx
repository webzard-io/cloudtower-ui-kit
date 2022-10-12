import { TestBase } from "@cloudtower/ui-kit";

interface IProps {}

const BusinessBase = () => {
  return (
    <div>
      <TestBase />
      <TestBase />
    </div>
  );
};

export default BusinessBase;

export type { IProps as IBusinessBaseProps };
