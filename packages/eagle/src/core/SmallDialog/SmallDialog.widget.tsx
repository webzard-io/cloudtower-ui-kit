import { cx } from "@linaria/core";
import { Skeleton, Space, Typo } from "@src/core";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import React from "react";

import {
  ModelContentSkeletonStyle,
  ModelInitializingErrorStyle,
  ModelTitleSkeletonStyle,
} from "./SmallDialog.style";

export const ModelTitleSkeleton: React.FC = () => {
  return (
    <div className={cx(ModelTitleSkeletonStyle, "initializing-title")}>
      <Skeleton.Content />
    </div>
  );
};

export const ModelContentSkeleton: React.FC<{
  num?: number;
}> = ({ num = 2 }) => {
  return (
    <Space direction="vertical" size={16} className={ModelContentSkeletonStyle}>
      {Array.from({ length: num }).map((_, index) => (
        <div key={index} className="skeleton-wrapper">
          <Skeleton.Content />
        </div>
      ))}
    </Space>
  );
};

export const ModelInitializingError: React.FC<{
  error?: string | React.ReactNode;
}> = ({ error }) => {
  const { t } = useParrotTranslation();

  return (
    <div className={ModelInitializingErrorStyle}>
      <p className={Typo.Display.d3_bold_title}>
        {t("components.initializing_failed")}
      </p>
      <div className={Typo.Label.l3_regular}>{error}</div>
    </div>
  );
};
