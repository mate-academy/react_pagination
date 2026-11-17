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
  const pages = getNumbers(1, Math.ceil(total / perPage));

  const goNext = () => {
    if (currentPage !== Math.max(...pages)) {
      onPageChange(currentPage + 1);
    }
  };

  const goBack = () => {
    if (currentPage !== Math.min(...pages)) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: currentPage === Math.min(...pages),
        })}
        onClick={goBack}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === Math.min(...pages)}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          className={classNames('page-item', { active: currentPage === page })}
          key={page}
          onClick={() => onPageChange(page)}
        >
          <a data-cy="pageLink" className="page-link" href={`#${page}`}>
            {page}
          </a>
        </li>
      ))}
      <li
        className={classNames('page-item', {
          disabled: currentPage === Math.max(...pages),
        })}
        onClick={goNext}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === Math.max(...pages)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
