import { css } from "@linaria/core";
import { useTranslation } from "react-i18next";

const test = css`
  color: blue;
`;

const TestBase = () => {
  const { t } = useTranslation();

  

  return <div className={`${test}`}>{t("hello_world")}</div>;
};

export default TestBase;
