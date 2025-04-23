import cn from 'classnames';

export const Pagination = ({ total, perPage, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(total / perPage);

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pagesCount) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: currentPage === 1,
        })}
        onClick={handlePrev}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled="true"
        >
          «
        </a>
      </li>
      {[...Array(pagesCount)].map((_, index) => {
        const page = index + 1;

        return (
          <li
            key={page}
            className={cn('page-item', {
              active: currentPage === page,
            })}
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
        );
      })}
      <li
        className={cn('page-item', {
          disabled: currentPage === pagesCount,
        })}
        onClick={handleNext}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
        >
          »
        </a>
      </li>
    </ul>
  );
};
