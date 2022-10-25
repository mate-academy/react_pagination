import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  itemsPerPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / itemsPerPage);

  const handleSetPage = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const page = Number(event.currentTarget.dataset.currentPage);

    onPageChange(page);
  };

  const handlePreviousPage = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage !== (Math.ceil(total / itemsPerPage))) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item', { disabled: currentPage === 1 },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          data-current-page={currentPage - 1}
          onClick={handlePreviousPage}
        >
          «
        </a>
      </li>

      {getNumbers(1, totalPages).map((page) => (
        <li
          className={classNames(
            'page-item', { active: page === currentPage },
          )}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            data-current-page={page}
            href={`#${page}`}
            onClick={handleSetPage}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={classNames(
          'page-item', { disabled: currentPage === totalPages },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          data-current-page={currentPage + 1}
          aria-disabled={currentPage === totalPages}
          onClick={handleNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
