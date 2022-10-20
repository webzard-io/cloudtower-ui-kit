import React, { useEffect, useState } from "react";

import { TableLoading } from "./TableWidget";

const PendingTable: React.FC = (props) => {
  const [pending, setPending] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setPending(false), 0);
    return () => clearTimeout(timer);
  }, []);
  if (pending) {
    return <TableLoading />;
  }
  return <>{props.children}</>;
};

export default PendingTable;
