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
  const pagesCount = Math.ceil(total / perPage);
  const pages = getNumbers(1, pagesCount);
  const isNextDisabled = pagesCount === currentPage;
  const isPrevDisabled = currentPage === 1;

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: isPrevDisabled,
        })}
      >
        <a
          onClick={() => !isPrevDisabled && onPageChange(currentPage - 1)}
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isPrevDisabled ? 'true' : 'false'}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          key={page}
          className={classNames('page-item', { active: page === currentPage })}
        >
          <a
            onClick={() => onPageChange(page)}
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={classNames('page-item', {
          disabled: isNextDisabled,
        })}
      >
        <a
          onClick={() => !isNextDisabled && onPageChange(currentPage + 1)}
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isNextDisabled ? 'true' : 'false'}
        >
          »
        </a>
      </li>
    </ul>
  );
};
