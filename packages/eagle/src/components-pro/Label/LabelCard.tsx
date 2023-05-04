import React, { useContext } from "react";
import { kitContext } from "../../UIKitProvider";
import { useTranslation } from "react-i18next";
import { styled } from "linaria/react";
import {
  useGetLabelsQuery,
  LabelWhereInput,
  Maybe,
} from "@tower/codegen-component"; /** ../../generated/react-hooks */
import _ from "lodash";
import LabelResources from "./LabelResources";
import { Typo } from "../../components/Typo";
import { cx } from "linaria";
import LabelTag from "../LabelTag";
import { ROLE_ACTION } from "@tower/utils";
import { useUserActions } from "../RolePrivilege";
import AddLabelPopover from "./AddLabelPopover";
import useUpdateLabelResources from "./hooks/useUpdateLabelResources";

const LabelTabWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  height: 100%;

  .label-card-wrapper {
    width: 592px;
  }

  &.with-margin-top .label-card-wrapper {
    margin-top: 24px;
  }
`;

const LabelCardWrapper = styled.div`
  .card-header {
    margin-bottom: 8px;
    padding: 0 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: $text-light-secondary;

    .edit-icon {
      padding: 0px 12px;
      &:hover {
        background: rgba(211, 218, 235, 0.6);
      }
    }
  }

  .card-content {
    display: flex;
    padding: 24px;
    border-radius: 8px;
    background-color: white;
    align-items: flex-start;
    border: 1px solid rgba(211, 218, 235, 0.6);

    &.empty {
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .text {
        width: 100%;
        text-align: center;
        color: $text-light-tertiary;
      }

      .ant-btn {
        margin-top: 8px;
        padding: 2px 8px;
        color: $text-light-super;
      }
    }

    > .icon-wrapper {
      margin-right: 10px;
    }

    .tags-wrapper {
      margin-bottom: -8px;
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      width: 100%;

      .tag {
        margin-bottom: 8px;
      }

      .ant-btn {
        margin-right: 8px;
        margin-bottom: 8px;
      }
    }
  }
`;

const LabelCard: React.FC<{
  type: LabelResources;
  resourceId: Maybe<string>;
  where?: LabelWhereInput;
  canEditLabels?: boolean;
}> = ({ type, resourceId, where, canEditLabels = true }) => {
  const kit = useContext(kitContext);
  const { t } = useTranslation();
  const { data, loading } = useGetLabelsQuery({
    variables: { where },
  });
  const [trigger] = useUpdateLabelResources({
    resourceType: type,
  });
  const { actions } = useUserActions();
  const attachedLabelIds = (data?.labels || []).map((item) => item.id);

  return (
    <LabelCardWrapper className="label-card-wrapper">
      {loading ? (
        <kit.loading />
      ) : (
        <>
          {data && _.isArray(data.labels) && data.labels.length > 0 ? (
            <div className="card-content">
              <div className="tags-wrapper">
                {data.labels.map((label) => {
                  return (
                    <LabelTag
                      key={label.id}
                      label={label}
                      showEllipsis={true}
                      remove={
                        actions.includes(ROLE_ACTION.MANAGE_LABEL) &&
                        resourceId &&
                        canEditLabels
                          ? () => {
                              trigger({
                                labelId: label.id,
                                resources: [
                                  {
                                    id: resourceId,
                                  },
                                ],
                              });
                            }
                          : undefined
                      }
                    />
                  );
                })}
                {actions.includes(ROLE_ACTION.MANAGE_LABEL) && canEditLabels ? (
                  <AddLabelPopover
                    resourceIds={[resourceId || ""]}
                    resourceType={type}
                    excludeLabelIds={attachedLabelIds}
                  ></AddLabelPopover>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="card-content empty">
              <p className={cx(Typo.Label.l2_bold_title, "text")}>
                {t("label.no_connected_labels")}
              </p>
              {actions.includes(ROLE_ACTION.MANAGE_LABEL) && canEditLabels ? (
                <AddLabelPopover
                  resourceIds={[resourceId || ""]}
                  resourceType={type}
                >
                  <kit.button
                    className={Typo.Label.l3_regular}
                    prefixIcon="1-plus-add-create-new-16-secondary"
                    hoverPrefixIcon="1-plus-add-create-new-16-blue"
                  >
                    {t("label.attach_label")}
                  </kit.button>
                </AddLabelPopover>
              ) : null}
            </div>
          )}
        </>
      )}
    </LabelCardWrapper>
  );
};

export const LabelTab: React.FC<{
  type: LabelResources;
  resourceId: Maybe<string>;
  where?: LabelWhereInput;
  hasMargin?: boolean;
  canEditLabels?: boolean;
}> = ({ type, resourceId, where, hasMargin = true, canEditLabels = true }) => {
  return (
    <LabelTabWrapper className={hasMargin ? "with-margin-top" : ""}>
      <LabelCard
        type={type}
        resourceId={resourceId}
        where={where}
        canEditLabels={canEditLabels}
      ></LabelCard>
    </LabelTabWrapper>
  );
};

export default LabelCard;
