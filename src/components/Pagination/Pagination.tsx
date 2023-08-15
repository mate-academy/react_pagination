import { IPagination } from '../../interfaces/IPagination';
import { PageItem } from '../PageItem';
import { getNumbers } from '../../utils';

export const Pagination: React.FC<IPagination> = ({
  total,
  perPage,
  currentPage,
  onChangePage,
}) => {
  const pages = getNumbers(1, Math.ceil(total / perPage));
  const lastPage = Math.ceil(total / perPage);

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => {
              if (currentPage !== 1) {
                onChangePage(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {pages.map(page => {
          return (
            <PageItem
              key={page}
              isActive={currentPage === page}
              numberOfElem={page}
              onChangePage={onChangePage}
              total={total}
            />
          );
        })}
        <li className={`page-item ${currentPage === lastPage && 'disabled'}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === lastPage}
            onClick={() => {
              if (currentPage !== lastPage) {
                onChangePage(currentPage + 1);
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
