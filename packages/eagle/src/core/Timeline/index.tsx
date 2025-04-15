import {
  CheckmarkDoneSuccessCorrect16GreenIcon,
  Loading16GradientBlueIcon,
  NoticeTriangleFill16YellowIcon,
  TimelineNotStart16GrayIcon,
  WaitingBreathingLed16YellowIcon,
  XmarkFailed16RedIcon,
} from "@cloudtower/icons-react";
import { cx } from "@linaria/core";
import Alert, { AlertProps } from "@src/core/Alert";
import { SrcType } from "@src/core/BaseIcon";
import Icon from "@src/core/Icon";
import { Flex, Timeline as AntdTimeline } from "antd5";
import cs from "classnames";
import _ from "lodash";
import React, { ReactElement } from "react";

import {
  EmptyWrapper,
  TimelineItemWrapper,
  TimelineWrapper,
} from "./Timeline.style";
import { TimelineItemData, TimelineProps } from "./Timeline.type";
import { TimelineArea } from "./Timeline.widget";
/**
 * Timeline 组件：展示时间线
 *
 * @param props - 组件属性
 * @returns React 组件
 */
export const Timeline = ({
  items,
  emptyText,
  emptyRender,
  compact,
  emptyTextClassName,
}: TimelineProps): ReactElement => {
  if (!items.length) {
    if (emptyRender) {
      return <>{emptyRender(emptyText)}</>;
    }
    return (
      <div className={cx(EmptyWrapper, emptyTextClassName)}>{emptyText}</div>
    );
  }

  const iconMap: Record<TimelineItemData["status"], SrcType> = {
    success: CheckmarkDoneSuccessCorrect16GreenIcon,
    failed: XmarkFailed16RedIcon,
    progress: Loading16GradientBlueIcon,
    notice: NoticeTriangleFill16YellowIcon,
    pending: WaitingBreathingLed16YellowIcon,
    idle: TimelineNotStart16GrayIcon,
  };

  const alertTypeMap: Record<TimelineItemData["status"], AlertProps["type"]> = {
    success: "success",
    failed: "error",
    progress: "info",
    notice: "warning",
    pending: "info",
    idle: "normal",
  };

  return (
    <div className={cx(TimelineWrapper)}>
      <AntdTimeline>
        {items.map((item, index) => {
          const {
            status,
            infos,
            infosRender,
            infoAction,
            subInfo,
            subInfoRender,
            detailMessage,
            detailMessageRender,
          } = item;

          return (
            <AntdTimeline.Item
              key={`timeline-item-${index}`}
              className={cs(TimelineItemWrapper, { compact })}
              dot={
                <Icon
                  src={iconMap[status]}
                  iconHeight={16}
                  iconWidth={16}
                  isRotate={status === "progress"}
                />
              }
            >
              {infosRender ? (
                infosRender(infos)
              ) : (
                <Flex
                  vertical
                  justify="space-between"
                  gap={2}
                  className="info-wrapper"
                >
                  {infos.map((item, index) => (
                    <TimelineArea
                      gap={6}
                      key={`title-area-${index}`}
                      {...item}
                      compact={compact}
                      suffix={
                        !index && infoAction ? (
                          <span className="info-action">{infoAction}</span>
                        ) : undefined
                      }
                    />
                  ))}
                </Flex>
              )}
              <div className={"item-time"}>
                {subInfoRender ? (
                  subInfoRender(subInfo)
                ) : subInfo ? (
                  <TimelineArea {...subInfo} />
                ) : (
                  <></>
                )}

                {detailMessageRender ? (
                  detailMessageRender(detailMessage)
                ) : detailMessage ? (
                  <Alert
                    showIcon={false}
                    type={alertTypeMap[status]}
                    {...detailMessage!}
                  />
                ) : (
                  <></>
                )}
              </div>
            </AntdTimeline.Item>
          );
        })}
      </AntdTimeline>
    </div>
  );
};

export * from "./Timeline.type";
