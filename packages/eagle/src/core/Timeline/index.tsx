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
 * 支持多种状态的时间线项目，包括成功、失败、进行中、通知、空闲等状态
 * 支持自定义渲染和详情信息展示，优先使用 detailMessages 而非 detailMessage
 * 支持使用 Area 组件灵活自定义辅助信息展示
 *
 * @param props - 组件属性
 * @returns React 组件
 */
export const Timeline = ({
  items,
  emptyText,
  emptyRender,
  compact,
  timelineContainerClassName,
  emptyTextClassName,
  "data-testid": dataTestId,
}: TimelineProps): ReactElement => {
  if (!items.length) {
    if (emptyRender) {
      return <>{emptyRender(emptyText)}</>;
    }
    return (
      <div
        data-testid={dataTestId}
        className={cx(EmptyWrapper, emptyTextClassName)}
      >
        {emptyText}
      </div>
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
    <div
      data-testid={dataTestId}
      className={cx(TimelineWrapper, timelineContainerClassName)}
    >
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
            detailMessages,
            detailMessageRender,
          } = item;

          const finalDetailMessages =
            detailMessages ?? (detailMessage ? [detailMessage] : []);

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
                {finalDetailMessages.length > 0 ? (
                  finalDetailMessages.map((detailMessage, index) =>
                    detailMessageRender ? (
                      detailMessageRender(detailMessage, index)
                    ) : (
                      <Alert
                        key={`detail-message-${index}`}
                        showIcon={false}
                        type={alertTypeMap[status]}
                        {...detailMessage!}
                      />
                    ),
                  )
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
