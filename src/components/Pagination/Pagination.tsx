import { items } from '../../constants';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesQuantity = Math.ceil(total / perPage);
  const pages = Array.from({ length: pagesQuantity }, (_, i) => i + 1);

  const firstIndexOfItem = (currentPage - 1) * perPage;
  const lastIndexOfItem = firstIndexOfItem + perPage;

  const itemsOnCurrentPage = items.slice(firstIndexOfItem, lastIndexOfItem);

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage <= 1 ? 'true' : 'false'}
            onClick={() => {
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {pages.map(page => (
          <li
            className={`page-item ${currentPage === page ? 'active' : ''}`}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href="#2"
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${currentPage === pagesQuantity ? 'disabled' : ''}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage >= pagesQuantity ? 'true' : 'false'}
            onClick={() => {
              if (currentPage < pagesQuantity) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {itemsOnCurrentPage.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
