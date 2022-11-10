import {
  EntityAsyncStatus,
  Maybe,
  TaskStatus,
  useTaskSubscription,
} from "@cloudtower/eagle/generated/react-hooks";
import { Icon } from "@cloudtower/eagle/kit/smartx";
import { kitContext } from "@cloudtower/eagle/kit/specify";
import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import React, { useContext, useEffect, useState } from "react";

export const CreatingSelectDropdownStyle = css`
  .ant-select-item {
    color: $text-light-secondary;
    pointer-events: none;
  }
`;

const CreateResourceDropdownRenderWrapper = styled.div`
  padding: 0 6px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .input-wrapper {
    margin-right: 8px;
    flex: 1;

    .error-msg {
      margin-top: 4px;
      color: $fills-light-serious-serious;
    }
  }

  .ant-btn {
    width: 40px;
  }
`;

export function CreateResourceDropdownRender<
  T extends { id: string; entityAsyncStatus?: Maybe<EntityAsyncStatus> }
>(props: {
  onCreate: (name: string) => Promise<{ data?: T; error?: string }>;
  isAsync?: boolean;
  onCreatingChange?: (creating: boolean, data?: T) => void;
  placeholder?: string;
}): JSX.Element {
  const { onCreate, isAsync, onCreatingChange, placeholder } = props;
  const kit = useContext(kitContext);
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [creatData, setCreateData] = useState<T>();
  const { data: taskData } = useTaskSubscription();

  useEffect(() => {
    if (isAsync && creatData && taskData?.task.node?.snapshot) {
      try {
        const snapshot = JSON.parse(taskData?.task.node?.snapshot);

        // Task Succeed
        if (
          snapshot.id === creatData.id &&
          taskData.task.node.status === TaskStatus.Successed
        ) {
          handleCreatingStatus(false, creatData);
          setCreateData(undefined);
        }

        // Task Failed
        if (
          snapshot.id === creatData.id &&
          taskData.task.node.status === TaskStatus.Failed
        ) {
          handleCreatingStatus(false);
          setCreateData(undefined);
        }
      } catch (error) {
        handleCreatingStatus(false);
        console.log(error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAsync, creatData, taskData]);

  const handleCreatingStatus = (creating: boolean, data?: T) => {
    setCreating(creating);
    if (onCreatingChange) onCreatingChange(creating, data);
  };

  const onClick = async () => {
    handleCreatingStatus(true);

    try {
      const { data: resource, error } = await onCreate(name);

      if (error && typeof error === "string") {
        handleCreatingStatus(false);
        setErrorMsg(error);
        return;
      }

      isAsync ? setCreateData(resource) : handleCreatingStatus(false, resource);
      setName("");
    } catch (error) {
      handleCreatingStatus(false);
    }
  };

  return (
    <>
      <kit.divider style={{ margin: "6px 0" }} />
      <CreateResourceDropdownRenderWrapper>
        <div className="input-wrapper">
          <kit.input
            disabled={creating}
            error={!!errorMsg}
            placeholder={placeholder}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errorMsg) setErrorMsg("");
            }}
            onPressEnter={(e) => {
              e.stopPropagation();
            }}
          />
          {errorMsg ? <p className="error-msg">{errorMsg}</p> : null}
        </div>
        <kit.button
          icon={
            creating ? (
              <Icon
                type="1-loading-24-gradient-blue"
                fileFormat="png"
                isRotate={true}
              />
            ) : (
              <Icon type="1-plus-add-create-new-24-gradient-gray" />
            )
          }
          disabled={!name || creating}
          onClick={onClick}
        />
      </CreateResourceDropdownRenderWrapper>
    </>
  );
}
