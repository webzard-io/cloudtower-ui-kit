import {
  antdKit,
  IModalProps,
  ModalStack,
  pushModal,
  useKitDispatch,
} from "@cloudtower/eagle";
import { kitContext } from "@cloudtower/eagle";
import { GetModalProps } from "@cloudtower/eagle";
import { KitStoreProvider } from "@cloudtower/eagle";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useContext } from "react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "kit/modal",
  component: antdKit.modal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  decorators: [
    (Story) => {
      return (
        <KitStoreProvider>
          <kitContext.Provider value={antdKit}>
            <Story />
          </kitContext.Provider>
        </KitStoreProvider>
      );
    },
  ],
} as ComponentMeta<typeof antdKit.modal>;

const EmptyModal = (props: GetModalProps<"EmptyModal">) => {
  const { name, onClose } = props;
  const kit = useContext(kitContext);
  return (
    <kit.modal onOk={onClose} onCancel={onClose}>
      hello {name}
    </kit.modal>
  );
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof antdKit.modal> = (args) => {
  const kit = useContext(kitContext);
  const dispatch = useKitDispatch();
  return (
    <div>
      <kit.button
        onClick={() => {
          pushModal<"EmptyModal">({
            component: EmptyModal,
            props: {
              name: "abc",
              onClose: () => {
                dispatch({
                  type: "RESET",
                });
              },
            },
          });
        }}
      >
        open modal
      </kit.button>
      <ModalStack />
    </div>
  );
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};
