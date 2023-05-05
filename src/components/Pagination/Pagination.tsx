import classNames from 'classnames';
import { FC } from 'react';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const amountOfPages = (Math.ceil(total / perPage));
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === amountOfPages;

  const handleNextPageChange = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handlePrevPageChange = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: isFirstPage,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={handleNextPageChange}
        >
          «
        </a>
      </li>
      {getNumbers(1, amountOfPages).map(n => (
        <li
          key={n}
          className={classNames('page-item', {
            active: n === currentPage,
          })}
        >

          <a
            data-cy="pageLink"
            className="page-link"
            href="#page"
            onClick={() => onPageChange(n)}
          >
            {n}
          </a>

        </li>
      ))}
      <li
        className={classNames('page-item', {
          disabled: isLastPage,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={handlePrevPageChange}
        >
          »
        </a>
      </li>
    </ul>
  );
};
