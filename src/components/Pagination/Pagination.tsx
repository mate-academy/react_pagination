import classNames from 'classnames';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (pageNumber: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageAmount = Math.ceil(total / perPage);
  const pageNumbers = [];

  for (let i = 1; i <= pageAmount; i += 1) {
    pageNumbers.push(i);
  }

  const hasFirstPage = currentPage === 1;

  const handlePrevButtonClick = () => {
    if (!hasFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextButtonClick = () => {
    if (pageAmount <= total) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', { disabled: hasFirstPage })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={hasFirstPage}
          onClick={handlePrevButtonClick}
        >
          «
        </a>
      </li>

      {pageNumbers.map(page => (
        <li
          key={page}
          className={classNames(
            'page-item', { active: page === currentPage },
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
          'page-item', { disabled: currentPage === pageAmount },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="true"
          onClick={handleNextButtonClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};
