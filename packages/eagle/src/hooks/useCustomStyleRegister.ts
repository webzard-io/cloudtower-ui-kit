import { useStyleRegister } from "@ant-design/cssinjs";
import { genLinkStyle } from "antd5/lib/style";
import useToken from "antd5/lib/theme/useToken";

export const useCustomStyleRegister = (
  config: Partial<Parameters<typeof useStyleRegister>[0]>,
  prefixCls: string,
) => {
  const [theme, realToken, hashId, token, cssVar] = useToken();
  const style = useStyleRegister(
    {
      theme,
      hashId,
      token,
      path: [],
      ...config,
    },
    () => [
      {
        // Link
        "&": genLinkStyle(token),
      },
    ],
  );

  return {
    ...style,
    className: `${prefixCls}`,
  };
};
