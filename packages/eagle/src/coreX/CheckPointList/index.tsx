import {
  CheckmarkDoneSuccessCircleFill16GreenIcon,
  Loading16GradientBlueIcon,
  NoticeTriangleFill16YellowIcon,
  TimelineNotStart16GrayIcon,
  XmarkFailedSeriousWarningFill16RedIcon,
} from "@cloudtower/icons-react";
import { cx } from "@linaria/core";
import {
  Alert,
  Button,
  Icon,
  Link,
  SrcType,
  Switch,
  Tag,
  Typo,
} from "@src/core";
import { Show } from "@src/coreX";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import { Flex, List } from "antd5";
import React, { useCallback, useState } from "react";
import cs from "classnames";
import {
  CheckPointItemStyle,
  CheckPointListStyle,
  EmptyWrapper,
} from "./checkpointlist.style";
import {
  CheckPointItemProps,
  CheckPointListProps,
} from "./checkpointlist.type";

export const CheckPointItem: React.FC<CheckPointItemProps> = ({
  description,
  status,
  key,
  tagProps,
  alertProps,
  actions,
}) => {
  const icon: Record<CheckPointItemProps["status"], SrcType> = {
    failed: XmarkFailedSeriousWarningFill16RedIcon,
    success: CheckmarkDoneSuccessCircleFill16GreenIcon,
    loading: Loading16GradientBlueIcon,
    warning: NoticeTriangleFill16YellowIcon,
    idle: TimelineNotStart16GrayIcon,
  };

  return (
    <>
      <List.Item className={cx(CheckPointItemStyle)} key={key}>
        <Show condition={Boolean(icon)}>
          <Icon
            src={icon[status]}
            className="icon-wrapper"
            isRotate={status === "loading"}
          />
        </Show>
        <span className={cx(Typo.Label.l4_regular, "description")}>
          {description}
        </span>
        <Flex gap={8}>
          <Show condition={Boolean(actions?.length)}>
            {actions?.map((action) => {
              if (action.type === "button") {
                return <Button {...action.props} />;
              }
              if (action.type === "link") {
                return <Link {...action.props} />;
              }
              if (action.type === "icon") {
                return <Icon {...action.props} />;
              }
            })}
          </Show>
          <Show condition={Boolean(tagProps)}>
            <Tag {...tagProps} />
          </Show>
        </Flex>
      </List.Item>
      <Show condition={Boolean(alertProps)}>
        <Alert showIcon={false} {...alertProps!} />
      </Show>
    </>
  );
};

/**
 * CheckPointList displays a list of checkpoint items with filtering capability
 */
export const CheckPointList: React.FC<CheckPointListProps> = ({
  items = [],
  showSwitchControl = true,
  title,
  switchText,
  emptyRender,
  emptyText,
  emptyTextClassName,
  onClickSwitch,
  defaultChecked = false,
  className,
  border = true,
}) => {
  const { t } = useParrotTranslation();
  const [checked, setChecked] = useState(defaultChecked);

  const onClickSwitchFn = useCallback(() => {
    const nextChecked = !checked;
    setChecked(nextChecked);
    onClickSwitch?.(nextChecked);
  }, [onClickSwitch, checked]);

  const isEmpty = !items.length;

  return (
    <div
      className={cs(CheckPointListStyle, className, {
        border,
      })}
    >
      <header className={cx(Typo.Label.l4_bold)}>
        {title}
        <Show condition={showSwitchControl}>
          <span className="switch-text">
            <Switch checked={checked} onChange={onClickSwitchFn} size="small" />
            <span>{switchText || t("common.show_unpassed")}</span>
          </span>
        </Show>
      </header>
      <Show
        condition={isEmpty}
        fallback={
          <List split={false} bordered={false}>
            {items.map((item, index) => (
              <CheckPointItem {...item} key={`checklist-item-${index}`} />
            ))}
          </List>
        }
      >
        {emptyRender ? (
          emptyRender(emptyText)
        ) : (
          <div className={cx(EmptyWrapper, emptyTextClassName)}>
            {emptyText}
          </div>
        )}
      </Show>
    </div>
  );
};

export * from "./checkpointlist.type";
