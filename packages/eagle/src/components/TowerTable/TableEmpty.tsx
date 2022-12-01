import { KitTableContext } from "@cloudtower/eagle/kit/smartx";
import { kitContext } from "@cloudtower/eagle/kit/specify";
import { parrotI18n } from "@cloudtower/parrot";
import React, { useContext } from "react";

const TableEmpty: React.FC<{
  searching?: boolean;
  emptyTablekey: string;
  clearGlobalSearch?: boolean;
}> = (props) => {
  const { searching, emptyTablekey, clearGlobalSearch = true } = props;
  const kit = useContext(kitContext);

  const { onClearSearchButtonEffect } = useContext(KitTableContext);

  return (
    <div className="table-default-empty">
      {!searching ? (
        parrotI18n.t("common.empty") + parrotI18n.t(`common.${emptyTablekey}`)
      ) : (
        <>
          <div>
            {parrotI18n.t("common.no_match_filter", {
              resource: parrotI18n.t(`common.${emptyTablekey}`),
            })}
          </div>
          <kit.button
            type="ordinary"
            onClick={() => {
              if (clearGlobalSearch) {
                onClearSearchButtonEffect?.(emptyTablekey);
              }
            }}
          >
            {parrotI18n.t("common.clear_query")}
          </kit.button>
        </>
      )}
    </div>
  );
};

export default TableEmpty;
