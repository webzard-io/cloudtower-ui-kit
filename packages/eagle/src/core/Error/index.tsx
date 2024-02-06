import React from "react";

const Error = ({ error }: { error: unknown }) => (
  <div className="error">{String(error)}</div>
);

export default Error;
