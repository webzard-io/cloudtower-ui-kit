import React from "react";

const Error = ({
  error,
  "data-testid": dataTestId,
}: {
  error: unknown;
  "data-testid"?: string;
}) => (
  <div data-testid={dataTestId} className="error">
    {String(error)}
  </div>
);

export default Error;
