import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (arg: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const existingPages = Math.ceil(total / perPage);
  const pages = Array.from({ length: existingPages }, (_, i) => i + 1);
  const prevAria = currentPage !== 1;
  const nextAria = currentPage !== pages.length;
  const handlePageCkick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames(
            'page-item',
            { disabled: !prevAria },
          )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={prevAria}
            onClick={() => handlePageCkick(currentPage - 1)}
          >
            «
          </a>
        </li>
        {pages.map(page => (
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
              onClick={() => handlePageCkick(page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={classNames(
            'page-item',
            { disabled: !nextAria },
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={nextAria}
            onClick={() => handlePageCkick(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
