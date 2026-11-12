import * as E from "@src/index";
import { ChartActions } from "@src/store/chart";
import dayjs from "dayjs";
import moment from "moment";
import React from "react";

const meta = { title: "Regression/ComputedStyleComponents" };
export default meta;

function Samples({ examples }: { examples: Record<string, React.ReactNode> }) {
  return (
    <div data-style-root>
      {Object.entries(examples).map(([name, example]) => (
        <section key={name} data-style-id={name} style={{ margin: 12 }}>
          {example}
        </section>
      ))}
    </div>
  );
}

function BrokenSample(): React.ReactElement {
  throw new Error("Sample error");
}

export const Basic = () => (
  <Samples
    examples={{
      AntdInputNumberStyled: (
        <E.AntdInputNumberStyled controls defaultValue={10} />
      ),
      Counting: <E.Counting stop render={() => <span>1 second</span>} />,
      Form: (
        <E.Form>
          <E.Form.Item label="Name">
            <E.Input />
          </E.Form.Item>
        </E.Form>
      ),
      OverflowTooltip: <E.OverflowTooltip content="Example tooltip" />,
      "Tooltip.EllipsisContent": (
        <E.Tooltip.EllipsisContent tooltip="Details" maxHeight={50} />
      ),
      UIKitProvider: (
        <E.UIKitProvider lng="zh-CN">
          <E.Switch defaultChecked />
        </E.UIKitProvider>
      ),
      "Antd5Anchor.Link": (
        <E.Antd5Anchor>
          <E.Antd5Anchor.Link href="#node" title="Node A" />
        </E.Antd5Anchor>
      ),
      "Form.List": (
        <E.Form initialValues={{ nodes: ["Node A"] }}>
          <E.Form.List name="nodes">
            {(fields) =>
              fields.map(({ key, name }) => (
                <E.Form.Item key={key} name={name}>
                  <E.Input />
                </E.Form.Item>
              ))
            }
          </E.Form.List>
        </E.Form>
      ),
      "Form.Provider": (
        <E.Form.Provider>
          <E.Form name="details">
            <E.Form.Item label="Name">
              <E.Input />
            </E.Form.Item>
          </E.Form>
        </E.Form.Provider>
      ),
      "Form.Item": (
        <E.Form.Item label="Name">
          <E.Input />
        </E.Form.Item>
      ),
      "Tag.NameTag": <E.Tag.NameTag>Node A</E.Tag.NameTag>,
      "Tag.SplitTag": (
        <E.Tag.SplitTag
          color="blue"
          primaryContent="Node"
          secondaryContent="A"
        />
      ),
      Antd5Flex: (
        <E.Antd5Flex gap={8}>
          <span>Node A</span>
          <span>Node B</span>
        </E.Antd5Flex>
      ),
      Badge: <E.Badge count={3} />,
      ButtonGroup: (
        <E.ButtonGroup
          options={[
            { key: "create", children: "Create" },
            { key: "delete", children: "Delete", danger: true },
          ]}
        />
      ),
      Checkbox: <E.Checkbox defaultChecked>Enabled</E.Checkbox>,
      ConfigProvider: (
        <E.ConfigProvider>
          <E.Switch defaultChecked />
        </E.ConfigProvider>
      ),
      DeprecatedProgress: (
        <E.DeprecatedProgress percent={30} status="exception" />
      ),
      DropdownTransition: (
        <E.DropdownTransition visible timeout={200}>
          <E.Tag>Visible</E.Tag>
        </E.DropdownTransition>
      ),
      Empty: <E.Empty />,
      Error: <E.Error error="Sample error" />,
      ErrorBoundary: (
        <E.ErrorBoundary>
          <BrokenSample />
        </E.ErrorBoundary>
      ),
      FailedLoad: (
        <E.FailedLoad error="Sample error" refetch={async () => undefined} />
      ),
      InputNumber: <E.InputNumber defaultValue={10} />,
      InputTagItem: <E.InputTagItem>Filter</E.InputTagItem>,
      Overflow: (
        <div style={{ width: 100 }}>
          <E.Overflow overflow={<E.Tag>Overflow</E.Tag>}>
            <span>Long overflow sample</span>
          </E.Overflow>
        </div>
      ),
      ExtraOverflow: (
        <div style={{ width: 100 }}>
          <E.ExtraOverflow
            els={[<span key="long">Long overflow sample</span>]}
            extraEl={() => <E.Tag>More</E.Tag>}
          />
        </div>
      ),
      ParrotTrans: (
        <E.ParrotTrans
          defaults="<strong>Example</strong>"
          components={{ strong: <strong /> }}
        />
      ),
      TextArea: <E.TextArea defaultValue="Notes" />,
      TimePicker: <E.TimePicker defaultValue={moment("2026-01-15T12:00:00")} />,
    }}
  />
);

export const Fields = () => {
  const field = <T,>(value: T) => ({
    input: { name: "example", value, onChange() {}, onBlur() {}, onFocus() {} },
    meta: {},
  });
  return (
    <Samples
      examples={{
        "Fields.Boolean": <E.Fields.Boolean {...field(true)} />,
        "Fields.DateTime": (
          <E.Fields.DateTime {...field(moment("2026-01-15T12:00:00"))} />
        ),
        "Fields.DateTimeRange": (
          <E.Fields.DateTimeRange
            {...field(["2026-01-15T00:00:00", "2026-01-16T00:00:00"])}
          />
        ),
        "Fields.Enum": (
          <E.Fields.Enum
            {...field("Example")}
            enumValues={["Example", "Other"]}
          />
        ),
        "Fields.Float": <E.Fields.Float {...field(1.5)} />,
        "Fields.Int": <E.Fields.Int {...field(1)} />,
        "Fields.Integer": <E.Fields.Integer {...field(1)} />,
        "Fields.String": <E.Fields.String {...field("Example")} />,
        "Fields.TextArea": <E.Fields.TextArea {...field("Example")} />,
        "Fields.TimePicker": (
          <E.Fields.TimePicker {...field(moment("2026-01-15T12:00:00"))} />
        ),
      }}
    />
  );
};

export const Styled = () => (
  <Samples
    examples={{
      CommonContent: <E.CommonContent>Content</E.CommonContent>,
      ContentWrapper: <E.ContentWrapper>Content</E.ContentWrapper>,
      Desc: <E.Desc>Description</E.Desc>,
      Description: <E.Description>Description</E.Description>,
      Divider: <E.Divider />,
      Dot: <E.Dot />,
      ErrorSpan: <E.ErrorSpan>Invalid value</E.ErrorSpan>,
      ExpandArrow: <E.ExpandArrow />,
      FieldTitle: <E.FieldTitle>Name</E.FieldTitle>,
      FormField: <E.FormField>Field</E.FormField>,
      FormItemDiv: <E.FormItemDiv>Field</E.FormItemDiv>,
      FormSectionTitle: <E.FormSectionTitle>Settings</E.FormSectionTitle>,
      FormWrapper: <E.FormWrapper>Form</E.FormWrapper>,
      FullView: <E.FullView>Content</E.FullView>,
      LightDesc: <E.LightDesc>Description</E.LightDesc>,
      LoadingWrapper: <E.LoadingWrapper>Loading</E.LoadingWrapper>,
      ModalBody: <E.ModalBody>Content</E.ModalBody>,
      NameTag: <E.NameTag>Node A</E.NameTag>,
      OperationWraper: <E.OperationWraper>Operation</E.OperationWraper>,
      RadioDesc: <E.RadioDesc>Description</E.RadioDesc>,
      SelectOptionDisabledText: (
        <E.SelectOptionDisabledText>Unavailable</E.SelectOptionDisabledText>
      ),
      TagSpan: <E.TagSpan color="blue">Active</E.TagSpan>,
      TertiaryText: <E.TertiaryText>Details</E.TertiaryText>,
      WizardBody: <E.WizardBody>Content</E.WizardBody>,
    }}
  />
);

export const Antd = () => (
  <Samples
    examples={{
      AntdAutoComplete: (
        <E.AntdAutoComplete
          options={[{ value: "Example" }]}
          defaultValue="Example"
        />
      ),
      AntdBadge: <E.AntdBadge count={3} />,
      AntdButton: <E.AntdButton type="primary">Save</E.AntdButton>,
      AntdCheckbox: <E.AntdCheckbox defaultChecked>Enabled</E.AntdCheckbox>,
      AntdCollapse: (
        <E.AntdCollapse defaultActiveKey="panel">
          <E.AntdCollapse.Panel key="panel" header="Panel">
            Content
          </E.AntdCollapse.Panel>
        </E.AntdCollapse>
      ),
      AntdDivider: <E.AntdDivider>Section</E.AntdDivider>,
      AntdDrawer: (
        <E.AntdDrawer visible getContainer={false} mask={false} title="Details">
          Content
        </E.AntdDrawer>
      ),
      AntdEmpty: <E.AntdEmpty />,
      AntdInput: <E.AntdInput defaultValue="Example" />,
      AntdModal: (
        <E.AntdModal visible getContainer={false} mask={false} title="Confirm">
          Content
        </E.AntdModal>
      ),
      AntdSelect: <E.AntdSelect defaultValue="A" options={[{ value: "A" }]} />,
      AntdOption: (
        <E.AntdSelect
          defaultValue="A"
          open
          getPopupContainer={(node) => node?.parentElement || document.body}
        >
          <E.AntdOption value="A">Example</E.AntdOption>
        </E.AntdSelect>
      ),
      AntdSelectOptGroup: (
        <E.AntdSelect
          defaultValue="A"
          open
          getPopupContainer={(node) => node?.parentElement || document.body}
        >
          <E.AntdSelectOptGroup label="Group">
            <E.AntdOption value="A">Example</E.AntdOption>
          </E.AntdSelectOptGroup>
        </E.AntdSelect>
      ),
      AntdSkeleton: <E.AntdSkeleton />,
      AntdSteps: (
        <E.AntdSteps current={1}>
          <E.AntdSteps.Step title="Start" />
          <E.AntdSteps.Step title="Finish" />
        </E.AntdSteps>
      ),
      AntdSwitch: <E.AntdSwitch defaultChecked />,
      AntdTable: (
        <E.AntdTable
          pagination={false}
          columns={[{ title: "Name", dataIndex: "name" }]}
          dataSource={[{ key: "a", name: "Node A" }]}
        />
      ),
      AntdTimePicker: (
        <E.AntdTimePicker defaultValue={moment("2026-01-15T12:00:00")} />
      ),
      AntdTimeline: (
        <E.AntdTimeline>
          <E.AntdTimeline.Item>Started</E.AntdTimeline.Item>
        </E.AntdTimeline>
      ),
      AntdTimelineItem: (
        <E.AntdTimeline>
          <E.AntdTimelineItem color="red">Failed</E.AntdTimelineItem>
        </E.AntdTimeline>
      ),
      AntdTooltip: (
        <E.AntdTooltip
          overlayClassName="style-sample-tooltip"
          title="Details"
          visible
          getPopupContainer={(node) => node?.parentElement || document.body}
        >
          <span>Details</span>
        </E.AntdTooltip>
      ),
      AntdTreeSelect: (
        <E.AntdTreeSelect
          treeData={[{ title: "Node A", value: "a" }]}
          defaultValue="a"
        />
      ),
      Col: (
        <E.Row>
          <E.Col span={12}>Column</E.Col>
        </E.Row>
      ),
      DatePicker: <E.DatePicker defaultValue={moment("2026-01-15")} />,
      DatePickerRangePicker: (
        <E.DatePickerRangePicker
          defaultValue={[moment("2026-01-15"), moment("2026-01-16")]}
        />
      ),
      Dropdown: (
        <E.Dropdown
          overlayClassName="style-sample-dropdown"
          visible
          getPopupContainer={(node) => node?.parentElement || document.body}
          overlay={
            <E.Menu>
              <E.Menu.Item key="a">Open</E.Menu.Item>
            </E.Menu>
          }
        >
          <span>Actions</span>
        </E.Dropdown>
      ),
      Layout: (
        <E.Layout>
          <E.Layout.Header>Header</E.Layout.Header>
          <E.Layout.Content>Content</E.Layout.Content>
        </E.Layout>
      ),
      List: (
        <E.List
          dataSource={["Node A"]}
          renderItem={(item) => <E.List.Item>{item}</E.List.Item>}
        />
      ),
      ListItem: (
        <E.List>
          <E.ListItem>Node A</E.ListItem>
        </E.List>
      ),
      Menu: (
        <E.Menu selectedKeys={["a"]}>
          <E.Menu.Item key="a">Home</E.Menu.Item>
        </E.Menu>
      ),
      MenuItemGroup: (
        <E.Menu>
          <E.MenuItemGroup title="Group">
            <E.Menu.Item key="a">Home</E.Menu.Item>
          </E.MenuItemGroup>
        </E.Menu>
      ),
      Popover: (
        <E.Popover
          overlayClassName="style-sample-popover"
          visible
          content="Details"
          getPopupContainer={(node) => node?.parentElement || document.body}
        >
          <span>Details</span>
        </E.Popover>
      ),
      Row: (
        <E.Row>
          <E.Col span={12}>Column</E.Col>
        </E.Row>
      ),
      SkeletonButton: <E.SkeletonButton />,
      Tabs: (
        <E.Tabs>
          <E.Tabs.TabPane key="a" tab="Details">
            Content
          </E.Tabs.TabPane>
        </E.Tabs>
      ),
      TabsTabPane: (
        <E.Tabs>
          <E.TabsTabPane key="a" tab="Details">
            Content
          </E.TabsTabPane>
        </E.Tabs>
      ),
      Tree: (
        <E.Tree
          treeData={[{ key: "a", title: "Node A" }]}
          defaultSelectedKeys={["a"]}
        />
      ),
      Typography: (
        <E.Typography>
          <E.Typography.Title>Details</E.Typography.Title>
        </E.Typography>
      ),
      TypographyText: <E.TypographyText type="danger">Error</E.TypographyText>,
      Upload: (
        <E.Upload>
          <E.AntdButton>Upload</E.AntdButton>
        </E.Upload>
      ),
      UploadDragger: <E.UploadDragger>Drop a file</E.UploadDragger>,
    }}
  />
);

export const Parts = () => {
  const range: E.PickerDateRange = [dayjs("2026-01-15"), dayjs("2026-01-16")];
  const legend = { id: "a", name: "Node A", color: "#3182bd" };
  const streams = [
    {
      legend,
      points: [
        { t: 1768449600, v: 10 },
        { t: 1768453200, v: 20 },
      ],
      step: 3600,
      tolerance: 0,
    },
  ];
  return (
    <Samples
      examples={{
        AbsoluteDate: (
          <E.AbsoluteDate
            range={range}
            onChange={() => undefined}
            onOk={() => undefined}
          />
        ),
        Area: <E.Area items={[{ type: "title", children: "Progress" }]} />,
        BreadWrapper: (
          <E.BreadWrapper>
            <span className="breadcrumb-link">Home</span>
          </E.BreadWrapper>
        ),
        CascaderDoubleRowOption: (
          <E.CascaderDoubleRowOption leftTop="Node A" leftBottom="Ready" />
        ),
        CascaderOptionWithCount: (
          <E.CascaderOptionWithCount
            label="Nodes"
            count={{ selected: 1, total: 3 }}
          />
        ),
        ChartWithUnit: (
          <E.ChartWithUnit
            total={100}
            rawValue={25}
            items={[{ label: "Used", color: "#3182bd", value: 25 }]}
            unit="Percent"
            chartType="barChart"
          />
        ),
        CheckPointItem: (
          <E.CheckPointItem status="failed" description="Network check" />
        ),
        ColorBlock: <E.ColorBlock background="#3182bd" />,
        DateRangePickerCalendar: <E.DateRangePickerCalendar range={range} />,
        EmptyRowMenu: <E.EmptyRowMenu />,
        ExpandIcon: <E.ExpandIcon isActive />,
        ExpandableItem: (
          <E.ExpandableItem
            header="Details"
            order={1}
            defaultActive
            disableExpand
          >
            Content
          </E.ExpandableItem>
        ),
        FormItem: (
          <E.FormItem label="Name" validateStatus="error" help="Required">
            <E.Input />
          </E.FormItem>
        ),
        InputTime: <E.InputTime value={["12", "00", "00"]} />,
        LegendComponent: <E.LegendComponent {...legend} />,
        LegendIcon: <E.LegendIcon shape="square" />,
        LineChartColorBlock: (
          <E.LineChartColorBlock background="#3182bd" borderd />
        ),
        LineChartLegend: (
          <E.LineChartLegend
            streams={[]}
            metricName="cpu"
            deselected={[]}
            hovering={[]}
            hovereringSelf={[]}
            legends={[legend]}
            onClick={() => undefined}
            onHover={() => undefined}
          />
        ),
        MetricLegend: (
          <E.MetricLegend
            streams={streams}
            metricName="cpu"
            deselected={[]}
            legends={[legend]}
            onClick={() => undefined}
          />
        ),
        NotDataContent: <E.NotDataContent content="No data" />,
        Pointer: <PointerSample />,
        PresetCascaderHeader: (
          <E.PresetCascaderHeader defaultContent={{ label: "Nodes" }} />
        ),
        PresetCascaderRender: (
          <E.PresetCascaderRender menus={<div>Node A</div>} />
        ),
        RelativeTime: <E.RelativeTime search onChange={() => undefined} />,
        RenderChart: (
          <E.RenderChart
            metricName="cpu"
            syncId="snapshot"
            height={160}
            type={E.GraphType.Area}
            showXAxis
            showLegend
            metric={{ sample_streams: streams, dropped: false, unit: "%" }}
            tooltipProps={{}}
          />
        ),
        RenderMenuItem: (
          <E.Menu>{E.RenderMenuItem({ key: "a", title: "Open" })}</E.Menu>
        ),
        RoundOrder: <E.RoundOrder order={1}>First</E.RoundOrder>,
        StatusIcon: <E.StatusIcon />,
        SummaryTableRow: (
          <E.SummaryTableRow title="Name">Node A</E.SummaryTableRow>
        ),
        TabMenu: (
          <E.TabMenu
            selectedKey="a"
            tabs={[
              { key: "a", title: "Overview", children: <div>Content</div> },
            ]}
          />
        ),
        TableLoading: <E.TableLoading />,
        TableSkeleton: <E.TableSkeleton rowsCount={2} />,
        TitleArea: <E.TitleArea title="Progress" subtitle="Details" />,
        TooltipFormatter: (
          <E.TooltipFormatter
            active
            payload={[{ value: 10 }]}
            deselected={[]}
            legends={[legend]}
            format={(item) => String(item.value)}
          />
        ),
      }}
    />
  );
};

function PointerSample() {
  const dispatch = E.useKitDispatch();
  React.useEffect(() => {
    dispatch({
      type: ChartActions.SET_POINTER,
      payload: { uuid: "snapshot", visible: true, left: 60, text: "10%" },
    });
  }, [dispatch]);
  return <E.Pointer uuid="snapshot" metricWidth={160} />;
}

class SampleUploadFile extends File implements E.LocalUploadFile {
  readonly uid = "sample";
  readonly fileStatus = "success";

  get lastModifiedDate() {
    return new Date(this.lastModified);
  }
}

export const Compound = () => (
  <Samples
    examples={{
      "AccordionCard.CloseButton": <E.AccordionCard.CloseButton />,
      "AntdTable.ColumnGroup": (
        <E.AntdTable
          dataSource={[{ key: "a", name: "Node A" }]}
          pagination={false}
        >
          <E.AntdTable.ColumnGroup title="Details">
            <E.AntdTable.Column title="Name" dataIndex="name" />
            <E.AntdTable.Column title="Key" dataIndex="key" />
          </E.AntdTable.ColumnGroup>
        </E.AntdTable>
      ),
      "Antd5Tree.DirectoryTree": (
        <E.Antd5Tree.DirectoryTree treeData={[{ key: "a", title: "Node A" }]} />
      ),
      "Antd5Tree.TreeNode": (
        <E.Antd5Tree>
          <E.Antd5Tree.TreeNode key="a" title="Node A" />
        </E.Antd5Tree>
      ),
      "AntdBadge.Ribbon": (
        <E.AntdBadge.Ribbon text="New">
          <div>Node A</div>
        </E.AntdBadge.Ribbon>
      ),
      "AntdButton.Group": (
        <E.AntdButton.Group>
          <E.AntdButton>Open</E.AntdButton>
        </E.AntdButton.Group>
      ),
      "AntdCheckbox.Group": (
        <E.AntdCheckbox.Group options={["Node A"]} defaultValue={["Node A"]} />
      ),
      "AntdInput.Group": (
        <E.AntdInput.Group compact>
          <E.AntdInput defaultValue="Node A" />
        </E.AntdInput.Group>
      ),
      "AntdInput.Password": <E.AntdInput.Password defaultValue="Example" />,
      "AntdInput.Search": (
        <E.AntdInput.Search defaultValue="Example" enterButton />
      ),
      "AntdInput.TextArea": <E.AntdInput.TextArea defaultValue="Example" />,
      "AntdSkeleton.Avatar": <E.AntdSkeleton.Avatar />,
      "AntdSkeleton.Image": <E.AntdSkeleton.Image />,
      "AntdSkeleton.Input": <E.AntdSkeleton.Input style={{ width: 160 }} />,
      "AntdTable.Summary.Row": (
        <E.AntdTable
          columns={[{ title: "Name", dataIndex: "name" }]}
          dataSource={[{ key: "a", name: "Node A" }]}
          pagination={false}
          summary={() => (
            <E.AntdTable.Summary.Row>
              <E.AntdTable.Summary.Cell index={0}>
                Total
              </E.AntdTable.Summary.Cell>
            </E.AntdTable.Summary.Row>
          )}
        />
      ),
      "AntdTimePicker.RangePicker": (
        <E.AntdTimePicker.RangePicker
          picker="time"
          defaultValue={[
            moment("2026-01-15T12:00:00"),
            moment("2026-01-15T13:00:00"),
          ]}
        />
      ),
      "AntdTreeSelect.TreeNode": (
        <E.AntdTreeSelect
          dropdownClassName="style-sample-tree-select"
          defaultValue="a"
          open
          getPopupContainer={(node) => node?.parentElement || document.body}
        >
          <E.AntdTreeSelect.TreeNode value="a" title="Node A" />
        </E.AntdTreeSelect>
      ),
      "DatePicker.MonthPicker": (
        <E.DatePicker.MonthPicker defaultValue={moment("2026-01-15")} />
      ),
      "DatePicker.QuarterPicker": (
        <E.DatePicker.QuarterPicker defaultValue={moment("2026-01-15")} />
      ),
      "DatePicker.TimePicker": (
        <E.DatePicker.TimePicker defaultValue={moment("2026-01-15T12:00:00")} />
      ),
      "DatePicker.WeekPicker": (
        <E.DatePicker.WeekPicker defaultValue={moment("2026-01-15")} />
      ),
      "DatePicker.YearPicker": (
        <E.DatePicker.YearPicker defaultValue={moment("2026-01-15")} />
      ),
      "Dropdown.Button": (
        <E.Dropdown.Button
          overlay={
            <E.Menu>
              <E.Menu.Item key="a">Details</E.Menu.Item>
            </E.Menu>
          }
        >
          Open
        </E.Dropdown.Button>
      ),
      KitTableContext: (
        <E.KitTableContext.Provider value={{}}>
          <E.KitTableContext.Consumer>
            {(value) => value && <E.Button>Table action</E.Button>}
          </E.KitTableContext.Consumer>
        </E.KitTableContext.Provider>
      ),
      Layout: (
        <E.Layout>
          <E.Layout.Header>Header</E.Layout.Header>
          <E.Layout.Sider>Sider</E.Layout.Sider>
          <E.Layout.Content>Content</E.Layout.Content>
          <E.Layout.Footer>Footer</E.Layout.Footer>
        </E.Layout>
      ),
      "List.Item.Meta": (
        <E.List>
          <E.List.Item>
            <E.List.Item.Meta title="Node A" description="Details" />
          </E.List.Item>
        </E.List>
      ),
      "LocalUpload.FileInfo": (
        <E.LocalUpload.FileInfo
          file={{
            name: "sample.txt",
            fileStatus: "error",
            error: "Invalid file",
          }}
          removeFile={() => undefined}
        />
      ),
      LocalUpload: (
        <E.LocalUpload.Wrapper>
          <E.LocalUpload.Label>Files</E.LocalUpload.Label>
          <E.LocalUpload.Description>
            Upload configuration
          </E.LocalUpload.Description>
          <E.LocalUpload.Button fileList={[]} setFileList={() => undefined} />
          <E.LocalUpload.FileList
            fileList={[
              new SampleUploadFile(["sample"], "sample.txt", {
                lastModified: Date.UTC(2026, 0, 15),
              }),
            ]}
            removeFile={() => undefined}
          />
        </E.LocalUpload.Wrapper>
      ),
      Menu: (
        <E.Menu
          mode="inline"
          defaultOpenKeys={["section"]}
          selectedKeys={["a"]}
        >
          <E.Menu.SubMenu key="section" title="Section">
            <E.Menu.Item key="a">Home</E.Menu.Item>
            <E.Menu.Divider />
            <E.Menu.Item key="b">Settings</E.Menu.Item>
          </E.Menu.SubMenu>
        </E.Menu>
      ),
      MessageContext: (
        <E.MessageContext.Consumer>
          {(api) => (
            <E.MessageContext.Provider value={api}>
              <E.MessageContext.Consumer>
                {(value) => value && <E.Button>Message action</E.Button>}
              </E.MessageContext.Consumer>
            </E.MessageContext.Provider>
          )}
        </E.MessageContext.Consumer>
      ),
      "Tree.DirectoryTree": (
        <E.Tree.DirectoryTree treeData={[{ key: "a", title: "Node A" }]} />
      ),
      "Tree.TreeNode": (
        <E.Tree>
          <E.Tree.TreeNode key="a" title="Node A" />
        </E.Tree>
      ),
      Typography: (
        <E.Typography>
          <E.Typography.Title>Details</E.Typography.Title>
          <E.Typography.Paragraph>Node A</E.Typography.Paragraph>
          <E.Typography.Link href="#node">Open</E.Typography.Link>
        </E.Typography>
      ),
    }}
  />
);
