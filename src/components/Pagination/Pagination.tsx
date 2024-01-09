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
  onPageChange = () => {},
}) => {
  const lastPage = Math.ceil(total / perPage);

  const PrevPageSelector = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const NextPageSelector = () => {
    if (currentPage !== lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
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
            onClick={() => PrevPageSelector()}
          >
            «
          </a>
        </li>
        {getNumbers(1, lastPage)
          .map((n:number) => (
            <li
              className={classNames(
                'page-item',
                { active: currentPage === n },
              )}
              key={n}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${n}`}
                onClick={() => onPageChange(n)}
              >
                {n}
              </a>
            </li>
          ))}
        <li className={classNames(
          'page-item',
          { disabled: currentPage === lastPage },
        )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === lastPage}
            onClick={() => NextPageSelector()}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
