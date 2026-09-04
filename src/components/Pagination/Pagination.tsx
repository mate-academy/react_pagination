import classNames from 'classnames';

type PaginationType = {
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
}: PaginationType) => {
  const pages = [];
  const maxPages = Math.ceil(total / perPage);

  for (let page = 1; page <= maxPages; page++) {
    pages.push(page);
  }

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames(
            'page-item',
            currentPage === 1 ? 'disabled' : '',
          )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={event => {
              event.preventDefault();
              if (currentPage - 1 > 0) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {pages.map(page => {
          return (
            <li
              className={classNames(
                'page-item',
                currentPage === page ? 'active' : '',
              )}
              key={page}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${page}`}
                onClick={event => {
                  event.preventDefault();
                  onPageChange(page);
                }}
              >
                {page}
              </a>
            </li>
          );
        })}
        <li
          className={classNames(
            'page-item',
            currentPage === maxPages ? 'disabled' : '',
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === maxPages ? 'true' : 'false'}
            onClick={event => {
              event.preventDefault();
              if (currentPage + 1 <= maxPages) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
