import { Search16SecondaryIcon } from "@cloudtower/icons-react";
import _ from "lodash";
import React from "react";

import { SearchInputComponentType } from "../../spec";
import Input from "../Input";

const SearchInput: SearchInputComponentType = (props) => {
  const { onChange, debounceWait = 300, ...restProps } = props;
  const onSearch = _.debounce(onChange, debounceWait);
  return (
    <Input
      style={{ width: 276 }}
      prefix={<Search16SecondaryIcon />}
      onChange={(e) => onSearch(e.target.value)}
      {...restProps}
    />
  );
};

export default SearchInput;
