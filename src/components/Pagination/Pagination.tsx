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
  const totalPages = Math.ceil(total / perPage);

  const handlePrevClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (currentPage < totalPages) {
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
          onClick={handlePrevClick}
        >
          «
        </a>
      </li>

      {[...Array(totalPages)].map((_, index) => (
        <li
          key={index + 1}
          className={classNames('page-item', {
            active: index + 1 === currentPage,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${index + 1}`}
            onClick={event => {
              event.preventDefault();
              onPageChange(index + 1);
            }}
          >
            {index + 1}
          </a>
        </li>
      ))}

      <li
        className={classNames('page-item', {
          disabled: currentPage === totalPages,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={handleNextClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};
