import React from "react";

import AccordionCard from ".";

const meta = {
  title: "AccordionCard",
};

export default meta;

export const DefaultExample = () => {
  return (
    <AccordionCard header={<div>header</div>} expand={<div>expand</div>} />
  );
};

export const WithCloseButton = () => {
  return (
    <AccordionCard
      header={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          header
          <AccordionCard.CloseButton />
        </div>
      }
      expand={<div>expand</div>}
    />
  );
};
