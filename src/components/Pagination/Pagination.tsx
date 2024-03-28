import { getNumbers } from '../../utils';
import cn from 'classnames';

type Props = {
  start: (fun: number) => void;
  total: string[];
  perPage: string[];
  currentPage: number;
  onPageChange: (fun: number) => void;
};

export const Pagination: React.FC<Props> = ({
  start,
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const lastPage: number = Math.ceil(total.length / perPage.length);
  const arrPages: number[] = getNumbers(1, lastPage);

  function handlePageClick(page: number) {
    if (page !== 0 && page !== lastPage + 1) {
      onPageChange(page);
      start(1 + perPage.length * (page - 1));
    }
  }

  const itemsMaping = (arr: string[]) => {
    return arr.map(item => {
      const numberOfItem = item.split(' ');

      if (+numberOfItem[1] <= total.length) {
        return (
          <li key={item} data-cy="item">
            {item}
          </li>
        );
      }

      return false;
    });
  };

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
              href="#1"
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

      <ul>{itemsMaping(perPage)}</ul>
    </>
  );
};
