import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  setCurrentPage: (x: number) => void;
};

export const Pagination: React.FC<Props> = ({
  perPage,
  total,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handlePrevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const prevButtonToggle = currentPage === 1 ? 'true' : 'false';

  const handleNextPage = () => {
    if (pageNumbers.length !== currentPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const nextButtonToggle =
    currentPage === pageNumbers.length ? 'true' : 'false';

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={prevButtonToggle}
          onClick={handlePrevPage}
        >
          «
        </a>
      </li>
      {pageNumbers.map(number => (
        <li
          key={number}
          className={cn('page-item', { active: number === currentPage })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${number}`}
            onClick={() => paginate(number)}
          >
            {number}
          </a>
        </li>
      ))}
      <li
        className={cn('page-item', {
          disabled: currentPage === pageNumbers.length,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={nextButtonToggle}
          onClick={handleNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
