import { Input as AntdInput } from "antd";
import { styled } from "linaria/react";

const InputGroup = styled(AntdInput.Group)`
  &.ant-input-group.ant-input-group-compact {
    display: flex;
  }
`;

export default InputGroup;
