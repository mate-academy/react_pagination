import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(total / itemsPerPage);
  const pages = getNumbers(1, totalPages);

  const onPrev = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onNext = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={`page-item ${cn({
          disabled: currentPage === 1,
        })}`}
        onClickCapture={onPrev}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={currentPage === 1}
        >
          «
        </a>
      </li>

      {pages.map((page) => (
        <li
          className={`page-item ${cn({
            active: currentPage === page,
          })}`}
          key={`page-item-${page}`}
          onClickCapture={() => setCurrentPage(page)}
        >
          <a data-cy="pageLink" className="page-link" href={`#${page}`}>
            {page}
          </a>
        </li>
      ))}

      <li
        className={`page-item ${cn({
          disabled: currentPage === totalPages,
        })}`}
        onClickCapture={onNext}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={currentPage === totalPages}
        >
          »
        </a>
      </li>
    </ul>
  );
};
