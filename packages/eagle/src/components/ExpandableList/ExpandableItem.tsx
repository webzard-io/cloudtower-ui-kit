import { css } from "@linaria/core";
import { Collapse } from "antd";
import classNames from "classnames";
import React, { PropsWithChildren, useMemo, useState } from "react";

import ExpandIcon from "./ExpandIcon";
import RoundedOrder from "./RoundOrder";

const CollapseStyle = css`
  .ant-collapse-item {
    border: 0px;
    background-color: $fills-light-white;

    .ant-collapse-header {
      padding-top: 0px;
      padding-bottom: 0px;
      padding-left: 0px !important;
      padding-right: 24px;
      .ant-collapse-arrow {
        right: 0px;
      }
    }
    .ant-collapse-content {
      .ant-collapse-content-box {
        padding: 0px;
      }
    }
  }
`;

const CollapseDisabled = css`
  .ant-collapse-item {
    .ant-collapse-header {
      padding-right: 0px;
      cursor: default;
    }
  }
`;

interface IProps {
  header?: React.ReactNode;
  order?: number;
  disableExpand?: boolean;
  defaultActive?: boolean;
}

const ExpandableItem = (props: PropsWithChildren<IProps>) => {
  const {
    children,
    disableExpand = false,
    defaultActive = false,
    header,
    order,
  } = props;

  const showExpandOnDisable = useMemo(() => {
    return disableExpand && defaultActive;
  }, [defaultActive, disableExpand]);

  const [activeKey, setActiveKey] = useState<string[] | string>(
    showExpandOnDisable ? ["expandPanelKey"] : [],
  );

  return (
    <Collapse
      className={classNames(CollapseStyle, {
        [CollapseDisabled]: disableExpand,
      })}
      expandIcon={ExpandIcon}
      expandIconPosition="right"
      defaultActiveKey={showExpandOnDisable ? ["expandPanelKey"] : []}
      bordered={false}
      activeKey={activeKey}
      onChange={(v) => {
        if (disableExpand) {
          return;
        }
        setActiveKey(v);
      }}
    >
      <Collapse.Panel
        key={"expandPanelKey"}
        header={<RoundedOrder order={order}>{header}</RoundedOrder>}
        showArrow={!disableExpand}
      >
        {children}
      </Collapse.Panel>
    </Collapse>
  );
};

export default ExpandableItem;
