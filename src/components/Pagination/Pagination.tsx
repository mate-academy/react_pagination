import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}: Props) => {
  const numberOfPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, numberOfPages);

  function handlePageChange(page: number) {
    if (page === currentPage) {
      return;
    }

    if (page < pages[0] || page > (pages.at(-1) as number)) {
      return;
    }

    onPageChange(page);
  }

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === pages[0] ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${currentPage - 1}`}
          aria-disabled={currentPage === pages[0]}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          key={page}
          className={`page-item ${page === currentPage ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={`page-item ${currentPage === pages.at(-1) ? 'disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${currentPage + 1}`}
          aria-disabled={currentPage === pages.at(-1)}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
