import classNames from 'classnames';
import { getNumbers } from '../../utils';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  function onPrevPage() {
    return currentPage !== 1 && onPageChange(currentPage - 1);
  }

  function onNextPage() {
    return currentPage !== Math.ceil(total / (perPage))
      && onPageChange(currentPage + 1);
  }

  const isLastPage = currentPage === Math.ceil(total / (perPage));

  return (
    <ul className="pagination">
      <li className={classNames('page-item',
        { disabled: currentPage === 1 })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1
            ? 'true'
            : 'false'}
          onClick={onPrevPage}
        >
          «
        </a>
      </li>

      {getNumbers(1, Math.ceil(total / (perPage)))
        .map(item => (
          <li
            key={item}
            className={classNames('page-item',
              { active: currentPage === item })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${currentPage}`}
              onClick={() => onPageChange(item)}
            >
              {item}
            </a>
          </li>
        ))}

      <li className={classNames('page-item',
        { disabled: isLastPage })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={onNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
