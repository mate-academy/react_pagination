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
  const LAST_PAGE: number = Math.ceil(total.length / perPage.length);
  const ARR_PAGES: number[] = getNumbers(1, LAST_PAGE);

  function handlePageChange(page: number) {
    if (page !== LAST_PAGE || page !== 1) {
      onPageChange(page);
      start(1 + perPage.length * (page - 1));
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
            onClick={
              currentPage !== 1
                ? () => handlePageChange(currentPage - 1)
                : undefined
            }
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
          >
            «
          </a>
        </li>

        {ARR_PAGES.map(item => (
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
            disabled: currentPage === ARR_PAGES.length,
          })}
        >
          <a
            onClick={
              currentPage !== LAST_PAGE
                ? () => handlePageChange(currentPage + 1)
                : undefined
            }
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === LAST_PAGE ? 'true' : 'false'}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {perPage.map(item => {
          const NUMBER_OF_ITEM = item.split(' ');

          if (+NUMBER_OF_ITEM[1] <= total.length) {
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
