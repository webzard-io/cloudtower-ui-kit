import { css, cx } from "@linaria/core";
import { styled } from "@linaria/react";
import Button from "@src/core/Button";
import TableForm from "@src/core/TableForm";
import {
  TableFormColumn,
  TableFormErrorsType,
  TableFormHandle,
  TableFormRowConfiguration,
  ValidateTriggerType,
} from "@src/core/TableForm/types";
import { genEmptyRow } from "@src/core/TableForm/utils";
import Tooltip from "@src/core/Tooltip";
import { Typo } from "@src/core/Typo";
import { CoreMeta } from "@stories/types";
import { Select } from "antd";
import React, { useCallback, useMemo, useRef, useState } from "react";

const meta = {
  component: TableForm,
  title: "Core/TableForm | 表格表单",
  parameters: {
    docs: {
      description: {
        component:
          "行内编辑的表格表单组件，适用于批量数据录入场景。支持多种内置列类型（text/input/password/checkbox/affix）和自定义列渲染、表头批量填充、行的增删和拖拽排序、三种校验触发模式（Normal/Aggressive/Lazy），以及外部错误信息注入。",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/sv8N9opZrWCMApiGeq2V6M/Table-Form-%7C-%E8%A1%A8%E6%A0%BC%E8%A1%A8%E5%8D%95?node-id=0-1&node-type=canvas&t=J7VBRAphSq2DIdhA-0",
    },
  },
} satisfies CoreMeta<typeof TableForm>;

export default meta;

// -- 共享辅助 --

const ContentWrapper = styled.div`
  padding: 20px;
`;

const OverflowUnderlineStyle = css`
  border-bottom: 1px dashed;
  border-color: $strokes-light-trans-4;
`;

const CustomSubtitleStyle = css`
  color: $text-secondary-light;
`;

const basicColumns: TableFormColumn[] = [
  {
    type: "text",
    title: "主机名",
    subTitle: "批量填充",
    key: "hostname",
    displayText: "host-node-xxxx",
    width: 120,
  },
  {
    type: "input",
    title: "管理 IP",
    key: "ip",
    defaultValue: "",
    validator: ({ value }) => {
      if (value && !/^\d{1,3}(\.\d{1,3}){3}$/.test(value as string)) {
        return "请输入合法的 IP 地址";
      }
    },
  },
  {
    type: "input",
    title: "主机名前缀",
    key: "prefix",
    defaultValue: "host0",
    autoIncrease: true,
  },
  {
    type: "password",
    title: "密码",
    key: "password",
  },
  {
    type: "checkbox",
    title: "启用",
    key: "enabled",
    align: "center",
  },
];

const DEFAULT_ROW_COUNT = 3;

const genDefaultData = (columns: TableFormColumn[]) =>
  [...Array(DEFAULT_ROW_COUNT)].map(() => genEmptyRow(columns));

// -- Stories --

export const Basic = () => {
  return (
    <ContentWrapper>
      <TableForm
        columns={basicColumns}
        defaultData={[
          {
            hostname: "",
            ip: "10.0.0.1",
            prefix: "host0",
            password: "pwd",
            enabled: true,
          },
          {
            hostname: "",
            ip: "10.0.0.2",
            prefix: "host1",
            password: "pwd",
            enabled: true,
          },
          {
            hostname: "",
            ip: "10.0.0.3",
            prefix: "host2",
            password: "pwd",
            enabled: false,
          },
        ]}
        onBodyChange={(data) => console.log("数据变更:", data)}
      />
    </ContentWrapper>
  );
};
Basic.storyName = "基础用法";

export const BatchFilling = () => {
  const columns: TableFormColumn[] = [
    { type: "input", title: "主机名", key: "hostname", autoIncrease: true },
    { type: "input", title: "管理 IP", key: "ip" },
    { type: "affix", title: "域名", key: "domain" },
  ];

  return (
    <ContentWrapper>
      <TableForm
        columns={columns}
        defaultData={[
          { hostname: "host0", ip: "10.0.0.1", domain: "" },
          { hostname: "host1", ip: "10.0.0.2", domain: "" },
          { hostname: "host2", ip: "10.0.0.3", domain: "" },
        ]}
        onHeaderChange={(data, columnKey) =>
          console.log("批量填充:", columnKey, data)
        }
      />
    </ContentWrapper>
  );
};
BatchFilling.storyName = "批量填充";

export const DynamicRows = () => {
  return (
    <ContentWrapper>
      <TableForm
        columns={basicColumns}
        defaultData={genDefaultData(basicColumns)}
        rowAddConfig={{
          addible: true,
          maximum: 8,
        }}
        row={{
          deletable: true,
        }}
        onBodyChange={(data) => console.log("数据变更:", data)}
        onBodyAdd={(data, rowIndex) => console.log("新增行:", rowIndex, data)}
      />
    </ContentWrapper>
  );
};
DynamicRows.storyName = "动态增删行";

export const DraggableRows = () => {
  return (
    <ContentWrapper>
      <TableForm
        columns={basicColumns}
        defaultData={[
          {
            hostname: "",
            ip: "10.0.0.1",
            prefix: "host0",
            password: "",
            enabled: true,
          },
          {
            hostname: "",
            ip: "10.0.0.2",
            prefix: "host1",
            password: "",
            enabled: false,
          },
          {
            hostname: "",
            ip: "10.0.0.3",
            prefix: "host2",
            password: "",
            enabled: true,
          },
        ]}
        disableBatchFilling
        row={{ draggable: true }}
        onBodyChange={(data) => console.log("拖拽后数据:", data)}
      />
    </ContentWrapper>
  );
};
DraggableRows.storyName = "拖拽排序";

export const CustomColumnRender = () => {
  const roleOptions = [
    { label: "Master 节点", value: "master" },
    { label: "Worker 节点", value: "worker" },
    { label: "Witness 节点", value: "witness" },
  ];

  const columns: TableFormColumn[] = [
    { type: "input", title: "主机名", key: "hostname" },
    { type: "input", title: "管理 IP", key: "ip" },
    {
      title: "角色",
      key: "role",
      defaultValue: "worker",
      render({ isHeader, value, onChange, ...restProps }) {
        return (
          <Select
            {...restProps}
            size="small"
            placeholder={isHeader ? "批量选择" : "请选择角色"}
            value={value as string}
            onChange={onChange}
            options={roleOptions}
          />
        );
      },
      validator({ value }) {
        if (!value) return "请选择角色";
      },
    },
  ];

  return (
    <ContentWrapper>
      <TableForm
        columns={columns}
        defaultData={[
          { hostname: "node-01", ip: "10.0.0.1", role: "master" },
          { hostname: "node-02", ip: "10.0.0.2", role: "worker" },
          { hostname: "node-03", ip: "10.0.0.3", role: "" },
        ]}
        rowAddConfig={{ addible: true }}
        row={{ deletable: true }}
      />
    </ContentWrapper>
  );
};
CustomColumnRender.storyName = "自定义列渲染";

const getColumnsForValidation = (
  type: ValidateTriggerType,
): TableFormColumn[] => [
  {
    title: "校验模式说明",
    type: "text",
    key: "desc",
    render() {
      switch (type) {
        case ValidateTriggerType.Normal:
          return "Normal: 首次 blur 后触发，之后每次 change 也触发";
        case ValidateTriggerType.Lazy:
          return "Lazy: 仅 blur 时触发校验";
        case ValidateTriggerType.Aggressive:
          return "Aggressive: 每次 change 都触发校验";
      }
    },
  },
  {
    title: "输入 error 触发校验",
    key: "value",
    type: "input",
    validator({ value, isHeader }) {
      if (!isHeader && (value as string)?.includes("error")) {
        return "输入中包含 error，校验失败";
      }
    },
  },
];

export const ValidateModes = () => {
  const rowValidator = useCallback(
    (index: number, rowData: { value?: string }) => {
      if (index === 1 && rowData.value?.includes("error")) {
        return "第 2 行包含 error，行级校验失败";
      }
    },
    [],
  );

  const modes = [
    {
      type: ValidateTriggerType.Normal,
      label: "Normal 标准模式",
      desc: "首次 blur 后触发校验，之后每次 change 也触发",
    },
    {
      type: ValidateTriggerType.Lazy,
      label: "Lazy 惰性模式",
      desc: "仅 blur 时触发校验",
    },
    {
      type: ValidateTriggerType.Aggressive,
      label: "Aggressive 激进模式",
      desc: "每次 change 都触发校验",
    },
  ] as const;

  return (
    <ContentWrapper>
      <p className={Typo.Label.l3_regular} style={{ marginBottom: 8 }}>
        在输入框中输入 error 触发列级校验；在第 2 行输入 error
        同时触发行级校验。对比三种模式下校验触发的时机差异。
      </p>
      {modes.map((mode, i) => (
        <div key={mode.type} style={{ marginTop: i > 0 ? 24 : 0 }}>
          <p className={Typo.Label.l3_bold} style={{ marginBottom: 4 }}>
            {mode.label}
          </p>
          <p
            className={Typo.Label.l4_regular}
            style={{ marginBottom: 8, color: "#6b7280" }}
          >
            {mode.desc}
          </p>
          <TableForm
            validateTriggerType={mode.type}
            disableBatchFilling
            columns={getColumnsForValidation(mode.type)}
            row={{ validator: rowValidator }}
            defaultData={genDefaultData(getColumnsForValidation(mode.type))}
          />
        </div>
      ))}
    </ContentWrapper>
  );
};
ValidateModes.storyName = "校验触发模式对比";

export const RowConfig = () => {
  const rowValidator = useCallback(
    (index: number, rowData: { value?: string }) => {
      if (index === 1 && rowData.value?.includes("error")) {
        return "第 2 行包含 error，行级校验失败";
      }
    },
    [],
  );

  const rowConfig: TableFormRowConfiguration = useMemo(
    () => ({
      draggable: true,
      deletable: (index: number) => index !== 1,
      disableActions: (index: number) =>
        index === 2 ? ["delete" as const] : undefined,
      validator: rowValidator,
      splitType: "zebraMarking" as const,
      descriptions: ["这是第一行的描述信息"],
    }),
    [rowValidator],
  );

  return (
    <ContentWrapper>
      <TableForm
        disableBatchFilling
        columns={getColumnsForValidation(ValidateTriggerType.Normal)}
        row={rowConfig}
        defaultData={genDefaultData(
          getColumnsForValidation(ValidateTriggerType.Normal),
        )}
      />
    </ContentWrapper>
  );
};
RowConfig.storyName = "行配置";

export const ErrorInjection = () => {
  const staticColumns: TableFormColumn[] = [
    { type: "input", title: "主机名", key: "hostname" },
    { type: "input", title: "管理 IP", key: "ip" },
    { type: "password", title: "密码", key: "password" },
  ];

  const asyncColumns: TableFormColumn[] = [
    { type: "input", title: "主机名", key: "hostname" },
    { type: "password", title: "密码", key: "password" },
  ];

  const [errors, setErrors] = useState<TableFormErrorsType>([null]);

  return (
    <ContentWrapper>
      <p className={Typo.Label.l3_bold} style={{ marginBottom: 4 }}>
        静态错误注入
      </p>
      <p
        className={Typo.Label.l4_regular}
        style={{ marginBottom: 8, color: "#6b7280" }}
      >
        通过 errors
        属性直接注入预定义的错误信息。支持行级别（字符串）和单元格级别（对象）两种格式。
      </p>
      <TableForm
        columns={staticColumns}
        disableBatchFilling
        defaultData={[
          { hostname: "host-01", ip: "10.0.0.1", password: "pwd" },
          { hostname: "host-02", ip: "invalid-ip", password: "123" },
        ]}
        errors={[
          "第一行：主机不可达",
          {
            ip: "IP 地址格式错误",
            password: "密码强度不足",
          },
        ]}
      />

      <p
        className={Typo.Label.l3_bold}
        style={{ marginBottom: 4, marginTop: 24 }}
      >
        异步错误注入
      </p>
      <p
        className={Typo.Label.l4_regular}
        style={{ marginBottom: 8, color: "#6b7280" }}
      >
        在密码列输入 error 触发模拟异步校验（500ms 延迟后显示错误）
      </p>
      <TableForm
        columns={asyncColumns}
        disableBatchFilling
        defaultData={[{ hostname: "host-01", password: "" }]}
        errors={errors}
        onBodyChange={(data) => {
          const password = data[0]?.password;
          if (password === "error") {
            setTimeout(() => {
              setErrors([{ password: "密码不合法（异步校验）" }]);
            }, 500);
          } else {
            setErrors([null]);
          }
        }}
      />
    </ContentWrapper>
  );
};
ErrorInjection.storyName = "错误注入";

export const RefHandle = () => {
  const ref = useRef<TableFormHandle>(null);
  const [validationResult, setValidationResult] = useState<
    "idle" | "pass" | "fail"
  >("idle");

  const columns: TableFormColumn[] = [
    { type: "input", title: "主机名", key: "hostname" },
    {
      type: "input",
      title: "管理 IP",
      key: "ip",
      validator: ({ value }) => {
        if (!value) return "IP 不能为空";
        if (!/^\d{1,3}(\.\d{1,3}){3}$/.test(value as string))
          return "请输入合法的 IP 地址";
      },
    },
  ];

  const handleValidate = () => {
    ref.current?.validateWholeFields();
    setTimeout(() => {
      const valid = ref.current?.isValid();
      setValidationResult(valid ? "pass" : "fail");
    }, 0);
  };

  return (
    <ContentWrapper>
      <p className={Typo.Label.l3_regular} style={{ marginBottom: 12 }}>
        操作流程：① 点击「校验全表」查看空字段报错 → ② 点击「填入合法数据」→ ③
        再次点击「校验全表」查看校验通过
      </p>
      <div
        style={{
          marginBottom: 8,
          display: "flex",
          gap: 8,
          alignItems: "center",
        }}
      >
        <Button size="small" type="primary" onClick={handleValidate}>
          校验全表
        </Button>
        <Button
          size="small"
          onClick={() => {
            ref.current?.setData([
              { hostname: "host-01", ip: "10.0.0.1" },
              { hostname: "host-02", ip: "10.0.0.2" },
            ]);
            setValidationResult("idle");
          }}
        >
          填入合法数据
        </Button>
        <Button
          size="small"
          onClick={() => {
            ref.current?.setData([
              { hostname: "", ip: "" },
              { hostname: "", ip: "" },
            ]);
            setValidationResult("idle");
          }}
        >
          重置为空
        </Button>
        {validationResult !== "idle" && (
          <span
            className={Typo.Label.l3_regular}
            style={{
              padding: "2px 12px",
              borderRadius: 4,
              color: validationResult === "pass" ? "#0a7544" : "#c4314b",
              backgroundColor:
                validationResult === "pass" ? "#e6f7ed" : "#fce8eb",
            }}
          >
            {validationResult === "pass" ? "校验通过" : "存在校验错误"}
          </span>
        )}
      </div>
      <TableForm
        ref={ref}
        columns={columns}
        disableBatchFilling
        defaultData={[
          { hostname: "", ip: "" },
          { hostname: "", ip: "" },
        ]}
        rowAddConfig={{ addible: true }}
        row={{ deletable: true }}
      />
    </ContentWrapper>
  );
};
RefHandle.storyName = "Ref 命令式操作";

export const EmptyTable = () => {
  const columns: TableFormColumn[] = [
    { key: "hostname", title: "主机名", type: "input" },
    { key: "ip", title: "管理 IP", type: "input" },
  ];

  return (
    <ContentWrapper>
      <p className={Typo.Label.l3_regular} style={{ marginBottom: 8 }}>
        hideEmptyTable=false（默认）：无数据时显示空表头
      </p>
      <TableForm
        columns={columns}
        disableBatchFilling
        rowAddConfig={{ addible: true }}
        row={{ deletable: true }}
      />
      <p
        className={Typo.Label.l3_regular}
        style={{ marginBottom: 8, marginTop: 24 }}
      >
        hideEmptyTable=true：无数据时隐藏表格，仅显示添加按钮
      </p>
      <TableForm
        columns={columns}
        disableBatchFilling
        hideEmptyTable
        rowAddConfig={{ addible: true }}
        row={{ deletable: true }}
      />
    </ContentWrapper>
  );
};
EmptyTable.storyName = "空表格";

export const TitleAndSubTitle = () => {
  const columns: TableFormColumn[] = [
    {
      key: "col-1",
      title: "普通标题",
      type: "input",
    },
    {
      key: "col-2",
      title: (
        <Tooltip title="这是 ReactNode 类型的标题">
          <span className={OverflowUnderlineStyle}>ReactNode 标题</span>
        </Tooltip>
      ),
      type: "input",
      subTitleRender() {
        return null;
      },
    },
    {
      key: "col-3",
      title: "带自定义副标题",
      subTitleRender() {
        return (
          <p className={cx(Typo.Label.l4_regular, CustomSubtitleStyle)}>
            自定义副标题内容
            <Tooltip title="提示信息">
              <span className={OverflowUnderlineStyle}>{" 详情"}</span>
            </Tooltip>
          </p>
        );
      },
      type: "input",
    },
  ];

  return (
    <ContentWrapper>
      <TableForm
        columns={columns}
        rowAddConfig={{ addible: true }}
        row={{ deletable: true }}
      />
    </ContentWrapper>
  );
};
TitleAndSubTitle.storyName = "标题与副标题";

export const ExtraAction = () => {
  return (
    <ContentWrapper>
      <TableForm
        columns={basicColumns}
        maxHeight={300}
        defaultData={genDefaultData(basicColumns)}
        rowAddConfig={{
          addible: true,
          maximum: 5,
          extraAction: (
            <Button type="quiet" size="small">
              从模板导入
            </Button>
          ),
        }}
      />
    </ContentWrapper>
  );
};
ExtraAction.storyName = "额外操作按钮";
