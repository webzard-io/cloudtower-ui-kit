import {
  CheckmarkDoneSuccessCircleFill16GreenIcon,
  InfoICircleFill16BlueIcon,
  InfoICircleFill16GrayRegularIcon,
  InfoICircleFill16SecondaryIcon,
  NoticeAttention16YellowIcon,
  XmarkFailedSeriousWarningFill16RedIcon,
} from "@cloudtower/icons-react";

export function getAlertIcon(
  type: "success" | "info" | "warning" | "error" | "normal" | undefined,
) {
  switch (type) {
    case "success":
      return CheckmarkDoneSuccessCircleFill16GreenIcon;
    case "info":
      return InfoICircleFill16BlueIcon;
    case "warning":
      return NoticeAttention16YellowIcon;
    case "error":
      return XmarkFailedSeriousWarningFill16RedIcon;
    case "normal":
      return InfoICircleFill16GrayRegularIcon;
    default:
      return InfoICircleFill16SecondaryIcon;
  }
}
