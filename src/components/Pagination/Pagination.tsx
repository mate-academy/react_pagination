import classNames from 'classnames';

type Props = {
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  currentPage: number
};

export const Pagination: React.FC<Props> = (
  {
    totalItems,
    itemsPerPage,
    onPageChange,
    currentPage,
  },
) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      <li className={classNames('page-item', {
        'page-item disabled': currentPage === 1,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${currentPage}`}
          onClick={() => onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>
      {pageNumbers.map(page => (
        <li
          key={page}
          className={classNames(
            'page-item',
            {
              active: page === currentPage,
            },
          )}
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
      <li className={classNames('page-item', {
        'page-item disabled': currentPage === pageNumbers.length,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${currentPage}`}
          onClick={() => onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
