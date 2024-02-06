export interface ITimeZoneSelectProps {
  value: string | undefined;
  onChange: (value: string) => void;
  defaultUseBrowserTime?: boolean;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  // This it not defaultValue, it just adds a default option.
  defaultOptionValue?: string;
}
