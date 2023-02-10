import { styled } from "@linaria/react";
import { Input as AntdInput } from "antd";

const InputGroup = styled(AntdInput.Group)`
  &.ant-input-group.ant-input-group-compact {
    display: flex;
  }
`;

export default InputGroup;
