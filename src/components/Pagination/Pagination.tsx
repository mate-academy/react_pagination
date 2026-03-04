import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(total / perPage);
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  const handlePageActive =
    (page: number) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();

      if (page === currentPage || page < 1 || page > pagesCount) {
        return;
      }

      onPageChange(page);
    };

  const disablePrev = 1 === currentPage;
  const disableNext = pagesCount === currentPage;

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: disablePrev,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={disablePrev}
          onClick={handlePageActive(currentPage - 1)}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          key={page}
          className={classNames('page-item', {
            active: page === currentPage,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={handlePageActive(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={classNames('page-item', {
          disabled: disableNext,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={disableNext}
          onClick={handlePageActive(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
