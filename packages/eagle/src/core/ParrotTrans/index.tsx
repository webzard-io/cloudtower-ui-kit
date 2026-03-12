import { Namespace, ParseKeys, TOptions, TypeOptions } from "i18next";
import React from "react";
// biome-ignore lint/style/noRestrictedImports: ignore
import { Trans, TransProps } from "react-i18next";

import useParrotTranslation from "../../hooks/useParrotTranslation";

type _DefaultNamespace = TypeOptions["defaultNS"];

export const ParrotTrans = <
  Key extends ParseKeys<Ns, TOpt, KPrefix>,
  Ns extends Namespace = _DefaultNamespace,
  TOpt extends TOptions = {},
  KPrefix = undefined,
  E = React.HTMLProps<HTMLDivElement>,
>(
  props: TransProps<Key, Ns, TOpt, KPrefix, E>,
) => {
  const { i18n } = useParrotTranslation();
  return <Trans i18n={i18n} {...props} />;
};
