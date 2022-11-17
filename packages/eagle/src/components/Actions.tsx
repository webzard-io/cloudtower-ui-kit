import { EllipsisOutlined } from "@ant-design/icons";
import { UserPrivilege } from "@cloudtower/eagle/kit/smartx";
import { kitContext } from "@cloudtower/eagle/kit/specify";
import { parrotI18n } from "@cloudtower/parrot";
import { Menu } from "antd";
import { useContext } from "react";

const Actions: React.FC<{
  info: { current: string; max: string };
  addView?: () => void;
  exportCSV?: () => void;
}> = ({ info, addView, exportCSV }) => {
  const { current, max } = info;
  const kit = useContext(kitContext);

  return (
    <div className="metric-extra">
      <div>
        <span className="info-item">
          {parrotI18n.t("metric.max")}：{max}
        </span>
        <span className="info-item">
          {parrotI18n.t("metric.current")}：{current}
        </span>
      </div>
      <UserPrivilege>
        <kit.dropdown
          overlay={() => (
            <Menu>
              <Menu.Item
                onClick={() => {
                  if (typeof addView === "function") addView();
                }}
              >
                {parrotI18n.t("metric.addToView")}
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  if (typeof exportCSV === "function") exportCSV();
                }}
              >
                {parrotI18n.t("metric.exportAsCSV")}
              </Menu.Item>
            </Menu>
          )}
        >
          <EllipsisOutlined className="menu-trigger" />
        </kit.dropdown>
      </UserPrivilege>
    </div>
  );
};

export default Actions;
