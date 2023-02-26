import classNames from 'classnames';
import { Props } from '../../types/pagination';
import { getNumbers } from '../../utils';

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesNumbers = ((total % perPage) === 0)
    ? total / perPage
    : Math.ceil(total / perPage);

  const pages = getNumbers(1, pagesNumbers);

  const lastPage = currentPage === pagesNumbers;
  const firstPage = currentPage === 1;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const handlePageChange = (page: number) => {
    if (page === currentPage || page > pagesNumbers || page < 1) {
      return;
    }

    onPageChange(page);
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: firstPage })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${prevPage}`}
          aria-disabled={firstPage}
          onClick={() => handlePageChange(prevPage)}
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

      <li className={classNames('page-item', { disabled: lastPage })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${nextPage}`}
          aria-disabled={lastPage}
          onClick={() => handlePageChange(nextPage)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
