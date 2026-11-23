import { styled } from "@linaria/react";

const CardTitle = styled.div`
  color: var(--gray-gray-80);
  padding: 7px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.has-arrow {
    padding-left: 10px;

    .title-wrapper {
      cursor: pointer;
      color: var(--text-neutral-primary);

      &.is-open {
        color: var(--gray-gray-80);
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
    color: var(--gray-gray-80);
    font-weight: 700;
  }

  .collapse-arrow {
    transition: all 50ms ease-out 0ms;
    margin-right: 2px;
  }
`;

export default CardTitle;
