import classNames from 'classnames';
import { MouseEvent } from 'react';
import { getNumbers } from '../../utils';

type Props = {
  pages: number[][],
  currentPage: number,
  onPageChange: (alue: number) => void,
  nextPage: () => void,
  prevPage: () => void,
};

export const Pagination: React.FC<Props> = ({
  pages,
  currentPage,
  onPageChange,
  nextPage,
  prevPage,
}) => {
  const valuePages = getNumbers(1, pages.length);

  const hadlerChangePage = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.currentTarget.textContent) {
      onPageChange(+event.currentTarget.textContent);
    }
  };

  return (
    <ul
      className="pagination"
    >
      <li
        className={classNames(
          'page-item',
          { disabled: currentPage === 1 },
        )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={currentPage === 1}
          onClick={prevPage}
        >
          «
        </a>
      </li>

      {valuePages.map(page => (
        <li
          className={classNames(
            'page-item',
            { active: page === currentPage },
          )}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={(event) => hadlerChangePage(event)}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={classNames(
          'page-item',
          { disabled: currentPage === pages.length },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={currentPage === pages.length}
          onClick={nextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
