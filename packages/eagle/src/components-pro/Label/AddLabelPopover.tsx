import React, { useState, useContext, useRef, useEffect } from "react";
import { kitContext } from "../../UIKitProvider";
import { cx, css } from "linaria";
import { kitContext as UIKitContext } from "@cloudtower/eagle";
import {
  useGetLabelsLazyQuery,
  GetLabelsQuery,
} from "@tower/codegen-component"; /** ../../generated/react-hooks */
import { getLabelText } from "@tower/utils";
import { useTranslation } from "react-i18next";
import Icon from "../../components/Icon";
import { Typo } from "../../components/Typo";
import { pushModal } from "../../store";
import AddLabelModal from "./AddLabelModal";
import LabelResources from "./LabelResources";
import useUpdateLabelResources from "./hooks/useUpdateLabelResources";

const TriggerStyle = css`
  padding: 0;
  width: 24px !important;
  height: 24px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  .icon-wrapper {
    margin-right: 0;
  }
`;

const CreateLabelBtnStyle = css`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  color: $text-light-primary;
`;

const AddLabelPopoverStyle = css`
  .ant-popover-arrow {
    display: none;
  }
  .ant-popover-inner {
    border-radius: 6px;
  }
  .ant-popover-inner-content {
    padding: 0;
  }

  .top {
    border-bottom: 1px solid $strokes-light-trans-2;

    .ant-input-affix-wrapper {
      border: none;
    }
  }

  .middle ul {
    margin-bottom: 0;
    padding: 4px;
    max-height: 138px;
    overflow-y: scroll;
    border-bottom: 1px solid $strokes-light-trans-2;
    > li {
      padding: 3px 12px;
      height: 24px;
      cursor: pointer;
      /* show in one line */
      white-space: nowrap;
      width: 20vw;
      min-width: 200px;
      &.ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &:not(.placeholder-item):hover {
        color: $text-light-general;
        background: $fills-interaction-light-outstanding-hover;
        border-radius: 4px;
      }
      &.placeholder-item {
        height: 1px;
        content: "";
      }
    }
  }
`;

export const PopoverLabel: React.FC<{
  labelText: string;
  item: Pick<GetLabelsQuery["labels"][0], "id">;
  onSelect: (id: string) => void;
}> = ({ labelText, item, onSelect }) => {
  const listRef = useRef<HTMLLIElement>(null);
  const widthRef = useRef<number>(0);
  const [ellipsis, setEllipsis] = useState(false);
  const parentWidthRef = useRef(0);

  useEffect(() => {
    const element = listRef.current;
    // store initial tag width before it is truncated
    if (!ellipsis && element) widthRef.current = element.scrollWidth;

    const parentElement = element?.parentElement;

    let observer: ResizeObserver;

    if (element && parentElement) {
      observer = new ResizeObserver((entries) => {
        if (entries.length === 1) {
          const parentWidth = entries[0].contentRect.width >> 0;
          if (parentWidth !== parentWidthRef.current) {
            setEllipsis(parentWidth <= widthRef.current);
            parentWidthRef.current = parentWidth;
          }
        }
      });
      observer.observe(parentElement);
    }

    return () => {
      observer?.disconnect();
    };
  }, [labelText, listRef]);
  return (
    <li
      key={labelText}
      ref={listRef}
      className={cx(Typo.Label.l4_regular, ellipsis ? "ellipsis" : undefined)}
      title={ellipsis ? labelText : undefined}
      onClick={() => {
        onSelect(item.id);
      }}
    >
      {labelText}
    </li>
  );
};

const AddLabelPopover: React.FC<{
  resourceIds: string[];
  resourceType: LabelResources;
  excludeLabelIds?: string[];
}> = (props) => {
  const { resourceIds, resourceType, excludeLabelIds = [], children } = props;
  const kit = useContext(kitContext);
  const UIKit = useContext(UIKitContext);
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [fetching, setFetching] = useState(false);
  const [trigger, { data, loading, fetchMore }] = useGetLabelsLazyQuery({
    variables: {
      first: 6,
      where: {
        OR: [{ key_contains: keyword }, { value_contains: keyword }],
        AND: [{ id_not_in: excludeLabelIds }],
      },
    },
    fetchPolicy: "cache-and-network",
  });

  const [update] = useUpdateLabelResources({
    resourceType,
  });

  const handleVisibleChange = (visible: boolean) => {
    visible ? setVisible(true) : closePopover();
  };

  const closePopover = () => {
    setVisible(false);
    setKeyword("");
  };

  const onSelect = (labelId: string) => {
    closePopover();
    update({
      labelId,
      resources: resourceIds.map((id) => ({ id })),
      isConnect: true,
    });
  };

  const canFetchMore = useRef(true);
  const setOfExcludeLabelIds = new Set(excludeLabelIds);

  useEffect(() => {
    trigger();
  }, []);

  return (
    <kit.popover
      overlayClassName={cx(AddLabelPopoverStyle, "add-label-popover")}
      content={
        <div>
          <div className="top">
            <UIKit.input
              prefix={<Icon type="1-search-16-secondary"></Icon>}
              placeholder={
                loading
                  ? t("common.current_loading_with_dot")
                  : t("label.search_label_to_connect")
              }
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            ></UIKit.input>
          </div>
          <div className="middle">
            <ul
              onScroll={(e) => {
                const el = e.currentTarget;
                if (
                  el.scrollHeight - el.offsetHeight - el.scrollTop <= 0 &&
                  !fetching
                ) {
                  setFetching(true);
                  void fetchMore({
                    variables: {
                      skip: data?.labels.length,
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      const length = fetchMoreResult?.labels.length || 0;
                      const first = 4;
                      setFetching(false);

                      if (!length || first > length) {
                        canFetchMore.current = false;
                      }
                      if (!length) return prev;
                      return {
                        ...fetchMoreResult,
                        labels: [...prev.labels, ...fetchMoreResult!.labels],
                      };
                    },
                  });
                }
              }}
            >
              {data?.labels
                .filter((item) => !setOfExcludeLabelIds.has(item.id))
                .map((item) => {
                  const labelText = getLabelText(item);
                  return (
                    <PopoverLabel
                      key={item.id}
                      item={item}
                      labelText={labelText}
                      onSelect={onSelect}
                    />
                  );
                })}
              <li className="placeholder-item">{""}</li>
            </ul>
          </div>
          <div className="bottom">
            <div
              className={cx(CreateLabelBtnStyle, Typo.Label.l4_regular)}
              onClick={() => {
                closePopover();
                pushModal({
                  component: AddLabelModal,
                  props: {
                    callback: onSelect,
                  },
                });
              }}
            >
              {t("label.add_label_title")}
            </div>
          </div>
        </div>
      }
      placement="bottomLeft"
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
    >
      <span>
        {React.isValidElement(children) ? (
          children
        ) : (
          <kit.tooltip title={t("label.attach_label")}>
            <kit.button
              className={TriggerStyle}
              prefixIcon="1-plus-add-create-new-16-secondary"
              hoverPrefixIcon="1-plus-add-create-new-16-blue"
            ></kit.button>
          </kit.tooltip>
        )}
      </span>
    </kit.popover>
  );
};

export default AddLabelPopover;
