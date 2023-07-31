import { getNumbers } from '../../utils';

type Func = (page: number) => void;

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: Func
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = Math.ceil(total / perPage);

  const pagesInPagination = getNumbers(1, pages);

  return (
    <ul className="pagination">
      <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
        <a
          onClick={() => onPageChange(currentPage - 1)}
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
        >
          «
        </a>
      </li>
      {pagesInPagination.map(page => (
        <li
          key={page}
          className={currentPage === page ? (
            'page-item active'
          ) : (
            'page-item'
          )}
        >
          <a
            onClick={() => onPageChange(page)}
            data-cy="pageLink"
            className="page-link"
            href="#2"
          >
            {page}
          </a>
        </li>
      ))}
      <li className={currentPage === pages ? (
        'page-item disabled'
      ) : (
        'page-item'
      )}
      >
        <a
          onClick={() => onPageChange(currentPage + 1)}
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pages ? 'true' : 'false'}
        >
          »
        </a>
      </li>
    </ul>
  );
};
