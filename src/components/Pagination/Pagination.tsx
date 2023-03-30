import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number
  perPage: number
  currentPage: number
  arrOfItems: number[]
  onPageChange: (event: React.MouseEvent<HTMLAnchorElement>) => void
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  arrOfItems,
  onPageChange,
}) => {
  const arrOfPages = (
    sum: number,
    sumOfPosPerPage: number,
  ) => {
    const sumOfPages = Math.ceil(sum / sumOfPosPerPage);

    const pages = getNumbers(1, sumOfPages);

    return pages;
  };

  const amountOfPages = arrOfPages(total, perPage);

  return (
    <>
      <ul className="pagination">
        <li className={classNames(
          'page-item',
          { disabled: currentPage === 1 },
        )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            data-name="currentPage"
            data-value={+currentPage - 1}
            onClick={onPageChange}
          >
            «
          </a>
        </li>

        {amountOfPages.map(page => (
          <li
            className={classNames(
              'page-item',
              { active: +currentPage === page },
            )}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              data-name="currentPage"
              data-value={page}
              onClick={onPageChange}
            >
              {page}
            </a>
          </li>
        ))}
        <li className={classNames(
          'page-item',
          { disabled: currentPage === amountOfPages.length },
        )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === amountOfPages.length}
            data-name="currentPage"
            data-value={+currentPage + 1}
            onClick={onPageChange}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {arrOfItems.map(item => (
          <li key={item} data-cy="item">{`Item ${item}`}</li>
        ))}
      </ul>
    </>
  );
};
