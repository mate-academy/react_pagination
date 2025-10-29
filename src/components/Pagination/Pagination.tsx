import { setPages } from '../../utils';

type PaginationType = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: PaginationType) => {
  const pagesAmount = Math.ceil(total / perPage);
  const pagesArr = setPages(pagesAmount);

  function pageChanger(value: number): void {
    onPageChange(value);
  }

  return (
    <ul className="pagination">
      <li
        className={`page-item${currentPage === 1 || total === 0 ? ' disabled' : ''}`}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 || total === 0}
          onClick={() => pageChanger(currentPage - 1)}
        >
          «
        </a>
      </li>

      {pagesArr.length > 0 ? (
        pagesArr.map(page => (
          <li
            key={page}
            className={`page-item ${currentPage === +page ? 'active' : ''}`}
            onClick={() => pageChanger(+page)}
          >
            <a data-cy="pageLink" className="page-link" href={`#${page}`}>
              {page}
            </a>
          </li>
        ))
      ) : (
        <li
          key={1}
          className={`page-item ${currentPage === 1 ? 'active' : ''}`}
          onClick={() => pageChanger(1)}
        >
          <a data-cy="pageLink" className="page-link" href={`#${1}`}>
            {1}
          </a>
        </li>
      )}

      <li
        className={`page-item${currentPage === pagesAmount || total === 0 ? ' disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pagesAmount || total === 0}
          onClick={() => pageChanger(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
