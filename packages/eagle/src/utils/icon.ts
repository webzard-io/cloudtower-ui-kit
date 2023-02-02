import {
  checkmarkDoneSuccessCircleFill16Green,
  infoICircleFill16Blue,
  infoICircleFill16Secondary,
  noticeAttention16Yellow,
  xmarkFailedSeriousWarningFill16Red,
} from "../components/images";

export function getAlertIcon(
  type: "success" | "info" | "warning" | "error" | "normal" | undefined
) {
  switch (type) {
    case "success":
      return checkmarkDoneSuccessCircleFill16Green;
    case "info":
      return infoICircleFill16Blue;
    case "warning":
      return noticeAttention16Yellow;
    case "error":
      return xmarkFailedSeriousWarningFill16Red;
    case "normal":
      return infoICircleFill16Secondary;
    default:
      return infoICircleFill16Secondary;
  }
}
