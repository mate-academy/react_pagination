import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  itemsPerPage: number,
  currentPage: number,
  onPageChange: (page:number) => void
};

export const Pagination:React.FC<Props> = ({
  total, itemsPerPage, currentPage, onPageChange,
}) => {
  const lastPage = Math.ceil(total / itemsPerPage);
  const pages = getNumbers(1, Math.ceil(lastPage));

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames('page-item', {
            disabled: currentPage === 1,
          })}
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

        {pages.map(page => (
          <li
            key={page}
            className={classNames('page-item', {
              active: page === currentPage,
            })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href="#1"
              onClick={() => {
                onPageChange(page);
              }}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={classNames('page-item', {
            disabled: currentPage === lastPage,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === lastPage}
            onClick={() => {
              if (currentPage !== lastPage) {
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
