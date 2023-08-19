import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total, perPage, currentPage, onPageChange,
}) => {
  const pageCount = Math.ceil(total / perPage);
  const pages = getNumbers(1, pageCount);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageCount;

  const handlePageChange = (page: number, preventChange: boolean) => () => {
    if (preventChange) {
      return;
    }

    onPageChange(page);
  };

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', { disabled: isFirstPage })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={handlePageChange(currentPage + 1, isLastPage)}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          className={classNames('page-item', { active: currentPage === page })}
          key={page}
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
          onClick={handlePageChange(currentPage + 1, isLastPage)}
        >
          »
        </a>
      </li>
    </ul>

  );
};
