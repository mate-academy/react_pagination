import classNames from 'classnames';

interface PaginationProps {
  total: number,
  perPage: number,
  // eslint-disable-next-line react/require-default-props
  currentPage?: number,
  onPageChange: (page: number) => void,
}

const pages = (amount: number) => {
  const numberedPages = [];

  for (let i = 1; i <= amount; i += 1) {
    numberedPages.push(i);
  }

  return numberedPages;
};

export const Pagination = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}: PaginationProps) => {
  const lastPage = Math.ceil(total / perPage);

  const handleNextPage = () => {
    onPageChange(currentPage !== lastPage ? currentPage + 1 : currentPage);
  };

  const handlePrevPage = () => {
    onPageChange(currentPage !== 1 ? currentPage - 1 : currentPage);
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', {
        disabled: currentPage === 1,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={handlePrevPage}
        >
          «
        </a>
      </li>
      {pages(lastPage).map(page => (
        <li
          className={classNames('page-item',
            { active: page === currentPage })}
          key={page}
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
      <li className={classNames('page-item',
        { disabled: currentPage === lastPage })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === lastPage}
          onClick={handleNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
