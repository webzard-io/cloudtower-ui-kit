import { Field } from "@smartx/react-final-form";
import { FieldArrayRenderProps } from "@smartx/react-final-form-arrays";
import React, { useContext } from "react";

import { Child, kitContext } from "../../../spec";
import Button from "../../Button";

const FieldsArray = <T extends HTMLElement = HTMLElement>({
  fields,
  child,
}: FieldArrayRenderProps<string, T> & { child: Child }) => {
  const kit = useContext(kitContext);
  return (
    <>
      {fields.map((name: string, index: number) => (
        <div>
          <Field name={name}>
            {(fieldProps) => {
              if (child.type === "Enum") {
                return kit.fields[child.type]({
                  ...fieldProps,
                  enumValues: child.enumValues,
                });
              }
              return kit.fields[child.type](fieldProps);
            }}
          </Field>
          <Button type="ordinary" onClick={() => fields.remove(index)}>
            X
          </Button>
        </div>
      ))}
      <Button type="primary" onClick={() => fields.push("")}>
        add
      </Button>
    </>
  );
};

export default FieldsArray;
