import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  currentPage: number;
  onPageChange: (page: number) => void;
  total: number;
  perPage: number;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  onPageChange,
  total,
  perPage,
}) => {
  const pagesCount = Math.ceil(total / perPage);
  const pages = getNumbers(1, pagesCount);
  const prevItem = () => {
    onPageChange(currentPage - 1);
  };

  const nextItem = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', {
        disabled: currentPage === 1,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={prevItem}
        >
          «
        </a>
      </li>
      {pages.map((page) => (
        <li
          key={page}
          className={classNames('page-item', {
            active: page === currentPage,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href="#1"
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={classNames('page-link', {
        disabled: currentPage === pagesCount,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pagesCount}
          onClick={nextItem}
        >
          »
        </a>
      </li>
    </ul>
  );
};
