/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames';
import { getNumbers, getPages } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = (
  {
    total,
    perPage,
    currentPage,
    onPageChange,
  },
) => {
  const pagesCount = getPages(perPage, total);
  const pages = getNumbers(1, pagesCount);

  const firstPage = currentPage === 1;
  const lastPage = currentPage === pagesCount;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const handleArrows = (page: number) => {
    if (page > pagesCount || page < 1) {
      return;
    }

    onPageChange(page);
  };

  return (
    <ul className="pagination">
      <li
        className={
          classNames(
            'page-item',
            {
              disabled: firstPage,
            },
          )
        }
        onClick={() => handleArrows(prevPage)}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${prevPage}`}
          aria-disabled={firstPage}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={
            classNames(
              'page-item',
              {
                active: currentPage === page,
              },
            )
          }
          onClick={() => onPageChange(page)}
        >
          <a data-cy="pageLink" className="page-link" href={`#${page}`}>{page}</a>
        </li>
      ))}

      <li
        className={
          classNames(
            'page-item',
            {
              disabled: lastPage,
            },
          )
        }
        onClick={() => handleArrows(nextPage)}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${nextPage}`}
          aria-disabled={lastPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
