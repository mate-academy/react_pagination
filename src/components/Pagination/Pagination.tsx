import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const handleSelectPage = (page: number) => {
    if (currentPage !== page) {
      onPageChange(page);
    }
  };

  const lastPage = Math.ceil(total / perPage);
  const arrOfPages = getNumbers(1, lastPage).map(n => n);

  const handleClickRight = () => {
    if (currentPage !== lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handleClickLeft = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const leftDisabled = currentPage === 1;
  const rightDisabled = currentPage === lastPage;

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: leftDisabled })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled="true"
          onClick={handleClickLeft}
        >
          «
        </a>
      </li>

      {arrOfPages.map((page, i) => {
        return (
          <li
            className={classNames('page-item',
              { active: currentPage === i + 1 })}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => handleSelectPage(i + 1)}
            >
              {i + 1}
            </a>
          </li>
        );
      })}

      <li className={classNames('page-item', { disabled: rightDisabled })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
          onClick={handleClickRight}
        >
          »
        </a>
      </li>
    </ul>
  );
};
