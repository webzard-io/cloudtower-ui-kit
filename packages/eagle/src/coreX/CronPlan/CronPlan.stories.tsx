import { Meta } from "@storybook/react";
import dayjs from "dayjs";
import React, { useState } from "react";

import Button from "../../components/Button";
import { CronPlanProps, CronPlanState } from "../../spec";
import { Stack } from "../../../stories/components";
import { makeUUID } from "../../utils";
import CronPlan from ".";

const story: Meta<React.FC<CronPlanProps>> = {
  title: "CronPlan",
  component: CronPlan,
};

export default story;
type Plan = CronPlanState & { id: string };

export const Basic = () => {
  const [plans, setPlans] = useState<Plan[]>([]);

  return (
    <Stack direction="vertical">
      {plans.map((plan, i) => {
        return (
          <CronPlan
            key={plan.id}
            value={{
              enabled: plan.enabled,
              expression: plan.expression || "",
              retain: plan.retain,
              startAt: plan.startAt,
              empty: false,
            }}
            onChange={(newValue) => {
              setPlans((prev) => {
                const newPlans = [...prev];
                const newPlan = {
                  enabled: newValue.enabled,
                  empty: newValue.empty,
                  expression: newValue.expression,
                  retain: newValue.retain,
                  startAt: dayjs(newValue.startAt.toISOString()),
                  id: plan.id,
                };
                newPlans[i] = newPlan;
                return newPlans;
              });
            }}
            onRemove={() => {
              setPlans((prev) => {
                const newPlans = [...prev];
                newPlans.splice(i, 1);
                return newPlans;
              });
            }}
          />
        );
      })}
      <div>
        <Button
          onClick={() => {
            const newPlans = [
              ...plans,
              {
                id: makeUUID(),
                enabled: true,
                expression: "@x-every-n-day(0,0,1)",
                retain: 30,
                startAt: dayjs(new Date().toISOString()),
                empty: false,
              },
            ];
            setPlans(newPlans);
          }}
        >
          添加计划
        </Button>
      </div>
    </Stack>
  );
};

Basic.args = {};
