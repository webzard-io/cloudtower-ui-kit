import { useTranslation } from "react-i18next";
import { joinSymbol } from "@tower/utils";

const useI18nArrayJoin = () => {
  const { i18n } = useTranslation();
  return (arr: string[], separator: string) => {
    return joinSymbol(arr, i18n.language, separator);
  };
};

export default useI18nArrayJoin;
