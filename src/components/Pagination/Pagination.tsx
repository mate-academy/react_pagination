import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = Math.ceil(total / perPage);
  const numberPages = getNumbers(1, pages);

  return (
    <>
      <ul className="pagination">
        <li
          className={`page-item ${currentPage === 1 && 'disabled'}`}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => {
              if (currentPage !== 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>

        {numberPages.map(number => (
          <li
            className={`page-item ${currentPage === number && 'active'}`}
            key={number}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${number}`}
              onClick={() => {
                if (number !== currentPage) {
                  onPageChange(number);
                }
              }}
            >
              {number}
            </a>
          </li>
        ))}

        <li
          className={`page-item ${currentPage === pages && 'disabled'}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pages}
            onClick={() => {
              if (currentPage !== pages) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
