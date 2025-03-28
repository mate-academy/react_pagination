import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const maxPage = Math.ceil(total / perPage);
  const pages = Array.from({ length: maxPage }, (_, i) => i + 1);
  const previousBDisabled = currentPage === 1;
  const nextBDisabled = currentPage === maxPage;

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: previousBDisabled,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={previousBDisabled}
          onClick={() => {
            if (!previousBDisabled) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          className={classNames('page-item', {
            active: page === currentPage,
          })}
          key={`#{${page}}`}
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
        className={classNames('page-item', {
          disabled: nextBDisabled,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={nextBDisabled}
          onClick={() => {
            if (!nextBDisabled) {
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
