import { SearchOutlined } from "@ant-design/icons";
import Input from "@src/components/Input";
import { SearchInputComponentType } from "@src/spec";
import _ from "lodash";
import React from "react";

const SearchInput: SearchInputComponentType = (props) => {
  const { onChange, debounceWait = 300, ...restProps } = props;
  const onSearch = _.debounce(onChange, debounceWait);
  return (
    <Input
      style={{ width: 276 }}
      prefix={<SearchOutlined />}
      onChange={(e) => onSearch(e.target.value)}
      {...restProps}
    />
  );
};

export default SearchInput;
