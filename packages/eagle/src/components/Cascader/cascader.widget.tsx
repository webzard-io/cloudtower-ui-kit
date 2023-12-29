import Link from "@src/components/Link";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import { Flex } from "antd5";
import cls from "classnames";
import React, { useState } from "react";

import SearchInput from "../SearchInput";
import {
  CascaderDefaultHeaderContainer,
  CascaderDefaultHeader,
  CascaderDefaultHeaderSearch,
  CascaderNotData,
  DoubleRowOptionStyleWrapper,
  CascaderDefaultOptionLabel,
} from "./cascader.style";
import { PresetCascaderRenderProps } from "./cascader.type";

export const NotDataContent: React.FC<{
  content: React.ReactNode | string;
}> = ({ content }) => {
  return <div className={cls(CascaderNotData)}>{content}</div>;
};

export const PresetCascaderHeader: React.FC<
  PresetCascaderRenderProps["presetHeaderProps"]
> = ({ defaultContent, searchProps }) => {
  const { t } = useParrotTranslation();
  const [selectedAll, setSelectedAll] = useState(false);
  const onClick: React.MouseEventHandler<HTMLElement> = (e) => {
    setSelectedAll(!selectedAll);
    defaultContent?.onClickAll?.(selectedAll);
  };
  return (
    <Flex vertical className={CascaderDefaultHeaderContainer}>
      {searchProps ? (
        <SearchInput
          {...searchProps}
          className={cls(searchProps.className, CascaderDefaultHeaderSearch)}
          style={{
            width: "unset",
          }}
        />
      ) : (
        <></>
      )}
      {defaultContent?.hide ? (
        <></>
      ) : (
        <div className={cls(CascaderDefaultHeader)}>
          {defaultContent?.label}
          <Link size="small" onClick={onClick}>
            {selectedAll
              ? t("components.unselect_all")
              : t("components.select_all")}
          </Link>
        </div>
      )}
    </Flex>
  );
};

export const PresetCascaderRender: React.FC<PresetCascaderRenderProps> = ({
  menus,
  header,
  footer,
  presetHeaderProps,
}) => {
  return (
    <div>
      {header ? header : <PresetCascaderHeader {...presetHeaderProps} />}
      {menus}
      {footer}
    </div>
  );
};

export const CascaderDoubleRowOption: React.FC<{
  leftTop?: React.ReactNode;
  leftBottom?: React.ReactNode;
  rightTop?: React.ReactNode;
  rightBottom?: React.ReactNode;
}> = ({ leftTop, leftBottom, rightTop, rightBottom }) => {
  return (
    <Flex vertical className={DoubleRowOptionStyleWrapper} gap={6}>
      <Flex justify="space-between">
        <div>{leftTop}</div>
        <div>{rightTop}</div>
      </Flex>
      <Flex justify="space-between">
        <div>{leftBottom}</div>
        <div>{rightBottom}</div>
      </Flex>
    </Flex>
  );
};

export const CascaderOptionWithCount: React.FC<{
  label?: React.ReactNode;
  count?: {
    selected: number;
    total: number;
  };
}> = ({ label, count }) => {
  return (
    <div className={CascaderDefaultOptionLabel}>
      {label}
      {count ? (
        <span className="label">
          ({count.selected}/{count.total})
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};
