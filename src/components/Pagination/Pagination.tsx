import cn from 'classnames';

type PaginationProps = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

function paginationsCount(total: number, perPage: number): number[] {
  const count = total / perPage;
  const result = [];

  for (let i = 0; i < count; i += 1) {
    result.push(i + 1);
  }

  return result;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const paginationNumbers = paginationsCount(total, perPage);
  const firstPage = paginationNumbers[0];
  const lastPage = paginationNumbers[paginationNumbers.length - 1];

  return (
    <ul className="pagination">
      <li className={cn('page-item', {
        disabled: currentPage === firstPage,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === firstPage}
          onClick={() => {
            if (currentPage !== firstPage) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {paginationNumbers.map(((pagination: number) => (
        <li
          className={cn('page-item', {
            active: pagination === currentPage,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pagination}`}
            onClick={() => onPageChange(pagination)}
          >
            {`${pagination}`}
          </a>
        </li>
      )))}

      <li className={cn('page-item', {
        disabled: currentPage === lastPage,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === lastPage}
          onClick={() => {
            if (currentPage !== lastPage) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
