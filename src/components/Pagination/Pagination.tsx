import { getNumbers } from '../../utils';

interface Prop {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void
}
export const Pagination: React.FC<Prop> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPage = (totalItems: number, perPageItems: number) => (
    Math.ceil(totalItems / perPageItems));

  const prevHandler = () => {
    if (currentPage === 1) {
      return;
    }

    onPageChange(currentPage - 1);
  };

  const nextHandler = () => {
    if (currentPage === totalPage(total, perPage)) {
      return;
    }

    onPageChange(currentPage + 1);
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={`page-item ${
            currentPage === 1
              ? 'disabled'
              : ''}`}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={prevHandler}
          >
            «
          </a>
        </li>

        {getNumbers(1, totalPage(total, perPage)).map((page: number) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
          <li
            className={`page-item ${
              page === currentPage
                ? 'active'
                : ''}`}
            key={page}
            onClick={() => onPageChange(page)}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={`page-item ${
            currentPage === totalPage(total, perPage)
              ? 'disabled'
              : ''}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPage(total, perPage)}
            onClick={nextHandler}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
