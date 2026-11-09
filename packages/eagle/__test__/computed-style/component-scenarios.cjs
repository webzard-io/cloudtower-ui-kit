const { expect } = require("@playwright/test");

const clickFirstButton = (page) =>
  page.locator("#storybook-root button").first().click();

async function openDialog(page) {
  await clickFirstButton(page);
  const wrap = page.locator(".ant-modal-wrap").last();
  await waitForEnter(wrap.locator(".ant-modal"));
  const mask = wrap.locator("..").locator(".ant-modal-mask");
  if (await mask.isVisible()) await waitForEnter(mask);
}

async function waitForEnter(popup) {
  await expect(popup).toBeVisible();
  await expect(popup).not.toHaveClass(/-(?:appear|enter)(?:[ -]|$)/);
  await expect(popup).toHaveCSS("opacity", "1");
}

const hoverTooltip = (trigger) => async (page) => {
  await page.locator(trigger).first().hover();
  await waitForEnter(page.locator(".ant-tooltip:visible"));
};

async function waitForLegacySelect(page) {
  const dropdowns = page.locator(".ant-select-dropdown:visible");
  await expect(dropdowns).toHaveCount(4);
  for (const dropdown of await dropdowns.all()) {
    await expect(dropdown).toHaveCSS("opacity", "1");
  }
}

async function sortTable(page) {
  await page
    .locator("#storybook-root th.ant-table-column-has-sorters")
    .first()
    .click();
}

async function openDateRange(page) {
  await page.locator(".date-input-content").click();
  await waitForEnter(
    page.locator(".ant-popover").filter({
      has: page.locator(".absolute-time-container"),
    })
  );
}

async function openDropdownMenu(page) {
  await page.locator(".ant-dropdown-trigger").click();
  await waitForEnter(page.locator(".ant-dropdown:visible"));
}

async function openAntd5Dropdown(page) {
  await page.getByText("Selectable", { exact: true }).hover();
  const popup = page.locator(".ant-dropdown").filter({
    has: page.getByRole("menuitem", { name: "Item 1" }),
  });
  await waitForEnter(popup);
}

function component(name, selector, prepare) {
  return { name, prepare, targets: { [name]: selector } };
}

module.exports = {
  "core-accordioncard--function-header": component(
    "AccordionCard",
    "#storybook-root > div"
  ),
  "core-alert-提示框--basic": component("Alert", "#storybook-root .ant-alert"),
  "core-antd5anchor--basic": component(
    "Antd5Anchor",
    "#storybook-root > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)"
  ),
  "core-antd5dropdown--basic": component(
    "Antd5Dropdown",
    ".ant-dropdown-menu-item",
    openAntd5Dropdown
  ),
  "core-antd5tree-树形控件--basic": component(
    "Antd5Tree",
    "#storybook-root .antd5-tree"
  ),
  "core-arch--aarch-64": component("Arch", "#storybook-root > span"),
  "core-autocomplete-自动完成--basic": component(
    "AutoComplete",
    "#storybook-root .ant-select"
  ),
  "core-avatar-头像--basic": component("Avatar", "#storybook-root > span"),
  "core-banner-通知横幅--error": component("Banner", "#storybook-root > div"),
  "core-baseicon--primary": component("BaseIcon", "#storybook-root > span"),
  "core-basiccterror-通用错误显示--basic": component(
    "BasicCTError",
    "#storybook-root > span"
  ),
  "core-bit--simple": {
    name: "Bit",
    targets: {
      Bit: "#storybook-root > span",
      "Units.Bit": "#storybook-root > span",
    },
  },
  "core-bitpersecond--simple": {
    name: "BitPerSecond",
    targets: {
      BitPerSecond: "#storybook-root > span",
      "Units.BitPerSecond": "#storybook-root > span",
    },
  },
  "core-blankstate-空白状态--default-medium-blank-state": component(
    "BlankState",
    "#storybook-root > div"
  ),
  "core-bps--simple": {
    name: "Bps",
    targets: {
      Bps: "#storybook-root > span",
      "Units.Bps": "#storybook-root > span",
    },
  },
  "core-breadcrumb--demo": component("Breadcrumb", "#storybook-root > div"),
  "core-button--basic": component("Button", "#storybook-root .ant-btn"),
  "core-byte--simple": {
    name: "Byte",
    targets: {
      Byte: "#storybook-root > span",
      "Units.Byte": "#storybook-root > span",
    },
  },
  "core-bytepersecond--simple": {
    name: "BytePerSecond",
    targets: {
      BytePerSecond: "#storybook-root > span",
      "Units.BytePerSecond": "#storybook-root > span",
    },
  },
  "core-calendar--basic": component(
    "Calendar",
    "#storybook-root .ant-picker-calendar"
  ),
  "core-card--hoverable": component("Card", "#storybook-root .card-wrapper"),
  "core-cascader-级联组件--size": component(
    "Cascader",
    "#storybook-root .antd5-cascader"
  ),
  "core-circleprogress--hundred-percent": component(
    "CircleProgress",
    "#storybook-root > div"
  ),
  "core-detailcard--string-title-and-children": component(
    "DetailCard",
    "#storybook-root > div"
  ),
  "core-donutchart--default": component("DonutChart", "#storybook-root > div"),
  "core-dropdownmenu--default-example": component(
    "DropdownMenu",
    ".ant-dropdown-menu",
    openDropdownMenu
  ),
  "core-duration-持续时间展示--basic": {
    name: "Duration",
    targets: {
      Duration: "#storybook-root > span",
      "Units.Duration": "#storybook-root > span",
    },
  },
  "core-expandable-list-可展开收起列表--template": component(
    "ExpandableContainer",
    "#storybook-root .ant-card"
  ),
  "core-frequency--simple": {
    name: "Frequency",
    targets: {
      Frequency: "#storybook-root > span",
      "Units.Frequency": "#storybook-root > span",
    },
  },
  "core-icon--simple": component(
    "Icon",
    "#storybook-root > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)"
  ),
  "core-immersivedialog-全屏弹窗--center-immersive-dialog": component(
    "ImmersiveDialog",
    ".ant-modal-content",
    openDialog
  ),
  "core-input--input-story": component("Input", "#storybook-root .ant-input"),
  "core-inputgroup--simple": component(
    "InputGroup",
    "#storybook-root .ant-input-group"
  ),
  "core-inputinteger-整数输入--middle-size": {
    name: "InputInteger",
    targets: {
      AntdIntStyled: "#storybook-root .ant-input-number",
      InputInteger: "#storybook-root .ant-input-number",
    },
  },
  "core-inputpassword-密码输入--small-size": {
    name: "InputPassword",
    targets: {
      AntdPasswordInputStyled: "#storybook-root .ant-input-password",
      InputPassword: "#storybook-root .ant-input-password",
    },
  },
  "core-legacymodal-deprecated-弹窗（已废弃）--with-aside": {
    name: "LegacyModal",
    prepare: openDialog,
    targets: {
      LegacyModal: ".ant-modal-content",
      ModalStack: ".ant-modal-content",
    },
  },
  "core-legacyselect--basic": component(
    "LegacySelect",
    ".ant-select-dropdown:not(.ant-select-dropdown-hidden) .ant-select-item-option",
    waitForLegacySelect
  ),
  "core-legend-图例--basic": component(
    "Legend",
    "#storybook-root .ui-kit-status-legend"
  ),
  "core-linechart-折线图--primary": component(
    "LineChart",
    "#storybook-root .metric-wrapper"
  ),
  "core-link-文本链接--basic": component("Link", "#storybook-root .ant-btn"),
  "core-loading--basic": component("Loading", "#storybook-root > div"),
  "core-localupload-本地文件上传--single-file-validating": {
    name: "LocalUpload",
    targets: {
      LocalUpload: "#storybook-root > div",
      "LocalUpload.Description": "#storybook-root .upload-description",
      "LocalUpload.Dragger": "#storybook-root .upload-drag",
      "LocalUpload.Label": "#storybook-root .upload-label",
    },
  },
  "core-logview-日志查看器--basic": component(
    "LogView",
    "#storybook-root .xterm-screen"
  ),
  "core-mediumdialog-中弹窗--basic": component(
    "MediumDialog",
    ".ant-modal-content",
    openDialog
  ),
  "core-metric--primary": {
    name: "Metric",
    // Keep the third legend collapsed across host fonts.
    viewport: { width: 1000, height: 1000 },
    async prepare(page) {
      await expect(
        page.locator(".metric-toolbar .ant-dropdown-trigger")
      ).toBeVisible();
    },
    targets: {
      Metric: "#storybook-root .metric-wrapper",
      MetricActions: "#storybook-root .metric-toolbar .metric-extra .info-item",
    },
  },
  "core-nav-导航栏--basic": component(
    "Nav",
    "#storybook-root > div:nth-child(1) > header:nth-child(1)"
  ),
  "core-pagination--default-pagination": component(
    "Pagination",
    "#storybook-root .pagination-wrapper"
  ),
  "core-percent--simple": {
    name: "Percent",
    targets: {
      Percent: "#storybook-root > span",
      "Units.Percent": "#storybook-root > span",
    },
  },
  "core-progress-进度条--basic": component(
    "Progress",
    "#storybook-root > div:nth-child(1) > div:nth-child(1)"
  ),
  "core-radio--basic": component("Radio", "#storybook-root .ant-radio-wrapper"),
  "core-radiobutton--basic": component(
    "RadioButton",
    "#storybook-root .ant-radio-button-wrapper"
  ),
  "core-radiogroup--basic": component(
    "RadioGroup",
    "#storybook-root .ant-radio-group"
  ),
  "core-searchinput-搜索框--basic": component(
    "SearchInput",
    "#storybook-root .ant-input-affix-wrapper"
  ),
  "core-second-秒数展示--basic": {
    name: "Second",
    targets: {
      Second: "#storybook-root > span",
      "Units.Second": "#storybook-root > span",
    },
  },
  "core-segmentcontrol-分段控件--simple": component(
    "SegmentControl",
    "#storybook-root .antd5-segmented"
  ),
  "core-select-选择器--multiple": component(
    "Select",
    "#storybook-root .ant-select"
  ),
  "core-sidebarmenu-侧边栏菜单--basic": component(
    "SidebarMenu",
    "#storybook-root .antd5-menu"
  ),
  "core-sider-侧边栏--default": component(
    "Sider",
    "#storybook-root .ant-layout-sider"
  ),
  "core-simplepagination--basic": component(
    "SimplePagination",
    "#storybook-root .pagination-wrapper"
  ),
  "core-skeleton--content": {
    name: "SkeletonContent",
    targets: {
      "Skeleton.Content":
        "#storybook-root > section:nth-child(1) > div:nth-child(2) > div:nth-child(1)",
      SkeletonContent:
        "#storybook-root > section:nth-child(1) > div:nth-child(2) > div:nth-child(1)",
    },
  },
  "core-smalldialog-小弹窗--basic": component(
    "SmallDialog",
    ".ant-modal-content",
    openDialog
  ),
  "core-space--simple": component("Space", "#storybook-root .ant-space"),
  "core-speed--simple": {
    name: "Speed",
    targets: {
      Speed: "#storybook-root > span",
      "Units.Speed": "#storybook-root > span",
    },
  },
  "core-statuscapsule-状态胶囊--basic": component(
    "StatusCapsule",
    "#storybook-root .ant-tag"
  ),
  "core-steps--horizontal": component(
    "Steps",
    "#storybook-root > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1)"
  ),
  "core-switch--basic": component("Switch", "#storybook-root .ant-switch"),
  "core-tab-标签页--basic": component(
    "Tab",
    "#storybook-root > div:nth-child(1) > div:nth-child(1)"
  ),
  "core-table-表格组件--basic": component(
    "Table",
    "#storybook-root .table-container"
  ),
  "core-table-表格组件--with-sorter": component(
    "ColumnTitle",
    "#storybook-root .ant-table-column-sorters .order-icon",
    sortTable
  ),
  "core-tableform-表格表单--basic": component(
    "TableForm",
    "#storybook-root > div:nth-child(1) > div:nth-child(1)"
  ),
  "core-tag--basic": component("Tag", "#storybook-root .ant-tag"),
  "core-time--simple": component("Time", "#storybook-root .time-wrapper"),
  "core-timeline-时间线--success-timeline": component(
    "Timeline",
    "#storybook-root > div"
  ),
  "core-timezoneselect--time-zone-select-story": component(
    "TimeZoneSelect",
    "#storybook-root .ant-select"
  ),
  "core-token--basic": component("Token", "#storybook-root .ant-tag"),
  "core-tooltip-悬浮提示--tooltip-with-button": component(
    "Tooltip",
    ".ant-tooltip:not(.ant-tooltip-hidden) .ant-tooltip-inner",
    hoverTooltip("#storybook-root button")
  ),
  "core-truncate--basic": component("Truncate", "#storybook-root > div"),
  "core-wizarddialog-向导弹窗--step-wizard-dialog": component(
    "WizardDialog",
    ".ant-modal-content",
    openDialog
  ),
  "corex-barchart--demo": component("BarChart", "#storybook-root > div"),
  "corex-batchoperation--demo": component(
    "BatchOperation",
    "#storybook-root > div:nth-child(1) > div:nth-child(1)"
  ),
  "corex-chartwithtooltip--bar-chart": component(
    "ChartWithTooltip",
    ".ant-tooltip:not(.ant-tooltip-hidden) .ant-tooltip-inner",
    hoverTooltip("#storybook-root .unit-chart")
  ),
  "corex-checkpointlist-检查项列表--basic": component(
    "CheckPointList",
    "#storybook-root > div"
  ),
  "corex-circleloading-环形-loading-indicator--basic": component(
    "CircleLoading",
    "#storybook-root > div"
  ),
  "corex-copy-copybutton-复制按钮--default": component(
    "CopyButton",
    "#storybook-root > div:nth-child(1) > span:nth-child(2)"
  ),
  "corex-copy-copytooltip-复制提示工具--default": component(
    "CopyTooltip",
    ".ant-tooltip:not(.ant-tooltip-hidden) .ant-tooltip-inner",
    hoverTooltip("#storybook-root > div > span:nth-child(2)")
  ),
  "corex-croncalendar--basic": component(
    "CronCalendar",
    "#storybook-root > div:nth-child(1) > div:nth-child(2)"
  ),
  "corex-cronplan--basic": component(
    "CronPlan",
    "#storybook-root header .retain",
    clickFirstButton
  ),
  "corex-daterangepicker--demo": component(
    "DateRangePicker",
    ".absolute-time-container .date",
    openDateRange
  ),
  "corex-deprecateddonutchart--demo": component(
    "DeprecatedDonutChart",
    "#storybook-root > div"
  ),
  "corex-dialog-deletedialog-删除确认对话框--basic": component(
    "DeleteDialog",
    ".ant-modal-content",
    openDialog
  ),
  "corex-dialog-rejectdialog-回绝对话框--single-reject": component(
    "RejectDialog",
    ".ant-modal-content",
    openDialog
  ),
  "corex-gobackbutton--basic": component(
    "GoBackButton",
    "#storybook-root > span"
  ),
  "corex-i18nnametag--default": component(
    "I18nNameTag",
    "#storybook-root .ant-tag"
  ),
  "corex-inforowlist-信息列表--basic": component(
    "InfoRowList",
    "#storybook-root > div"
  ),
  "corex-kubeconfigmodal-kubeconfig-下载模态框--basic": component(
    "KubeConfigModal",
    ".ant-modal-content",
    openDialog
  ),
  "corex-namestooltip--basic": component(
    "NamesTooltip",
    ".ant-tooltip:not(.ant-tooltip-hidden) .ant-tooltip-inner",
    hoverTooltip("#storybook-root .dashed-border-bottom")
  ),
  "corex-show-条件渲染--basic-true": component("Show", "#storybook-root > div"),
  "corex-sidebarsubtitle--basic": component(
    "SidebarSubtitle",
    "#storybook-root > span"
  ),
  "corex-sortablelist--basic": {
    name: "SortableList",
    targets: {
      SortableList:
        "#storybook-root > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)",
      "SortableList.Item": '#storybook-root [data-rbd-draggable-id="item-0"]',
    },
  },
  "corex-summarytable--basic": component(
    "SummaryTable",
    "#storybook-root .summary-table"
  ),
  "corex-switchwithtext--basic": component(
    "SwitchWithText",
    "#storybook-root > span"
  ),
  "corex-underlinetooltip-带可配置下划线的文字提示--default": component(
    "UnderlineTooltip",
    ".ant-tooltip:not(.ant-tooltip-hidden) .ant-tooltip-inner",
    hoverTooltip("#storybook-root .content")
  ),
  "corex-unitwithchart--bar-chart": component(
    "UnitWithChart",
    "#storybook-root > div"
  ),
  "kitstoreprovider-局部-store--with-kit-store-provider-primary": component(
    "KitStoreProvider",
    "#storybook-root .ant-btn"
  ),
  "regression-computedstylecomponents--antd": {
    name: "antd",
    async prepare(page) {
      await Promise.all(
        [
          ".style-sample-tooltip",
          ".style-sample-dropdown",
          ".style-sample-popover",
        ].map((selector) => waitForEnter(page.locator(selector)))
      );
    },
    targets: {
      AntdAutoComplete: '[data-style-id="AntdAutoComplete"] > *',
      "AntdAutoComplete.Option":
        '[data-style-id="AntdOption"] .ant-select-item-option',
      AntdBadge: '[data-style-id="AntdBadge"] > *',
      AntdButton: '[data-style-id="AntdButton"] > *',
      AntdCheckbox: '[data-style-id="AntdCheckbox"] > *',
      AntdCollapse: '[data-style-id="AntdCollapse"] > *',
      "AntdCollapse.Panel":
        '[data-style-id="AntdCollapse"] .ant-collapse-item-active',
      AntdDivider: '[data-style-id="AntdDivider"] > *',
      AntdDrawer: '[data-style-id="AntdDrawer"] .ant-drawer-content',
      AntdEmpty: '[data-style-id="AntdEmpty"] > *',
      AntdInput: '[data-style-id="AntdInput"] > *',
      AntdModal: '[data-style-id="AntdModal"] .ant-modal-content',
      AntdOption: '[data-style-id="AntdOption"] .ant-select-item-option',
      AntdSelect: '[data-style-id="AntdSelect"] > *',
      "AntdSelect.OptGroup":
        '[data-style-id="AntdSelectOptGroup"] .ant-select-item-group',
      "AntdSelect.Option":
        '[data-style-id="AntdOption"] .ant-select-item-option',
      AntdSelectOptGroup:
        '[data-style-id="AntdSelectOptGroup"] .ant-select-item-group',
      AntdSkeleton: '[data-style-id="AntdSkeleton"] > *',
      "AntdSkeleton.Button":
        '[data-style-id="SkeletonButton"] .ant-skeleton-button',
      AntdSteps: '[data-style-id="AntdSteps"] > *',
      "AntdSteps.Step": '[data-style-id="AntdSteps"] .ant-steps-item',
      AntdSwitch: '[data-style-id="AntdSwitch"] > *',
      AntdTable: '[data-style-id="AntdTable"] > *',
      AntdTimePicker: '[data-style-id="AntdTimePicker"] > *',
      AntdTimeline: '[data-style-id="AntdTimeline"] > *',
      "AntdTimeline.Item":
        '[data-style-id="AntdTimelineItem"] .ant-timeline-item',
      AntdTimelineItem: '[data-style-id="AntdTimelineItem"] > *',
      AntdTooltip: ".style-sample-tooltip .ant-tooltip-inner",
      AntdTreeSelect: '[data-style-id="AntdTreeSelect"] > *',
      Col: '[data-style-id="Col"] > *',
      DatePicker: '[data-style-id="DatePicker"] > *',
      "DatePicker.RangePicker":
        '[data-style-id="DatePickerRangePicker"] .ant-picker-range',
      DatePickerRangePicker: '[data-style-id="DatePickerRangePicker"] > *',
      Dropdown: ".style-sample-dropdown .ant-dropdown-menu",
      Layout: '[data-style-id="Layout"] > *',
      List: '[data-style-id="List"] > *',
      "List.Item": '[data-style-id="ListItem"] .ant-list-item',
      ListItem: '[data-style-id="ListItem"] > *',
      Menu: '[data-style-id="Menu"] > *',
      "Menu.ItemGroup": '[data-style-id="MenuItemGroup"] .ant-menu-item-group',
      MenuItemGroup: '[data-style-id="MenuItemGroup"] > *',
      Popover: ".style-sample-popover .ant-popover-inner",
      Row: '[data-style-id="Row"] > *',
      SkeletonButton: '[data-style-id="SkeletonButton"] > *',
      Tabs: '[data-style-id="Tabs"] > *',
      "Tabs.TabPane": '[data-style-id="TabsTabPane"] .ant-tabs-tabpane-active',
      TabsTabPane: '[data-style-id="TabsTabPane"] > *',
      Tree: '[data-style-id="Tree"] > *',
      Typography: '[data-style-id="Typography"] > *',
      "Typography.Text": '[data-style-id="TypographyText"] .ant-typography',
      TypographyText: '[data-style-id="TypographyText"] > *',
      Upload: '[data-style-id="Upload"] > *',
      "Upload.Dragger": '[data-style-id="UploadDragger"] .ant-upload-drag',
      UploadDragger: '[data-style-id="UploadDragger"] > *',
    },
  },
  "regression-computedstylecomponents--basic": {
    name: "basic",
    targets: {
      "Antd5Anchor.Link": '[data-style-id="Antd5Anchor.Link"] > *',
      Antd5Flex: '[data-style-id="Antd5Flex"] > *',
      AntdInputNumberStyled: '[data-style-id="AntdInputNumberStyled"] > *',
      Badge: '[data-style-id="Badge"] > *',
      ButtonGroup: '[data-style-id="ButtonGroup"] > *',
      Checkbox: '[data-style-id="Checkbox"] > *',
      ConfigProvider: '[data-style-id="ConfigProvider"] > *',
      Counting: '[data-style-id="Counting"] > *',
      DeprecatedProgress: '[data-style-id="DeprecatedProgress"] > *',
      DropdownTransition: '[data-style-id="DropdownTransition"] > *',
      Empty: '[data-style-id="Empty"] > *',
      Error: '[data-style-id="Error"] > *',
      ErrorBoundary: '[data-style-id="ErrorBoundary"] > *',
      ExtraOverflow: '[data-style-id="ExtraOverflow"] > *',
      FailedLoad: '[data-style-id="FailedLoad"] > *',
      Form: '[data-style-id="Form"] > *',
      "Form.Item": '[data-style-id="Form.Item"] > *',
      "Form.List": '[data-style-id="Form.List"] > *',
      "Form.Provider": '[data-style-id="Form.Provider"] > *',
      InputNumber: '[data-style-id="InputNumber"] > *',
      InputTagItem: '[data-style-id="InputTagItem"] > *',
      Overflow: '[data-style-id="Overflow"] > *',
      OverflowTooltip: '[data-style-id="OverflowTooltip"] > *',
      ParrotTrans: '[data-style-id="ParrotTrans"] > *',
      "Tag.NameTag": '[data-style-id="Tag.NameTag"] > *',
      "Tag.SplitTag": '[data-style-id="Tag.SplitTag"] > *',
      TextArea: '[data-style-id="TextArea"] > *',
      TimePicker: '[data-style-id="TimePicker"] > *',
      "Tooltip.EllipsisContent":
        '[data-style-id="Tooltip.EllipsisContent"] > *',
      UIKitProvider: '[data-style-id="UIKitProvider"] > *',
    },
  },
  "regression-computedstylecomponents--compound": {
    name: "compound",
    prepare: (page) => waitForEnter(page.locator(".style-sample-tree-select")),
    targets: {
      "AccordionCard.CloseButton":
        '[data-style-id="AccordionCard.CloseButton"] svg',
      "Antd5Tree.DirectoryTree":
        '[data-style-id="Antd5Tree.DirectoryTree"] .antd5-tree-directory',
      "Antd5Tree.TreeNode":
        '[data-style-id="Antd5Tree.TreeNode"] .antd5-tree-treenode',
      "AntdBadge.Ribbon": '[data-style-id="AntdBadge.Ribbon"] .ant-ribbon',
      "AntdButton.Group": '[data-style-id="AntdButton.Group"] .ant-btn-group',
      "AntdCheckbox.Group":
        '[data-style-id="AntdCheckbox.Group"] .ant-checkbox-group',
      "AntdInput.Group": '[data-style-id="AntdInput.Group"] .ant-input-group',
      "AntdInput.Password":
        '[data-style-id="AntdInput.Password"] .ant-input-password',
      "AntdInput.Search":
        '[data-style-id="AntdInput.Search"] .ant-input-search',
      "AntdInput.TextArea": '[data-style-id="AntdInput.TextArea"] textarea',
      "AntdSkeleton.Avatar":
        '[data-style-id="AntdSkeleton.Avatar"] .ant-skeleton-avatar',
      "AntdSkeleton.Image":
        '[data-style-id="AntdSkeleton.Image"] .ant-skeleton-image',
      "AntdSkeleton.Input":
        '[data-style-id="AntdSkeleton.Input"] .ant-skeleton-input',
      "AntdTable.Column":
        '[data-style-id="AntdTable.ColumnGroup"] thead tr:nth-child(2) th',
      "AntdTable.ColumnGroup":
        '[data-style-id="AntdTable.ColumnGroup"] thead th[colspan]',
      "AntdTable.Summary.Cell":
        '[data-style-id="AntdTable.Summary.Row"] tfoot td',
      "AntdTable.Summary.Row":
        '[data-style-id="AntdTable.Summary.Row"] tfoot tr',
      "AntdTimePicker.RangePicker":
        '[data-style-id="AntdTimePicker.RangePicker"] .ant-picker-range',
      "AntdTreeSelect.TreeNode":
        ".style-sample-tree-select .ant-select-tree-treenode",
      "DatePicker.MonthPicker":
        '[data-style-id="DatePicker.MonthPicker"] input',
      "DatePicker.QuarterPicker":
        '[data-style-id="DatePicker.QuarterPicker"] input',
      "DatePicker.TimePicker": '[data-style-id="DatePicker.TimePicker"] input',
      "DatePicker.WeekPicker": '[data-style-id="DatePicker.WeekPicker"] input',
      "DatePicker.YearPicker": '[data-style-id="DatePicker.YearPicker"] input',
      "Dropdown.Button":
        '[data-style-id="Dropdown.Button"] .ant-dropdown-button',
      "KitTableContext.Consumer": '[data-style-id="KitTableContext"] button',
      "KitTableContext.Provider": '[data-style-id="KitTableContext"] button',
      "Layout.Content": '[data-style-id="Layout"] .ant-layout-content',
      "Layout.Footer": '[data-style-id="Layout"] .ant-layout-footer',
      "Layout.Header": '[data-style-id="Layout"] .ant-layout-header',
      "Layout.Sider": '[data-style-id="Layout"] .ant-layout-sider',
      "List.Item.Meta": '[data-style-id="List.Item.Meta"] .ant-list-item-meta',
      "ListItem.Meta": '[data-style-id="List.Item.Meta"] .ant-list-item-meta',
      "LocalUpload.Button": '[data-style-id="LocalUpload"] .upload-button',
      "LocalUpload.FileInfo":
        '[data-style-id="LocalUpload.FileInfo"] .file-error-wrapper',
      "LocalUpload.FileList": '[data-style-id="LocalUpload"] .upload-file-list',
      "LocalUpload.Wrapper": '[data-style-id="LocalUpload"] > div',
      "Menu.Divider": '[data-style-id="Menu"] .ant-menu-item-divider',
      "Menu.Item": '[data-style-id="Menu"] .ant-menu-item-selected',
      "Menu.SubMenu": '[data-style-id="Menu"] .ant-menu-submenu-open',
      "MessageContext.Consumer": '[data-style-id="MessageContext"] button',
      "MessageContext.Provider": '[data-style-id="MessageContext"] button',
      "Tree.DirectoryTree":
        '[data-style-id="Tree.DirectoryTree"] .ant-tree-directory',
      "Tree.TreeNode": '[data-style-id="Tree.TreeNode"] .ant-tree-treenode',
      "Typography.Link": '[data-style-id="Typography"] a.ant-typography',
      "Typography.Paragraph": '[data-style-id="Typography"] div.ant-typography',
      "Typography.Title": '[data-style-id="Typography"] h1.ant-typography',
    },
  },
  "regression-computedstylecomponents--fields": {
    name: "fields",
    targets: {
      "Fields.Boolean": '[data-style-id="Fields.Boolean"] > *',
      "Fields.DateTime": '[data-style-id="Fields.DateTime"] > *',
      "Fields.DateTimeRange": '[data-style-id="Fields.DateTimeRange"] > *',
      "Fields.Enum": '[data-style-id="Fields.Enum"] > *',
      "Fields.Float": '[data-style-id="Fields.Float"] > *',
      "Fields.Int": '[data-style-id="Fields.Int"] > *',
      "Fields.Integer": '[data-style-id="Fields.Integer"] > *',
      "Fields.String": '[data-style-id="Fields.String"] > *',
      "Fields.TextArea": '[data-style-id="Fields.TextArea"] > *',
      "Fields.TimePicker": '[data-style-id="Fields.TimePicker"] > *',
    },
  },
  "regression-computedstylecomponents--parts": {
    name: "parts",
    async prepare(page) {
      await waitForEnter(
        page.locator('[data-style-id="FormItem"] .ant-form-item-explain')
      );
    },
    empty: { EmptyRowMenu: '[data-style-id="EmptyRowMenu"]' },
    targets: {
      AbsoluteDate: '[data-style-id="AbsoluteDate"] > *',
      Area: '[data-style-id="Area"] > *',
      BreadWrapper: '[data-style-id="BreadWrapper"] > *',
      CascaderDoubleRowOption: '[data-style-id="CascaderDoubleRowOption"] > *',
      CascaderOptionWithCount: '[data-style-id="CascaderOptionWithCount"] > *',
      ChartWithUnit: '[data-style-id="ChartWithUnit"] > *',
      CheckPointItem: '[data-style-id="CheckPointItem"] > *',
      ColorBlock: '[data-style-id="ColorBlock"] > *',
      DateRangePickerCalendar: '[data-style-id="DateRangePickerCalendar"] > *',
      ExpandIcon: '[data-style-id="ExpandIcon"] > *',
      ExpandableItem: '[data-style-id="ExpandableItem"] > *',
      FormItem: '[data-style-id="FormItem"] .ant-form-item-explain',
      InputTime: '[data-style-id="InputTime"] > *',
      LegendComponent: '[data-style-id="LegendComponent"] > *',
      LegendIcon: '[data-style-id="LegendIcon"] > *',
      LineChartColorBlock: '[data-style-id="LineChartColorBlock"] > *',
      LineChartLegend: '[data-style-id="LineChartLegend"] > *',
      MetricLegend: '[data-style-id="MetricLegend"] > *',
      NotDataContent: '[data-style-id="NotDataContent"] > *',
      Pointer: '[data-style-id="Pointer"] > *',
      PresetCascaderHeader: '[data-style-id="PresetCascaderHeader"] > *',
      PresetCascaderRender: '[data-style-id="PresetCascaderRender"] > *',
      RelativeTime: '[data-style-id="RelativeTime"] > *',
      RenderChart: '[data-style-id="RenderChart"] > *',
      RenderMenuItem: '[data-style-id="RenderMenuItem"] > *',
      RoundOrder: '[data-style-id="RoundOrder"] > *',
      StatusIcon: '[data-style-id="StatusIcon"] > *',
      SummaryTableRow: '[data-style-id="SummaryTableRow"] > *',
      TabMenu: '[data-style-id="TabMenu"] > *',
      TableLoading: '[data-style-id="TableLoading"] > *',
      TableSkeleton: '[data-style-id="TableSkeleton"] > *',
      TitleArea: '[data-style-id="TitleArea"] > *',
      TooltipFormatter: '[data-style-id="TooltipFormatter"] > *',
    },
  },
  "regression-computedstylecomponents--styled": {
    name: "styled",
    targets: {
      CommonContent: '[data-style-id="CommonContent"] > *',
      ContentWrapper: '[data-style-id="ContentWrapper"] > *',
      Desc: '[data-style-id="Desc"] > *',
      Description: '[data-style-id="Description"] > *',
      Divider: '[data-style-id="Divider"] > *',
      Dot: '[data-style-id="Dot"] > *',
      ErrorSpan: '[data-style-id="ErrorSpan"] > *',
      ExpandArrow: '[data-style-id="ExpandArrow"] > *',
      FieldTitle: '[data-style-id="FieldTitle"] > *',
      FormField: '[data-style-id="FormField"] > *',
      FormItemDiv: '[data-style-id="FormItemDiv"] > *',
      FormSectionTitle: '[data-style-id="FormSectionTitle"] > *',
      FormWrapper: '[data-style-id="FormWrapper"] > *',
      FullView: '[data-style-id="FullView"] > *',
      LightDesc: '[data-style-id="LightDesc"] > *',
      LoadingWrapper: '[data-style-id="LoadingWrapper"] > *',
      ModalBody: '[data-style-id="ModalBody"] > *',
      NameTag: '[data-style-id="NameTag"] > *',
      OperationWraper: '[data-style-id="OperationWraper"] > *',
      RadioDesc: '[data-style-id="RadioDesc"] > *',
      SelectOptionDisabledText:
        '[data-style-id="SelectOptionDisabledText"] > *',
      TagSpan: '[data-style-id="TagSpan"] > *',
      TertiaryText: '[data-style-id="TertiaryText"] > *',
      WizardBody: '[data-style-id="WizardBody"] > *',
    },
  },
};
