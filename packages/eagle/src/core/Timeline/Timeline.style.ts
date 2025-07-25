import { css } from "@linaria/core";
import { Color } from "@src/styles/token/color";

export const TimelineWrapper = css`
  padding: 0px;
  padding-top: 5px;
  padding-left: 5px;

  .ant-timeline-item {
    margin-bottom: 16px;
    padding-bottom: 0px;
  }
  .ant-timeline-item-last,
  .compact.ant-timeline-item-last {
    margin-bottom: 0;
  }
  .compact.ant-timeline-item {
    margin-bottom: 12px;
  }
  .info-action {
    align-self: baseline;
  }
`;

export const TimelineItemWrapper = css`
  .ant-timeline-item-content {
    margin-left: 18px;
  }
  .item-time {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 4px;
  }

  &:last-child {
    .ant-timeline-item-content {
      padding-bottom: 0;
    }
  }
`;

export const EmptyWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SubInfoTextWrapper = css`
  color: ${Color.text.neutral.secondary};
`;
export const InfoTextWrapper = css`
  color: ${Color.text.neutral.primary};
`;
