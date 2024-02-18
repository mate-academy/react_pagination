import React from "react";
import cn from "classnames";
import { getNumbers } from "../../utils";

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  visibleItems: string[];
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  visibleItems,
}) => {
  const roundPage = Math.ceil(total / perPage);

  const withinPages = getNumbers(1, roundPage);
  const firstLink = currentPage === 1;
  const lastLink = currentPage === withinPages.length;
  const arrowBack = () =>
    onPageChange(currentPage > 1 ? currentPage - 1 : currentPage);
  const arrowRight = () =>
    onPageChange(
      currentPage >= 0 && currentPage < withinPages.length
        ? currentPage + 1
        : currentPage,
    );

  return (
    <>
      <ul className="pagination">
        <li className={cn("page-item", { disabled: firstLink })}>
          <a
            onClick={arrowBack}
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={firstLink ? "true" : "false"}
          >
            «
          </a>
        </li>

        {withinPages.map((p) => (
          <li
            className={cn("page-item", { active: p === currentPage })}
            key={p}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${p}`}
              onClick={() => {
                onPageChange(p);
              }}
            >
              {p}
            </a>
          </li>
        ))}
        <li className={cn("page-item", { disabled: lastLink })}>
          <a
            onClick={arrowRight}
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={lastLink ? "true" : "false"}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {visibleItems.map((item) => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
