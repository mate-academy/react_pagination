import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (value: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const [pages, setPages] = useState<number[]>([]);

  const totalPages = Math.ceil(total / perPage);

  useEffect(() => {
    const pageNumbers = getNumbers(1, totalPages);

    setPages(pageNumbers);
  }, [total, perPage]);

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames(
            'page-item',
            { disabled: currentPage === 1 },
          )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            onClick={() => handlePageChange(currentPage - 1)}
            aria-disabled={currentPage === 1}
          >
            «
          </a>
        </li>
        {pages.map(page => (
          <li
            key={page}
            className={classNames(
              'page-item',
              { active: currentPage === page },
            )}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={classNames(
            'page-item',
            { disabled: currentPage === totalPages },
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            onClick={() => handlePageChange(currentPage + 1)}
            aria-disabled={currentPage === totalPages}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
