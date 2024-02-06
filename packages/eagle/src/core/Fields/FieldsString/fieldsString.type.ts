import { InputSize } from "../fields.type";

export interface StringProps {
  placeholder?: string;
  autoComplete?: "on" | "off" | "new-password";
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  className?: string;
  size?: InputSize;
  allowClear?: boolean;
  tags?: string[];
  tagsOverflow?: React.ReactNode;
  onTagsAllowClearClick?: (e: React.MouseEvent) => void;
  onClick?: (e: React.MouseEvent) => void;
  maxLength?: number;
  disabled?: boolean;
}
