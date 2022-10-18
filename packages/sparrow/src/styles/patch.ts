function addStylesheetRules(rules: string[]): void {
  const sheets = document.styleSheets[document.styleSheets.length - 1];
  try {
    rules.forEach((rule) => {
      sheets.insertRule(rule, sheets.cssRules.length);
    });
    // eslint-disable-next-line
  } catch {}
}
export function patchStyle() {
  if (!window.navigator.platform.includes("Mac")) {
    // scrollbar style
    const scrollbarArr = [
      "*::-webkit-scrollbar-track {background-color: transparent}",
      "*::-webkit-scrollbar {width: 8px; height: 8px; background-color: transparent}",
      "*::-webkit-scrollbar-thumb {border-radius: 4px; background-color: rgba(225, 229, 235, 0.8)}",
      "*::-webkit-scrollbar-thumb:hover {background-color: rgba(142, 154, 169, 0.8)}",
      "*::-webkit-scrollbar-thumb:active {background-color: rgba(53, 63, 78, 0.8)}",
    ];
    addStylesheetRules(scrollbarArr);
  }
}
