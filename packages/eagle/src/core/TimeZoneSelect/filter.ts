export const TimeZoneSelectPlaceholderValue = "_placeholder_";

type SelectOptionLike = {
  value?: unknown;
  label?: unknown;
};

export function shouldShowTimeZoneSelectOption(
  keyword: string,
  option: SelectOptionLike | undefined,
  searchableOptionTexts: string[],
) {
  const search = keyword.toLowerCase();
  const matches = (text: string) => text.toLowerCase().includes(search);
  const hasMatchedOption = searchableOptionTexts.some(matches);

  if (!hasMatchedOption) {
    return false;
  }

  if (option?.value === TimeZoneSelectPlaceholderValue) {
    return true;
  }

  const optionText = [
    typeof option?.label === "string" ? option.label : "",
    option?.value == null ? "" : String(option.value),
  ].join(" ");

  return matches(optionText);
}
