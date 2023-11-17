import { parrotI18n } from "@cloudtower/parrot";
//  eslint-disable-next-line no-restricted-imports
import { useTranslation } from "react-i18next";

const useParrotTranslation = () => {
  return useTranslation(undefined, {
    i18n: parrotI18n,
  });
};

export default useParrotTranslation;
