import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  setCurrentPage,
}) => {
  const countPagintion: number = Math.ceil(total / perPage);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const plassPageClick = () => {
    if (currentPage < countPagintion) {
      setCurrentPage(currentPage + 1);
    }
  };

  const minusPageClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
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
          href="#next"
          aria-disabled={currentPage === 1}
          onClick={minusPageClick}
        >
          «
        </a>
      </li>
      {Array.from({ length: countPagintion }, (_, i) => i + 1).map(page => (
        <li
          key={page}
          className={classNames('page-item', {
            active: currentPage === page,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={classNames('page-item', {
          disabled: currentPage === countPagintion,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === countPagintion}
          onClick={plassPageClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};
