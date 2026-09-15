import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: Props) => {
  const pageCount = Math.ceil(total / perPage);
  const pages = getNumbers(1, pageCount);

  const onPrevClick = () => {
    const isFirstPage = currentPage === 1;

    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const onNextClick = () => {
    const isLastPage = currentPage === pageCount;

    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const onPageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={onPrevClick}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          className={classNames('page-item', { active: page === currentPage })}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => onPageClick(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={classNames('page-item', {
          disabled: currentPage === pageCount,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageCount}
          onClick={onNextClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};
