export type { SizeType as Antd5SizeType } from "antd5/lib/config-provider/SizeContext";

// FIXME: SHOULD IMPORT FROM PUBLIC TYPE REPO
export type CTErrorType = {
  code?: string;
  /**
   * @type array | undefined
   */
  details?: {
    /**
     * @type string | undefined
     */
    message?: string;
    /**
     * @type object | undefined
     */
    params?: {
      [key: string]: any;
    };
    /**
     * @type string | undefined
     */
    reason?: string;
  }[];
  /**
   * @type string
   */
  message?: string;
  /**
   * @type object | undefined
   */
  params?: {
    [key: string]: any;
  };
};
