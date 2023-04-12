import classNames from 'classnames';
import { MouseEvent, useMemo } from 'react';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numberOfPages = useMemo(() => {
    return Math.ceil(total / perPage);
  }, [total, perPage]);

  const handlePageClick = (event: MouseEvent) => {
    event.preventDefault();
    const target = event.target as HTMLElement;
    const pageNumberAttr = target.getAttribute('data-page-number');
    const pageNumber = pageNumberAttr ? +pageNumberAttr : 1;

    onPageChange(pageNumber);
  };

  const pageNumbers = Array.from({ length: numberOfPages }, (_, i) => i + 1);

  const handlePrevClick = (event: MouseEvent) => {
    event.preventDefault();

    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = (event: MouseEvent) => {
    event.preventDefault();

    if (currentPage !== numberOfPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: currentPage === 1,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={handlePrevClick}
        >
          «
        </a>
      </li>
      {pageNumbers.map(pageNumber => (
        <li
          key={pageNumber}
          className={classNames('page-item', {
            active: currentPage === pageNumber,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageNumber}`}
            data-page-number={pageNumber}
            onClick={handlePageClick}
          >
            {pageNumber}
          </a>
        </li>
      ))}
      <li
        className={classNames('page-item', {
          disabled: currentPage === numberOfPages,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === numberOfPages}
          onClick={handleNextClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};
