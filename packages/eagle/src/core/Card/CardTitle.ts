import { styled } from "@linaria/react";

const CardTitle = styled.div`
  color: $text-primary-light;
  padding: 7px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.has-arrow {
    padding-left: 10px;

    .title-wrapper {
      cursor: pointer;
      color: $text-light-primary;

      &.is-open {
        color: $text-primary-light;
        font-weight: 600;

        .collapse-arrow {
          transform: rotate(90deg);
        }
      }
    }
  }

  .sub-info {
    font-size: 12px;
    line-height: 18px;
  }

  .title-wrapper {
    display: flex;
    align-items: center;
    user-select: none;
    flex-grow: 1;
    font-size: 12px;
    line-height: 18px;
    color: $text-primary-light;
    font-weight: 700;
  }

  .collapse-arrow {
    transition: all 50ms ease-out 0ms;
    margin-right: 2px;
  }
`;

export default CardTitle;
