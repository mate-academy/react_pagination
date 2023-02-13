import classNames from 'classnames';

type PropTypes = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
  setCurrentPage: (newPage: number) => void;
};

export const Pagination: React.FC<PropTypes> = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];
  const pages = Math.ceil(totalItems / itemsPerPage);

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  const firstPage = pageNumbers[0];
  const lastPage = pageNumbers[pageNumbers.length - 1];

  return (
    <ul className="pagination">
      <li
        className={classNames(
          'page-item',
          { disabled: currentPage === firstPage },
        )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
          aria-disabled={currentPage === firstPage}
        >
          «
        </a>
      </li>
      {
        pageNumbers.map(number => (
          <li
            className={classNames(
              'page-item',
              { active: currentPage === number },
            )}
            key={number}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href="#2"
              onClick={() => paginate(number)}
            >
              {number}
            </a>
          </li>
        ))
      }
      <li className={classNames(
        'page-item',
        { disabled: currentPage === pageNumbers[pageNumbers.length - 1] },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
          aria-disabled={currentPage === lastPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
