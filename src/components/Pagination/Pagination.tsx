import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (arg: number) => void;
  onArrowClick: (arg: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  onArrowClick,
}) => {
  const existingPages = Math.ceil(total / perPage);
  const pages = Array.from({ length: existingPages }, (_, i) => i + 1);
  const prevAria = currentPage !== 1;
  const nextAria = currentPage !== pages.length;

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
            onClick={() => onArrowClick(-1)}
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
              onClick={() => onPageChange(page)}
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
            onClick={() => onArrowClick(1)}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
