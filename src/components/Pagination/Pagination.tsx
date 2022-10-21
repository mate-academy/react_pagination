/* eslint-disable */

import classNames from "classnames";
import { getPageNumbers } from "../../utils";

type Props = {
  total: number
  perPage: number
  currentPage: number
  onPageChange: (page: number) => void
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageNumbers = getPageNumbers(total, perPage);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageNumbers[pageNumbers.length - 1];

  const prevPagehandler = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1)
    }
  }

  const lastPagehandler = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames(
            'page-item',
            {
              'disabled': isFirstPage,
            }
          )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirstPage}
            onClick={prevPagehandler}
          >
            «
          </a>
        </li>

        {pageNumbers.map(pageNumber => (
          <li
            key={pageNumber}
            className={classNames(
              'page-item',
              {
                active: pageNumber === currentPage,
              }
            )}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${pageNumber}`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </a>
          </li>
        ))}

        <li
          className={classNames(
            'page-item',
            {
              'disabled': isLastPage,
            }
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLastPage}
            onClick={lastPagehandler}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
