import classNames from 'classnames';

interface PaginationType {
  totalNumber: number,
  listOfItems: number,
  currentPage: number,
  setCurrentPage: (page: number) => void,
}

export const Pagination = ({
  totalNumber,
  listOfItems,
  currentPage,
  setCurrentPage = () => {},
}: PaginationType) => {
  const listOfPages = Math.ceil(totalNumber / listOfItems);

  const getPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getNextPage = () => {
    if (currentPage !== listOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item',
        { disabled: currentPage === 1 },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={
            currentPage === 1
              ? 'true'
              : 'false'
          }
          onClick={getPreviousPage}
        >
          «
        </a>
      </li>

      {Array.from({ length: listOfPages }, (_, i) => (
        <li
          className={classNames(
            'page-item',
            { active: currentPage === i + 1 },
          )}
          key={i}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${i + 1}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </a>
        </li>
      ))}

      <li className={classNames(
        'page-item',
        { disabled: currentPage === listOfPages },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={
            currentPage === listOfPages
              ? 'true'
              : 'false'
          }
          onClick={getNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
