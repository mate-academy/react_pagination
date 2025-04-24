import cls from 'classnames';
import { getNumbers } from '../../utils';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const paginationArray = getNumbers(1, totalPages);

  return (
    <>
      <ul className="pagination">
        <li className={cls('page-item', { disabled: currentPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={() => {
              if (currentPage !== paginationArray[0]) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {paginationArray.map((item, index) => {
          return (
            <li
              key={index}
              className={cls('page-item', {
                active: currentPage === item,
              })}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${item}`}
                onClick={() => onPageChange(item)}
              >
                {item}
              </a>
            </li>
          );
        })}

        <li
          className={cls('page-item', { disabled: currentPage === totalPages })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages ? 'true' : 'false'}
            onClick={() => {
              if (currentPage !== paginationArray[paginationArray.length - 1]) {
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
