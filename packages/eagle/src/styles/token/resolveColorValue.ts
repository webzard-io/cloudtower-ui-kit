/** Resolve a theme token after mount for renderers requiring concrete colors. */
export const resolveColorValue = (
  color: string,
  element?: Element,
): string => {
  const name = /^var\((--[\w-]+)\)$/.exec(color)?.[1];
  if (!name || typeof document === "undefined") {
    throw new Error(`Cannot resolve theme color: ${color}`);
  }
  const value = getComputedStyle(element ?? document.documentElement)
    .getPropertyValue(name)
    .trim();
  if (!value || value.includes("var(")) {
    throw new Error(
      `Missing theme color ${name}; load Eagle token.css before rendering`,
    );
  }
  return value;
};
