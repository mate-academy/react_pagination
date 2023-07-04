import React from 'react';
import classNames from 'classnames';

type Props = {
  items: string[];
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  items,
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

  const handleClickRight = () => {
    if (currentPage !== 0) {
      onPageChange(currentPage + 1);
    }
  };

  const handleClickLeft = () => {
    if (currentPage !== Math.ceil(total / perPage) + 1) {
      onPageChange(currentPage - 1);
    }
  };

  const leftDisabled = currentPage === 1;
  const rightDisabled = currentPage === Math.ceil(total / perPage);

  const arrOfPages = items.slice(0, Math.ceil(total / perPage));

  return (
    <>
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
            <li className={classNames('page-item',
              { active: currentPage === i + 1 })}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                key={page.slice(5)}
                href={`#${page.slice(5)}`}
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
    </>
  );
};
