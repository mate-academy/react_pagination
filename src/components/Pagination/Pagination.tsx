import { getNumbers } from '../../utils';

interface IPagination {
  perPage: number;
  total: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  getCurrentItems: () => string[];
}

export const Pagination = ({
  page,
  setPage,
  perPage,
  total,
  getCurrentItems,
}: IPagination) => {

  const listNumbers = Math.ceil(total / perPage);

  const pageNumbers = getNumbers(1, listNumbers);

  const goToNextPage = () => setPage(prev => Math.min(prev + 1, listNumbers));

  const goToPreviousPage = () => setPage(prev => Math.max(prev - 1, 1));

  return (
    <div>
      <ul className="pagination">
        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
          <button
            data-cy="prevLink"
            className="page-link"
            aria-disabled={page === 1}
            onClick={e => {
              e.preventDefault();
              goToPreviousPage();
            }}
          >
            «
          </button>
        </li>

        {pageNumbers.map(pageNumber => (
          <li
            key={pageNumber}
            className={`page-item ${pageNumber === page ? 'active' : ''}`}
          >
            <button
              data-cy="pageLink"
              className="page-link"
              onClick={e => {
                e.preventDefault();
                setPage(pageNumber);
              }}
            >
              {pageNumber}
            </button>
          </li>
        ))}

        <li className={`page-item ${page === listNumbers ? 'disabled' : ''}`}>
          <button
            data-cy="nextLink"
            className="page-link"
            aria-disabled={page === listNumbers}
            onClick={e => {
              e.preventDefault();
              goToNextPage();
            }}
          >
            »
          </button>
        </li>
      </ul>

      <ul>
        {getCurrentItems().map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
