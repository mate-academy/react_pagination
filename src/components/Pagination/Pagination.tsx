import classNames from 'classnames';
import React from 'react';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (number: number) => void,
  pages: number[],
};

export const Pagination: React.FC<Props> = ({
  perPage,
  total,
  pages,
  currentPage,
  onPageChange,
}) => {
  const isFirstPage = currentPage === 1;
  const lastPage = Math.ceil(total / perPage);
  const isLastPage = currentPage === lastPage;

  const handlePrev = () => {
    onPageChange((current: number) => {
      return isFirstPage
        ? (current)
        : (current - 1);
    });
  };

  const handleNext = () => {
    onPageChange((current: number) => {
      return isLastPage
        ? (current)
        : (current + 1);
    });
  };

  return (
    <>
      <ul className="pagination">
        <li className={classNames(
          'page-item',
          { disable: isFirstPage },
        )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirstPage}
            onClick={handlePrev}
          >
            «
          </a>
        </li>
        {pages.map((page) => (
          <li
            className={classNames(
              'page-item',
              { active: page === currentPage },
            )}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => {
                if (page !== currentPage) {
                  onPageChange(page);
                }
              }}
            >
              {page}
            </a>
          </li>
        ))}
        <li className={classNames(
          'page-item',
          { disable: isLastPage },
        )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLastPage}
            onClick={handleNext}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
