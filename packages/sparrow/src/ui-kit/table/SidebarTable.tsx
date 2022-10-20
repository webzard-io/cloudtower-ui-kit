import React, { useCallback, useLayoutEffect, useRef } from "react";

import { Sidebar, useSearch } from "../../common";

// FIXME
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SidebarTable = <T,>(props: {
  isRender: boolean;
  children: React.ReactNode;
  wrapper: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  const { isRender, children, wrapper } = props;

  const [sidebar] = useSearch<Sidebar>("sidebar", undefined);
  const id = sidebar?.id;
  const idRef = useRef(id);
  idRef.current = id;
  const tableRendered = useRef(isRender);

  // active or inactive row
  const handleRow = useCallback(() => {
    const trs = wrapper.current?.querySelectorAll<HTMLElement>("tr") || [];

    trs.forEach((tr: HTMLElement) => {
      tr.classList.remove("active-row");
    });
    const row = wrapper.current?.querySelector<HTMLTableCellElement>(
      `[data-row-key=${idRef.current}]`
    );
    row?.classList.add("active-row");
  }, [wrapper]);

  // active or inactive title
  const handleTitle = useCallback(() => {
    const contentTitle = document.querySelector("#app-content-title");
    if (idRef.current) {
      contentTitle?.classList.add("sidebar-active");
    } else {
      contentTitle?.classList.remove("sidebar-active");
    }
  }, []);

  // close sidebar
  const handleClose = useCallback(() => {
    const table = wrapper.current!;
    const trs = table.querySelectorAll<HTMLElement>("tr");
    trs.forEach((tr) => {
      tr.classList.remove("active-row");
    });
    handleTitle();
  }, [handleTitle, wrapper]);

  useLayoutEffect(() => {
    if (!tableRendered) return;
    if (id) {
      handleRow();
    } else {
      handleClose();
    }
  }, [id, handleRow, handleClose]);

  useLayoutEffect(() => {
    if (!idRef.current) return;
    if (isRender) {
      tableRendered.current = true;
      setTimeout(() => {
        handleRow();
      }, 0);
    } else {
      tableRendered.current = false;
    }
  }, [isRender, handleRow]);

  return <>{children}</>;
};

export default SidebarTable;
