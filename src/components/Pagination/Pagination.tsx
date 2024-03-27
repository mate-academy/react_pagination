// import { event } from "cypress/types/jquery";
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

  function handlePageChange(page: number) {
    if (page !== lastPage || page !== 1) {
      onPageChange(page);
      start(1 + perPage.length * (page - 1));
    }
  }

  const next =
    currentPage !== lastPage
      ? () => handlePageChange(currentPage + 1)
      : undefined;

  const prev =
    currentPage !== 1 ? () => handlePageChange(currentPage - 1) : undefined;

  return (
    <>
      <ul className="pagination">
        <li
          className={cn('page-item', {
            disabled: currentPage === 1,
          })}
        >
          <a
            onClick={prev}
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
              onClick={
                currentPage !== item ? () => handlePageChange(item) : undefined
              }
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
            onClick={next}
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === lastPage ? 'true' : 'false'}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {perPage.map(item => {
          const numberOfItem = item.split(' ');

          if (+numberOfItem[1] <= total.length) {
            return (
              <li key={item} data-cy="item">
                {item}
              </li>
            );
          }

          return;
        })}
      </ul>
    </>
  );
};
