import React, { useMemo, useContext } from "react";
import { GetModalProps } from "../../store";
import { kitContext } from "../../UIKitProvider";
import { UseTranslationResponse, useTranslation } from "react-i18next";
import { kitContext as UIKitContext } from "@cloudtower/eagle";
import { client } from "@tower/codegen-component"; /** ../../graphql */
import {
  useGetLabelsQuery,
  useCreateLabelMutation,
} from "@tower/codegen-component"; /** ../../generated/react-hooks */
import { AddLabel } from "@tower/codegen-component"; /** ../../generated/forms2 */
import _ from "lodash";
import { isIncludeChineseCharacters } from "@tower/utils";
import { V2AnalyzedError } from "../FormError"; /** ../../components/FormError */

export const labelKeyValueValidator = (
  string?: string,
  t?: UseTranslationResponse<unknown>["t"],
  isEverouteUsed?: boolean
) => {
  const regex = /^[\u4e00-\u9fa5a-zA-Z0-9._-]*$/g;
  if (string && isEverouteUsed && _.isFunction(t)) {
    if (string.length > 63) {
      return t("label.label_key_or_value_validation02");
    }
    if (/^[^a-z0-9]/i.test(string) || /[^a-z0-9]$/i.test(string)) {
      return t("label.label_key_or_value_validation03");
    }
    if (isIncludeChineseCharacters(string)) {
      return t("label.label_key_or_value_validation01");
    }
  }
  if (string && _.isFunction(t) && !regex.test(string))
    return t("label.invalid_label");
};

type Props = GetModalProps<"AddLabelModal">;

const AddLabelModal: React.FC<Props> = (props) => {
  const { callback, onClose } = props;
  const kit = useContext(kitContext);
  const UIKit = useContext(UIKitContext);
  const { t } = useTranslation();
  const { data: labelsData, loading } = useGetLabelsQuery();
  const [createLabel, { loading: creating, error }] = useCreateLabelMutation({
    onCompleted: (values) => {
      const id = values.createLabel.id;
      client.deleteCache({
        typename: "Label",
      });
      kit.message.success(t("label.label_created_msg"));

      if (callback) callback(id);
      onClose();
    },
  });

  const autoCompleteOptions = useMemo(() => {
    const labels = labelsData?.labels;
    if (_.isArray(labels) && labels.length > 0) {
      return _.uniqBy(
        labels.map((item) => ({
          label: item.key || "",
          value: item.key || "",
        })),
        "label"
      );
    }
    return [];
  }, [labelsData]);

  const submit = (values: AddLabel.FormValue) => {
    try {
      createLabel({
        variables: {
          data: {
            key: values.label && values.label.key ? values.label.key : "",
            value: values.label?.value,
          },
        },
      });
    } catch {
      //
    }
  };

  return (
    <AddLabel.Form
      initialValues={{
        label: {
          key: "",
          value: "",
        },
      }}
      validation={{
        field: {
          "label.key"(value, formValues) {
            if (!value) return t("label.label_key_empty_validation");

            if (
              labelsData?.labels.some(
                (label) => label.key === value && !label.value
              ) &&
              !formValues.label?.value
            ) {
              return t("label.label_key_validation");
            }

            const res = labelKeyValueValidator(value, t);
            if (res) return res;
          },
          "label.value"(value, formValues) {
            if (
              labelsData?.labels.some(
                (label) =>
                  value &&
                  label.key === formValues.label?.key &&
                  label.value === value
              )
            ) {
              return t("label.label_value_validation");
            }

            const res = labelKeyValueValidator(value, t);
            if (res) return res;
          },
        },
      }}
      onSubmit={submit}
      layout={{ compact: true }}
      render={({ handleSubmit, submitting }) => {
        return (
          <kit.modal
            title={t("label.add_single_label_title")}
            onCancel={onClose}
            onOk={handleSubmit}
            okText={t("common.create")}
            confirmLoading={creating}
            error={<V2AnalyzedError fallback={error} />}
          >
            {loading ? (
              <kit.loading />
            ) : (
              <>
                <AddLabel.FormField.Label.Key
                  label={t("label.label_key")}
                  render={({ input }) => {
                    return (
                      <UIKit.autoComplete
                        {...input}
                        autoFocus={true}
                        disabled={submitting}
                        options={autoCompleteOptions}
                        filterOption={(val, option) =>
                          option && option.value.includes(val)
                        }
                      />
                    );
                  }}
                />
                <AddLabel.FormField.Label.Value
                  label={t("label.label_value")}
                  render={({ input, meta }) => {
                    return (
                      <UIKit.fields.String
                        input={input}
                        meta={meta}
                        disabled={submitting}
                      />
                    );
                  }}
                />
              </>
            )}
          </kit.modal>
        );
      }}
    />
  );
};

export default AddLabelModal;
