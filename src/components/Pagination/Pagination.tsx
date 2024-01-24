import classNames from 'classnames';
import { getNumbers } from '../../utils';

interface Paginations {
  total: number
  currentPage: number
  perPage: number
  onPageChange: (page: number) => void
}

export const Pagination = ({
  total,
  currentPage,
  perPage,
  onPageChange,
}: Paginations) => {
  function onPrevPage() {
    return currentPage !== 1 && onPageChange(currentPage - 1);
  }

  function onNextPage() {
    return currentPage !== Math.ceil(total / (perPage))
      && onPageChange(currentPage + 1);
  }

  return (
    <ul className="pagination">
      <li className={classNames('page-item',
        { disabled: currentPage === 1 })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={onPrevPage}
        >
          «
        </a>
      </li>

      {getNumbers(1, Math.ceil(total / (perPage)))
        .map(item => (
          <li
            className={classNames('page-item',
              { active: currentPage === item })}
            key={item}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${currentPage}`}
              onClick={() => {
                onPageChange(item);
              }}
            >
              {item}
            </a>
          </li>
        ))}

      <li className={classNames('page-item',
        { disabled: currentPage === Math.ceil(total / (perPage)) })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === Math.ceil(total / (perPage))}
          onClick={onNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
