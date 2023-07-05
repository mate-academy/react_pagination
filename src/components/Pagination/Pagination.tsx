import classNames from 'classnames';
import { useMemo } from 'react';

type Props = {
  total: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  currentPage,
  onPageChange,
}) => {
  const arrayOfPages: number[] = useMemo(() => {
    const pages = [];

    for (let i = 1; i <= total; i += 1) {
      pages.push(i);
    }

    return pages;
  }, [total]);

  function handlePageSelection(page: number) {
    if (page !== currentPage) {
      onPageChange(page);
    }
  }

  function handlePreviousPage(page: number) {
    if (page !== 1) {
      onPageChange(page - 1);
    }
  }

  function handleNextPage(page: number) {
    if (page !== total) {
      onPageChange(page + 1);
    }
  }

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item',
        { disabled: currentPage === 1 },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => handlePreviousPage(currentPage)}
        >
          «
        </a>
      </li>
      {arrayOfPages.map(page => (
        <li
          key={page}
          className={
            classNames(
              'page-item',
              { active: page === currentPage },
            )
          }
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => handlePageSelection(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={classNames(
          'page-item',
          { disabled: currentPage === total },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === total}
          onClick={() => handleNextPage(currentPage)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
