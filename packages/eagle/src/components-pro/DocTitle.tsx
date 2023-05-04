import React, { useEffect, useRef } from "react";

export const useTitle = (title: string) => {
  const titleRef = useRef(document.title);

  useEffect(() => {
    const originalTitle = titleRef.current;

    if (title !== document.title) {
      document.title = title + " - CloudTower";
    }

    return () => {
      document.title = originalTitle;
    };
  }, [title]);
};

const DocTitle: React.FC<{
  title: string;
}> = (props) => {
  useTitle(props.title);
  return <>{props.children}</>;
};

export default DocTitle;
