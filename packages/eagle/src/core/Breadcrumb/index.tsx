import { styled } from "@linaria/react";
import { Typo } from "@src/core/Typo";
import { IBreadcrumbProps } from "@src/spec";
import React from "react";

export const BreadWrapper = styled.div`
  color: $text-terdiary-light;
  margin-bottom: 4px;

  .breadcrumb-link {
    color: $text-terdiary-light;
    cursor: pointer;
    transition: color 160ms ease;

    &:hover {
      color: $blue-60;
    }
    &:active {
      color: $blue-80;
    }
  }
`;

const Breadcrumb: React.FunctionComponent<IBreadcrumbProps> = (props) => {
  const { items } = props;

  return (
    <BreadWrapper className={Typo.Heading.h3_bold_title}>
      {items.map((item, index) => {
        return (
          <span key={index}>
            {index > 0 ? (
              <svg
                style={{ margin: "0 9.6px" }}
                width="6"
                height="8"
                viewBox="0 0 6 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.81662 3.33203C5.15455 3.555 5.32351 3.66649 5.38224 3.80736C5.43358 3.93049 5.43358 4.06904 5.38224 4.19218C5.32351 4.33305 5.15455 4.44454 4.81662 4.66751L1.81921 6.64529C1.4159 6.91141 1.21424 7.04446 1.04715 7.03393C0.901576 7.02475 0.767265 6.95246 0.679429 6.836C0.578613 6.70234 0.578613 6.46074 0.578613 5.97755L0.578613 2.02199C0.578613 1.53879 0.578613 1.2972 0.679429 1.16353C0.767265 1.04708 0.901576 0.974785 1.04715 0.965607C1.21424 0.955073 1.4159 1.08813 1.81921 1.35425L4.81662 3.33203Z"
                  fill="#031E4F"
                  fillOpacity="0.18"
                />
              </svg>
            ) : null}

            <span className="breadcrumb-link" onClick={item.onClick}>
              {item.name}
            </span>
            {index === items.length - 1 && (
              <svg
                style={{ margin: "0 9.6px" }}
                width="6"
                height="8"
                viewBox="0 0 6 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.81662 3.33203C5.15455 3.555 5.32351 3.66649 5.38224 3.80736C5.43358 3.93049 5.43358 4.06904 5.38224 4.19218C5.32351 4.33305 5.15455 4.44454 4.81662 4.66751L1.81921 6.64529C1.4159 6.91141 1.21424 7.04446 1.04715 7.03393C0.901576 7.02475 0.767265 6.95246 0.679429 6.836C0.578613 6.70234 0.578613 6.46074 0.578613 5.97755L0.578613 2.02199C0.578613 1.53879 0.578613 1.2972 0.679429 1.16353C0.767265 1.04708 0.901576 0.974785 1.04715 0.965607C1.21424 0.955073 1.4159 1.08813 1.81921 1.35425L4.81662 3.33203Z"
                  fill="#031E4F"
                  fillOpacity="0.18"
                />
              </svg>
            )}
          </span>
        );
      })}
    </BreadWrapper>
  );
};

export default Breadcrumb;
