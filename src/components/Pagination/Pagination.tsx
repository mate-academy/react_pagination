import { getNumbers } from '../../utils';
import cn from 'classnames';

type Props = {
  total: string[];
  visibleItems: number[];
  currentPage: number;
  onPageChange: (fun: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  visibleItems,
  currentPage,
  onPageChange,
}) => {
  const lastPage: number = Math.ceil(total.length / visibleItems.length);
  const arrPages: number[] = getNumbers(1, lastPage);

  function handlePageClick(page: number) {
    if (page !== 0 && page !== lastPage + 1) {
      onPageChange(page);
    }
  }

  return (
    <>
      <ul className="pagination">
        <li
          className={cn('page-item', {
            disabled: currentPage === 1,
          })}
        >
          <a
            onClick={() => handlePageClick(currentPage - 1)}
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
          >
            «
          </a>
        </li>

        {arrPages.map(item => (
          <li
            key={item}
            className={cn('page-item', {
              active: item === currentPage,
            })}
          >
            <a
              onClick={() => handlePageClick(item)}
              data-cy="pageLink"
              className="page-link"
              href={`#${item}`}
            >
              {item}
            </a>
          </li>
        ))}

        <li
          className={cn('page-item', {
            disabled: currentPage === arrPages.length,
          })}
        >
          <a
            onClick={() => handlePageClick(currentPage + 1)}
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === lastPage ? 'true' : 'false'}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
