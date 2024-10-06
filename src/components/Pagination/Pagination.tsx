import classNames from 'classnames';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: Props) => {
  const totalPages = Math.ceil(total / perPage);

  const onPrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const onNextClick = () => {
    if (currentPage < total) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: currentPage === 1,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={onPrevClick}
        >
          «
        </a>
      </li>

      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <li
            key={page}
            className={classNames('page-item', {
              active: currentPage === page,
            })}
          >
            <a
              data-cy={`pageLink-${page}`}
              className="page-link"
              href={`#${page}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        );
      })}

      <li className="page-item">
        <a
          data-cy="nextLink"
          className={classNames('page-item', {
            disabled: currentPage === totalPages,
          })}
          href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={onNextClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};
