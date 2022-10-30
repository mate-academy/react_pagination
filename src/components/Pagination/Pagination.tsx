import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(total / perPage);
  const pages = Array(numberOfPages).fill(1).map((number, i) => number + i);

  return (
    <>
      <ul className="pagination">
        <li className={classNames(
          'page-item',
          { disabled: currentPage === 1 },
        )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
            onClick={() => onPageChange(currentPage - 1)}
          >
            «
          </a>
        </li>
        {pages.map((page: number) => {
          return (
            <li
              className={classNames(
                'page-item',
                { active: page === currentPage },
              )}
              key={page}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${page}`}
                onClick={() => (page !== currentPage) && onPageChange(page)}
              >
                {page}
              </a>
            </li>
          );
        })}
        <li className={classNames(
          'page-item',
          { disabled: currentPage === numberOfPages },
        )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
            onClick={() => onPageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
