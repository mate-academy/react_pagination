import classNames from 'classnames';

import { ItemCountToShow } from '../../types/ItemCountToShow';

import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: ItemCountToShow;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numberOfPages = getNumbers(1, Math.ceil(total / perPage));
  const isFirstPage = currentPage === numberOfPages[0];
  const isLastPage = currentPage === numberOfPages[numberOfPages.length - 1];

  const handleClickOfFirstOrLastPage = (page: number) => {
    if (page < 1 || page > numberOfPages.length) {
      return;
    }

    onPageChange(page);
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
          onClick={() => handleClickOfFirstOrLastPage(currentPage - 1)}
        >
          «
        </a>
      </li>

      {numberOfPages.map(page => (
        <li
          key={page}
          className={classNames('page-item', {
            active: page === currentPage,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => onPageChange(page)}
          >
            {page}
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
          onClick={() => handleClickOfFirstOrLastPage(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
