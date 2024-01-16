import "moment/locale/zh-cn";

import { css } from "@linaria/core";
import Button from "@src/core/Button";
import CronCalendar from "@src/coreX/CronCalendar";
import CronPlan from "@src/coreX/CronPlan";
import { CronCalendarProps, CronPlanState } from "@src/spec";
import { makeUUID } from "@src/utils";
import { Stack } from "@stories/components";
import type { Meta } from "@storybook/react";
import { ConfigProvider } from "antd";
import locale from "antd/es/locale/zh_CN";
import dayjs from "dayjs";
import { useState } from "react";
import React from "react";

const story: Meta<React.FC<CronCalendarProps>> = {
  title: "CoreX/CronCalendar",
  component: CronCalendar,
};

export default story;

type Plan = CronPlanState & { id: string };

export const Basic = () => {
  const [plans, setPlans] = useState<Plan[]>([]);

  const handleClick = () => {
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
  };

  return (
    <Stack>
      <Stack
        className={css`
          width: 648px;
        `}
        direction="vertical"
      >
        <p>
          {" "}
          <b>CronCalendar</b> 通常配合 <b>CronPlan</b>{" "}
          来使用，生成定时计划的日期预览，点击「添加计划」按钮添加定时计划来查看效果！
        </p>
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
          {plans.length === 0 ? (
            <div
              className={css`
                display: flex;
                align-items: center;
                justify-content: center;
                height: 300px;
              `}
            >
              <Button onClick={handleClick}>添加计划</Button>
            </div>
          ) : (
            <div>
              <Button onClick={handleClick}>添加计划</Button>
            </div>
          )}
        </Stack>
      </Stack>
      <ConfigProvider locale={locale}>
        <CronCalendar
          plans={plans
            .filter((p) => p.enabled && p.expression)
            .map((p) => ({
              expression: p.expression!,
              startAt: dayjs(p.startAt),
              empty: p.empty || false,
            }))}
        />
      </ConfigProvider>
    </Stack>
  );
};
