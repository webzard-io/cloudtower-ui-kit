const getAllStyles = (el: Element): CSSStyleDeclaration[] => {
  return [getComputedStyle(el)].concat(
    Array.from(el.children).flatMap((child) => getAllStyles(child))
  );
};

export default getAllStyles;
