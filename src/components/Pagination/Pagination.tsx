import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}: Props) => {
  const totalPages = Math.ceil(total / perPage);

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: currentPage === 1 })}>
        <a
          onClick={event => {
            event.preventDefault();

            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
        >
          «
        </a>
      </li>
      {Array.from({ length: totalPages }).map((_: unknown, i: number) => (
        <li
          className={classNames('page-item', { active: i + 1 === currentPage })}
          key={i + 1}
        >
          <a
            onClick={() => {
              if (currentPage !== i + 1) {
                onPageChange(i + 1);
              }
            }}
            data-cy="pageLink"
            className="page-link"
            href={`#${i + 1}`}
          >
            {i + 1}
          </a>
        </li>
      ))}
      <li
        className={classNames('page-item', {
          disabled: currentPage === totalPages,
        })}
      >
        <a
          onClick={event => {
            event.preventDefault();

            if (currentPage < totalPages) {
              onPageChange(currentPage + 1);
            }
          }}
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages}
        >
          »
        </a>
      </li>
    </ul>
  );
};
