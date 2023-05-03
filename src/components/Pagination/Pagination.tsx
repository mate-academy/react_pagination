import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  totalPages: number;
  onChangePage: (number: number) => void;
  currentPage: number;
};

export const Pagination: React.FC<Props> = ({
  totalPages,
  onChangePage: handleChangePage,
  currentPage,
}) => {
  const pageSelectors = getNumbers(1, totalPages);

  return (
    <ul className="pagination">
      <li className="page-item disabled">
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled="true"
        >
          «
        </a>
      </li>
      {pageSelectors.map(pageSelector => (
        <li
          className={
            classNames('page-item', {
              active: pageSelector === currentPage,
            })
          }
          key={pageSelector}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageSelector}`}
            onClick={() => handleChangePage(pageSelector)}
          >
            {pageSelector}
          </a>
        </li>
      ))}
      ;
      <li className="page-item">
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
        >
          »
        </a>
      </li>
    </ul>
  );
};
