import classNames from 'classnames';
import { getNumbers } from '../../utils';

export const Pagination: React.FC<{
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
}> = ({ total, perPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(total / perPage);

  const pages = getNumbers(1, totalPages);

  const getCurrentItems: () => number[] = () => {
    const firstCurrentItem = 1 + (currentPage - 1) * perPage;

    if (currentPage === totalPages) {
      return getNumbers(firstCurrentItem, total);
    }

    const lastCurrentItem = firstCurrentItem + perPage - 1;

    return getNumbers(firstCurrentItem, lastCurrentItem);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const prevItemClassName = classNames({
    'page-item': true,
    disabled: currentPage === 1,
  });

  const nextItemClassName = classNames({
    'page-item': true,
    disabled: currentPage === totalPages,
  });

  const pageItemClassName = (page: number) =>
    classNames({
      'page-item': true,
      active: currentPage === page,
    });

  return (
    <>
      <ul className="pagination">
        <li className={prevItemClassName}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? true : false}
            onClick={handlePreviousPage}
          >
            «
          </a>
        </li>
        {pages.map((page: number) => (
          <li key={page} className={pageItemClassName(page)}>
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
        <li className={nextItemClassName}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages ? true : false}
            onClick={handleNextPage}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {getCurrentItems().map((currentItem: number) => (
          <li key={currentItem} data-cy="item">
            Item {currentItem}
          </li>
        ))}
      </ul>
    </>
  );
};
