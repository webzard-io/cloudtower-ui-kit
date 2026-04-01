# 组件 data-testid 透传指南

为 Eagle 组件添加 `data-testid` 透传支持，使组件对 e2e 测试工具（Playwright、Cypress、Chrome DevTools MCP）友好。

**核心原则：**

1. **仅做透传，不自动生成。** 组件只负责把业务代码传入的 `data-testid` 放到正确的 DOM 元素上，不生成任何默认值。
2. **不改变 DOM 结构。** 添加 data-testid 支持时，不应为了挂属性而额外包裹 DOM 元素。如果某个分支返回 Fragment 且没有可挂载的根元素，允许该分支不支持 data-testid，并在类型注释中说明。

## 目录

- [为什么需要特别处理](#为什么需要特别处理)
- [四层策略](#四层策略)
  - [第一层：简单组件 — 显式透传](#第一层简单组件--显式-data-testid-透传)
  - [第一层补充：Radio / Checkbox — marker ref 到外层 label](#第一层补充radio--checkbox--marker-ref-到外层-label)
  - [第一层补充：基础 Input — ref 回调到原生元素](#第一层补充基础-input-组件--ref-回调到原生元素)
  - [第一层补充：ParrotTrans — additionalProps 透传](#第一层补充parrottrans-组件--additionalprops-透传)
  - [第一层补充：自定义渲染函数 — 委托给调用方](#第一层补充自定义渲染函数--委托给调用方)
  - [第二层：表单字段 — 注入到 input 对象](#第二层表单字段--注入到-input-对象)
  - [第三层：列表/选项组件 — 选项级 testid](#第三层列表选项组件--选项级-testid)
  - [第四层：复合组件 — 前缀 + 子元素后缀](#第四层复合组件--前缀--子元素后缀)
- [类型定义：确保 .d.ts 中 data-testid 合法](#类型定义确保-dts-中-data-testid-合法)
- [如何判断用哪一层](#如何判断用哪一层)
- [测试](#测试)
- [常见踩坑](#常见踩坑)

## 为什么需要特别处理

antd 在原生元素外会包裹额外的 DOM 层。直接 `{...props}` 展开往往把 `data-testid` 放到了外层 wrapper 上，
而非 Playwright 实际点击/输入的目标元素。不同类型的组件需要不同的策略。

---

## 四层策略

### 第一层：简单组件 — 显式 data-testid 透传

适用于渲染单一根元素、或根元素就是交互目标的组件。

**做法：** 只在 Props 类型中添加 `"data-testid"?: string`，解构后显式传到根元素上。不使用 `...restProps` 展开，不使用 `extends React.HTMLAttributes`。

```tsx
// 改造前
export const Banner: React.FC<BannerProps> = ({ message, type, btnProps }) => {
  return <div id="global-banner">...</div>;
};

// 改造后
export const Banner: React.FC<BannerProps> = ({
  message,
  type,
  btnProps,
  "data-testid": dataTestId,
}) => {
  return (
    <div data-testid={dataTestId} id="global-banner">
      ...
    </div>
  );
};
```

**检查项：**

1. 在 Props 类型中加 `"data-testid"?: string`
2. 在解构中加 `"data-testid": dataTestId`
3. **有根元素的渲染分支**都必须加 `data-testid={dataTestId}` — 包括空态、loading、error 等条件分支

**Fragment 分支的处理原则：**

如果某个分支原本返回 Fragment（`<>...</>`），**不要**为了挂 data-testid 而改成 `<span>` 或 `<div>`。
这种情况下该分支不支持 data-testid，需要在 Props 类型的 JSDoc 中说明哪些分支不生效。
调用方如果需要 data-testid，应在组件外层自行包一层 wrapper。

```tsx
// 正确：Fragment 分支保持不变，只在有根元素的分支挂 testid
const Time = ({ date, plainText, "data-testid": dataTestId }: ITimeProps) => {
  if (!date) return <>-</>;  // Fragment，不挂 testid
  if (plainText) return <>...</>;  // Fragment，不挂 testid
  return (
    <span data-testid={dataTestId} className={...}>  {/* 已有根元素，挂 testid */}
      ...
    </span>
  );
};
```

**空态分支使用 Empty 组件透传：**

Empty 组件已支持 `"data-testid"` 属性，本身渲染为 `<span>`。
单位组件的空态分支可以直接透传 data-testid 给 Empty，无需额外包 span：

```tsx
// 正确：Empty 本身就是 span，直接透传
if (isEmpty(rawValue)) {
  return <Empty data-testid={dataTestId} {...emptyProps} />;
}
```

**多分支组件的典型错误：**

```tsx
// 错误：空态分支丢失了 data-testid
const Timeline = ({ items, emptyText, "data-testid": dataTestId }) => {
  if (!items.length) {
    return <div className={EmptyWrapper}>{emptyText}</div>; // data-testid 丢了
  }
  return <div data-testid={dataTestId}>...</div>;
};

// 正确：每个分支都透传
const Timeline = ({
  items,
  emptyText,
  emptyRender,
  "data-testid": dataTestId,
}) => {
  if (!items.length) {
    if (emptyRender) {
      return <div data-testid={dataTestId}>{emptyRender(emptyText)}</div>;
    }
    return (
      <div data-testid={dataTestId} className={EmptyWrapper}>
        {emptyText}
      </div>
    );
  }
  return <div data-testid={dataTestId}>...</div>;
};
```

**适用组件：** Banner、AccordionCard、Avatar、BlankState、Breadcrumb、DetailCard、DonutChart、
Empty、FailedLoad、Metric、Nav、Pagination、SimplePagination、StepProgress、TimeZoneSelect、
Timeline、Truncate 等单根组件。

---

### 第一层补充：Radio / Checkbox — marker ref 到外层 label

适用于 antd Radio、RadioButton、Checkbox 等基于隐藏 `<input>` + 外层 `<label>` 点击的表单控件。

**问题：** antd 会把 `data-*` 属性透传到内部隐藏的 `<input>` 上，但 change 事件实际绑在外层
`<label>` 上。E2E 测试中通过 `data-testid` 定位到隐藏 input 后 `click()` 无法触发 onChange。

**做法：** 不将 `data-testid` 传给 antd 组件，改为在 children 中插入一个 `display: none` 的 marker
`<span>`，通过 callback ref + `closest()` 找到外层 `<label>` 并 `setAttribute`。
这样不增加可见 DOM 层，不影响 RadioGroup/CheckboxGroup 的 CSS 选择器。

```tsx
const Radio: React.FC<RadioProps> = ({
  children,
  "data-testid": dataTestId,
  ...props
}) => {
  const markerRef = useCallback(
    (node: HTMLSpanElement | null) => {
      if (node && dataTestId) {
        const label = node.closest("label.ant-radio-wrapper");
        if (label) {
          label.setAttribute("data-testid", dataTestId);
        }
      }
    },
    [dataTestId],
  );

  return (
    <AntdRadio {...props}>
      {dataTestId && <span ref={markerRef} style={{ display: "none" }} />}
      {children}
    </AntdRadio>
  );
};
```

**不同组件的 `closest()` 选择器：**

| 组件        | 选择器                           |
| ----------- | -------------------------------- |
| Radio       | `label.ant-radio-wrapper`        |
| RadioButton | `label.ant-radio-button-wrapper` |
| Checkbox    | `label.ant-checkbox-wrapper`     |

**检查项：**

1. 提取 `"data-testid": dataTestId`，**不要**传给 antd 组件
2. marker `<span>` 必须 `style={{ display: "none" }}`，避免影响布局
3. 仅在 `dataTestId` 存在时渲染 marker，减少不必要的 DOM
4. 依赖数组包含 `[dataTestId]`

**适用组件：** Radio、RadioButton、Checkbox。

---

### 第一层补充：基础 Input 组件 — ref 回调到原生元素

适用于 Eagle 封装的基础输入组件（Input、InputNumber、InputInteger、TextArea）。
这些组件直接包裹 antd，antd 在有 `prefix`/`suffix`/`allowClear` 时会在原生 `<input>` 外包一层
`<span class="ant-input-affix-wrapper">`，导致普通的 props 透传把 `data-testid` 放到 wrapper 上。

**做法：** 提取 `data-testid`，通过 ref 回调拿到 antd 组件实例，直接在原生 input 元素上 `setAttribute`。

```tsx
const Input: React.FC<InputProps> = ({
  className,
  error,
  size = "middle",
  "data-testid": dataTestId,
  ...props
}) => {
  const ref = React.useCallback(
    (instance: InstanceType<typeof AntdInput> | null) => {
      const el = instance?.input;
      if (!el) return;
      if (dataTestId) {
        el.setAttribute("data-testid", dataTestId);
      } else {
        el.removeAttribute("data-testid");
      }
    },
    [dataTestId],
  );
  return <StyledAntdInput ref={ref} {...props} size={size} />;
};
```

**不同 antd 组件访问原生元素的方式：**

| 组件                       | ref 实例访问路径                               |
| -------------------------- | ---------------------------------------------- |
| Input                      | `instance.input`                               |
| InputNumber / InputInteger | `instance.input`                               |
| TextArea                   | `(instance as any).resizableTextArea.textArea` |

**检查项：**

1. 提取 `"data-testid": dataTestId`，不要放在 `...props` 中
2. ref 回调中同时处理设置和清除（`setAttribute` / `removeAttribute`）
3. 依赖数组包含 `[dataTestId]`

**适用组件：** Input、InputNumber、InputInteger、TextArea。

---

### 第一层补充：ParrotTrans 组件 — additionalProps 透传

适用于使用 `ParrotTrans`（react-i18next 的 Trans）并设置了 `parent` 的组件。
Trans 内部实现为 `createElement(parent, additionalProps, content)`，
会将未识别的 props 通过 `additionalProps` 透传到 parent 元素上。

**做法：** 直接将 `data-testid` 传给 `<ParrotTrans>`，它会自动到达 parent 渲染的元素。

```tsx
const Second: UnitFn = ({
  rawValue,
  emptyProps,
  "data-testid": dataTestId,
}) => {
  if (isEmpty(rawValue)) {
    return <Empty data-testid={dataTestId} {...emptyProps} />;
  }
  const { value, unit } = formatSeconds(rawValue, decimals);
  return (
    <ParrotTrans
      parent="span"
      data-testid={dataTestId} // Trans 透传到 parent span
      i18nKey={`unit.${unit}`}
      count={value}
    >
      <span className="value"></span>
      <span className="unit"></span>
    </ParrotTrans>
  );
};
```

**原理：** react-i18next 的 Trans 组件解构已知 props 后，将剩余 props 收集为 `additionalProps`，
在 `createElement(parent, additionalProps, content)` 时传给 parent 元素。
因此 `data-testid` 等 HTML 属性会自然到达 parent 渲染的 DOM 元素，无需额外包裹。

**适用组件：** Second、Duration 中使用 ParrotTrans 的分支。

---

### 第一层补充：自定义渲染函数 — 委托给调用方

当组件提供 `contentRender` / `render` 等自定义渲染函数时，组件本身返回调用方的渲染结果，
不应为了挂 data-testid 而包裹额外元素。调用方应在 contentRender 返回的根元素上自行设置 data-testid。

```tsx
// 组件实现：contentRender 分支不挂 testid
if (contentRender) {
  return <>{contentRender(formatItems)}</>;
}

// 调用方：自行在根元素上设置
<Duration
  rawValue={3661}
  contentRender={(parts) => (
    <div data-testid="my-duration">
      {parts.map((p, i) => (
        <span key={i}>
          {p.value}
          {p.unit}
        </span>
      ))}
    </div>
  )}
/>;
```

需要在组件 Props 类型的 JSDoc 中说明此行为。

---

### 第二层：表单字段 — 注入到 input 对象

适用于 `Fields.*` 系列（react-final-form 模式），`input` 是一个 prop 对象会被展开到原生 `<input>` 上。
antd 的 Input 在有 `allowClear`/`prefix`/`suffix` 时会包一层 `<span class="ant-input-affix-wrapper">`，
导致 `data-testid` 停在 wrapper 上到不了原生 `<input>`。

**做法：** 提取 `data-testid`，注入到 `input` 对象中，让它随 `input` 展开到原生元素。

```tsx
const FieldsString = ({
  input,
  meta,
  "data-testid": dataTestId,
  ...props
}: FieldBaseProps & StringProps) => {
  const inputWithTestId = dataTestId
    ? { ...input, "data-testid": dataTestId }
    : input;
  return <Input {...inputWithTestId} {...props} />;
};
```

**检查项：**

1. 在组件 props 类型中加 `"data-testid"?: string`
2. 解构出 `"data-testid": dataTestId`
3. 创建 `inputWithTestId`，将 testId 合并进 `input` 对象
4. 用 `inputWithTestId` 替代原来的 `input` 传给原生/antd 元素

**适用组件：** FieldsString、FieldsInt、FieldsInteger、FieldsFloat、FieldsTextArea、
FieldsTimePicker、FieldsBoolean、FieldsEnum、FieldsDateTime、FieldsDateTimeRange。

---

### 第三层：列表/选项组件 — 选项级 testid

适用于渲染一组可点击项的组件（菜单、标签页、分段控制器等），每个选项都是独立的点击目标。
组件级 `data-testid` 标记容器，每个**选项**需要各自的 testid 来精确定位。

**做法：** 在选项类型中加 `"data-testid"?: string`，渲染时传到实际点击目标上。

```tsx
// 类型：给选项接口加 data-testid
interface IItem {
  key: string;
  text?: string;
  "data-testid"?: string;
}

// 渲染：传到实际点击目标
<AntdMenu.Item key={item.key} data-testid={item["data-testid"]}>
  {item.text}
</AntdMenu.Item>;
```

**当 antd 的点击目标与内容元素不一致时**（如 SegmentControl，点击目标是 `<label class="antd5-segmented-item">`
但内容嵌套更深），使用 **ref 回调**向上传播 testid。

注意：ref 回调方式会引入额外的 `<span>` 包裹层和运行时 DOM 改写（`setAttribute`），不是纯粹的 prop 透传。
使用时需要额外注意以下问题：

```tsx
const SegmentItemLabel: React.FC<{
  children: React.ReactNode;
  "data-testid"?: string;
}> = ({ children, "data-testid": testId }) => {
  const ref = React.useCallback(
    (node: HTMLSpanElement | null) => {
      if (!node) return;
      const item = node.closest(`.${Antd5PrefixCls}-segmented-item`);
      if (!item) return;
      // 有 testId 时设置，无 testId 时清除（防止残留）
      if (testId) {
        item.setAttribute("data-testid", testId);
      } else {
        item.removeAttribute("data-testid");
      }
    },
    [testId],
  );
  return <span ref={ref}>{children}</span>;
};

// 在 processOptions 中用 SegmentItemLabel 包裹 label
const processOptions = (options) => {
  return options.map((option) => {
    if (typeof option === "string" || typeof option === "number") return option;
    const { "data-testid": testId, ...rest } = option;
    if (!testId) return rest;
    return {
      ...rest,
      label: (
        <SegmentItemLabel data-testid={testId}>{rest.label}</SegmentItemLabel>
      ),
    };
  });
};
```

**ref 回调模式的注意事项：**

- **属性残留**：同一个 option 从「有 data-testid」变为「没有 data-testid」时，必须在 ref 回调中调用 `removeAttribute` 清除旧值，否则会残留
- **额外 DOM 层**：包裹的 `<span>` 会改变 DOM 结构，可能影响现有样式或快照测试
- **运行时改写**：`setAttribute` 不在 React 的 reconciliation 范围内，与 React DevTools 和 SSR 不完全兼容
- 这是一种「最后手段」，优先考虑能否通过 antd 的官方 API 实现透传

**检查项：**

1. 在选项/item 类型定义中加 `"data-testid"?: string`
2. 如果 item 类型是内部的，同时更新组件的公开 props 类型
3. 对 antd5 中点击目标是内容祖先元素的情况，使用 ref 回调模式
4. 如果 antd 类型中不包含 `data-testid`，需要 `Omit` 覆盖 options 类型
5. 覆盖 antd 类型时，不能丢失原有字段（如 `title`），用 `&` 交叉类型扩展而非替换

**适用组件：** DropdownMenu、SegmentControl、Tabs 等列表类组件。

---

### 第四层：复合组件 — 前缀 + 子元素后缀

适用于根组件下存在**任何独立的用户操作目标**的组件。

**判断方法：** 检查组件渲染出的、测试中需要独立定位的操作元素：

- 可点击的 button / link
- 可点击的 menu item / tab item
- 可展开的 dropdown
- 可输入的 input / textarea
- 可切换的 checkbox / radio / switch

只要根组件下存在 >= 1 个操作目标，就需要使用第四层（前缀 + 子元素后缀）。
第一层仅适用于纯展示组件（没有任何可操作子元素）。

**示例：**

- FailedLoad 有 retry button (1) → 需要第四层，后缀 `-retry`
- Pagination 有 dropdown + prev button + next button + menu items → 需要第四层
- Dialog 有 confirm button + cancel button + close button → 需要第四层
- Banner、Empty、Truncate 等纯展示组件 → 第一层

**做法：** 接受一个 `data-testid` 作为前缀，自动为子元素添加描述性后缀。

```tsx
// 使用方式：
<SmallDialog data-testid="confirm-delete">...</SmallDialog>

// 渲染结果：
// <div data-testid="confirm-delete">              ← 根
//   <h3 data-testid="confirm-delete-title">       ← 标题
//   <button data-testid="confirm-delete-confirm"> ← 确认按钮
//   <button data-testid="confirm-delete-cancel">  ← 取消按钮
```

**实现：**

```tsx
const SmallDialog = ({ "data-testid": testId, ...props }) => {
  const sub = (suffix: string) => (testId ? `${testId}-${suffix}` : undefined);
  return (
    <div data-testid={testId}>
      <h3 data-testid={sub("title")}>{props.title}</h3>
      <div data-testid={sub("body")}>{props.children}</div>
      <button data-testid={sub("confirm")} onClick={props.onConfirm}>
        OK
      </button>
      <button data-testid={sub("cancel")} onClick={props.onCancel}>
        Cancel
      </button>
    </div>
  );
};
```

**检查项：**

1. 接受 `"data-testid"?: string` 作为前缀
2. 创建辅助函数：`const sub = (suffix: string) => testId ? \`${testId}-${suffix}\` : undefined`
3. 对每个可交互子元素应用 `data-testid={sub("...")}`
4. 使用一致的、描述性的后缀（如 `-title`、`-confirm`、`-cancel`、`-close`、`-input`）
5. 在组件类型定义的 JSDoc 中说明后缀命名

**适用组件：** SmallDialog、MediumDialog、WizardDialog 等多交互部件的复合组件。

---

## 类型定义：确保 .d.ts 中 data-testid 合法

组件的 Props 类型必须包含 `"data-testid"?: string`，否则 TypeScript 编译和发包后的 `.d.ts` 会把
`data-testid` 视为非法 prop，业务方使用时会报类型错误。

**所有层级都必须同步处理类型定义。** 做法是在 Props 类型中显式添加 `"data-testid"?: string` 属性。
不使用 `extends React.HTMLAttributes` —— 这样会暴露大量组件并不真正支持的 HTML 属性，造成类型承诺与实现不一致。

### 情况 A：Props 已继承 antd 的 props 类型（无需额外处理）

如果组件 Props 继承了 antd 的 props 类型（antd 的 props 一般已包含 HTML 属性），
则 `data-testid` 天然合法，无需改动。

### 情况 B：Props 是纯业务字段（需要添加）

```tsx
// 改造前：纯业务类型，TS 不认识 data-testid
interface BannerProps {
  message: string;
  type: "error" | "info" | "warning";
}

// 改造后：显式添加 data-testid
interface BannerProps {
  message: string;
  type: "error" | "info" | "warning";
  "data-testid"?: string;
}
```

### 情况 C：覆盖 antd 类型时不丢失原有字段

当用 `Omit` 覆盖 antd 类型的某个字段（如 `options`）时，必须确保扩展后的类型包含原始类型的所有字段：

```tsx
// 错误：自定义 option 类型丢掉了 antd 原有的 title、className 等字段
interface ISegmentedControlOption {
  label: React.ReactNode;
  value: string | number;
  "data-testid"?: string;
}

// 正确：用交叉类型保留 antd 原有字段
import { SegmentedLabeledOption } from "antd5/es/segmented";

type ISegmentedControlOption = SegmentedLabeledOption & {
  "data-testid"?: string;
};
```

### 情况 D：部分分支不支持 data-testid

当组件某些渲染分支返回 Fragment 无法挂载 data-testid 时，必须在 Props 类型的 JSDoc 中说明：

```tsx
/**
 * data-testid 在空态（Empty）和 noUnitOnZero 分支生效。
 * 默认渲染分支（多单位拼接）和 contentRender 分支返回 Fragment，不支持 data-testid。
 * 需要 data-testid 时，请在组件外层自行包一层 wrapper 并设置 data-testid。
 * 使用 contentRender 时，也可在 contentRender 返回的根元素上自行设置 data-testid。
 */
export interface DurationProps {
  // ...
}
```

**检查项：**

1. 改完运行时代码后，`yarn typings` 必须通过
2. 确认业务方使用 `<Component data-testid="xxx" />` 时 TS 不报错
3. 覆盖 antd 子类型时，用 `&` 交叉类型而非全新 interface，避免丢失原有字段

---

## 如何判断用哪一层

1. **读组件代码** — 了解 DOM 结构和渲染输出
2. **找到点击目标** — 用户实际点击/输入的是哪个元素？
3. **检查 props 展开是否到位** — 渲染组件后检查 DOM
4. **选择层级：**
   - 单根元素 → 第一层
   - Radio/Checkbox 等隐藏 input + label 点击的控件 → 第一层补充（marker ref 到 label）
   - 基础 Input 封装（antd 有 wrapper 问题） → 第一层补充（ref 回调）
   - 使用 ParrotTrans 的展示组件 → 第一层补充（additionalProps 透传）
   - 有 contentRender 等自定义渲染函数 → 第一层补充（委托给调用方）
   - 有 `input` prop 对象的表单字段 → 第二层
   - 可点击选项列表 → 第三层
   - 根组件下存在任何操作目标（button、dropdown、input 等） → 第四层

## 测试

每次改动后编写测试验证 `data-testid` 到达了正确的 DOM 元素：

```tsx
import { render } from "@testing-library/react";

// 第一层：验证到达根元素
it("data-testid 透传到根元素", () => {
  const { container } = render(
    <Banner data-testid="my-banner" message="hi" type="info" />,
  );
  expect(container.querySelector("[data-testid='my-banner']")).toBeTruthy();
});

// 第一层补充（ref 回调）：验证到达原生 input（即使有 prefix）
it("Input 有 prefix 时 data-testid 仍到达原生 input", () => {
  const { container } = render(<Input data-testid="my-input" prefix="$" />);
  expect(container.querySelector("input[data-testid='my-input']")).toBeTruthy();
});

// 第二层：验证到达原生 <input>
it("data-testid 透传到原生 input", () => {
  const { container } = render(
    <FieldsString data-testid="name-input" input={mockInput} meta={mockMeta} />,
  );
  expect(
    container.querySelector("input[data-testid='name-input']"),
  ).toBeTruthy();
});

// 第三层：验证每个选项都有 testid
it("data-testid 透传到分段选项", () => {
  const { container } = render(
    <SegmentControl
      options={[
        { label: "A", value: "a", "data-testid": "opt-a" },
        { label: "B", value: "b", "data-testid": "opt-b" },
      ]}
    />,
  );
  expect(container.querySelector("[data-testid='opt-a']")).toBeTruthy();
  expect(container.querySelector("[data-testid='opt-b']")).toBeTruthy();
});
```

## 常见踩坑

- **条件分支遗漏**：组件有空态/loading/error 等多个渲染分支时，`data-testid={dataTestId}` 只挂在主分支上，其他分支丢了透传。必须检查所有**有根元素的** return 路径。
- **Fragment 分支强行包元素**：为了挂 data-testid 把 `<>` 改成 `<span>` 会改变 DOM 结构，影响样式和布局。应保持 Fragment 不变，在 JSDoc 中说明限制。
- **类型定义未同步**：运行时透传了 `data-testid`，但 Props 类型没有 `"data-testid"?: string`，发包后 `.d.ts` 不认识。改完运行时必须同步改类型。
- **不要用 `extends React.HTMLAttributes`**：会暴露组件并不真正支持的 HTML 属性（如 `style`、`onClick`），造成类型承诺与实现不一致。只显式添加 `"data-testid"?: string`。
- **不要用 `...restProps` 展开**：会把未知属性透传到 DOM 上，可能引入意外行为。只显式解构和传递 `data-testid`。
- **覆盖 antd 类型丢字段**：用自定义 interface 替换 antd 的 option 类型时，容易丢掉 `title`、`className` 等原有字段。用 `&` 交叉类型扩展。
- **ref 回调属性残留**：`setAttribute` 设置的属性在 testId 变为 undefined 时不会自动清除，需要在 ref 回调中主动 `removeAttribute`。
- **ref 回调额外 DOM 层**：包裹的 `<span>` 会改变 DOM 结构，可能影响样式和快照测试，属于「最后手段」。
- **antd Input 有 allowClear/prefix/suffix 时**：`data-testid` 停在 wrapper `<span>` 上，到不了原生 `<input>`。基础 Input 组件用 ref 回调解决，Fields 层用注入 input 对象解决。
- **antd5 Segmented**：点击目标是 `<label class="antd5-segmented-item">`，不是内层内容。用 ref 回调（第三层）。
- **antd5 prefixCls**：在 `closest()` 选择器中始终使用 `@src/utils` 的 `Antd5PrefixCls`。
- **不要自动生成 testid**：只透传业务代码传入的值。自动生成的 ID 对测试编写者没有意义。
- **ParrotTrans 透传**：Trans 组件会将未识别的 props 通过 `createElement(parent, additionalProps, content)` 传给 parent 元素，可以直接在 `<ParrotTrans>` 上设置 `data-testid`。
- **antd Radio/Checkbox hidden input**：antd 将 `data-*` 透传到隐藏 `<input>` 上，但 change 事件绑在外层 `<label>`。不要把 `data-testid` 直接传给 antd 组件，用 marker ref + `closest()` 设置到 label 上。
