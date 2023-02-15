import { parrotI18n } from "@cloudtower/parrot";
import React, { useContext } from "react";

import Button from "../Button";
import { KitTableContext } from "../Table";

const TableEmpty: React.FC<{
  searching?: boolean;
  emptyTablekey: string;
  clearGlobalSearch?: boolean;
}> = (props) => {
  const { searching, emptyTablekey, clearGlobalSearch = true } = props;

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
          <Button
            type="ordinary"
            onClick={() => {
              if (clearGlobalSearch) {
                onClearSearchButtonEffect?.(emptyTablekey);
              }
            }}
          >
            {parrotI18n.t("common.clear_query")}
          </Button>
        </>
      )}
    </div>
  );
};

export default TableEmpty;
