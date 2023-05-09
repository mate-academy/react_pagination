import classNames from 'classnames';
import { Link, useMatch } from 'react-router-dom';
import { getNumbers } from '../../utils';

type Props = {
  itemAmount: number,
  itemsPerPage: number,
};

export const Pagination: React.FC<Props> = ({
  itemAmount,
  itemsPerPage,
}) => {
  const match = useMatch('/:currentPage');
  let currentPage: number;

  if (match?.params.currentPage) {
    currentPage = +match?.params.currentPage;
  } else {
    currentPage = 1;
  }

  const numberOfPages = Math.ceil(itemAmount / itemsPerPage);
  const paginationButtons = getNumbers(1, numberOfPages);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === numberOfPages;

  return (
    <ul className="pagination">
      <li
        className={classNames(
          'page-item',
          { disabled: isFirstPage },
        )}
      >
        <Link
          data-cy="prevLink"
          className="page-link"
          to={`${currentPage - 1}`}
          aria-disabled={isFirstPage}
        >
          «
        </Link>
      </li>
      {paginationButtons.map((page) => (
        <li
          key={page}
          className={classNames(
            'page-item',
            { active: page === currentPage },
          )}
        >
          <Link
            data-cy="pageLink"
            className="page-link"
            to={`${page}`}
          >
            {page}
          </Link>
        </li>
      ))}
      <li
        className={classNames(
          'page-item',
          { disabled: isLastPage },
        )}
      >
        <Link
          data-cy="nextLink"
          className="page-link"
          to={`${currentPage + 1}`}
          aria-disabled={isLastPage}
        >
          »
        </Link>
      </li>
    </ul>
  );
};
