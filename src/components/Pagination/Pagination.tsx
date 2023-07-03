import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { getNumbers } from '../../utils';

type Props = {
  totalItems: string[];
  currentItems: string[];
  currentPage: number;
  onPageChange: (page: number) => void;
  itemPerPage: number;
};

export const Pagination: React.FC<Props> = ({
  totalItems,
  itemPerPage,
  onPageChange,
  currentPage,
  currentItems,
}) => {
  const location = useLocation();
  const totalPages = Math.ceil(totalItems.length / +itemPerPage);
  const pageNumbers = getNumbers(1, totalPages);

  return (
    <>
      <ul className="pagination">
        <>
          <li className={classNames('page-item',
            { disabled: currentPage <= 0 })}
          >
            <Link
              data-cy="prevLink"
              className="page-link"
              to={{ pathname: '/prev' }}
              aria-disabled={currentPage <= 0}
              onClick={() => onPageChange(currentPage - 1)}
            >
              «
            </Link>
          </li>
          {pageNumbers.map(number => (
            <li
              key={number}
              className={classNames('page-item',
                { active: currentPage === (number - 1) })}
            >
              <Link
                data-cy="pageLink"
                className="page-link"
                to={{ pathname: `/${number + 1}`, search: location.search }}
                onClick={() => onPageChange(number - 1)}
              >
                {number}
              </Link>
            </li>
          ))}
          <li className={classNames('page-item',
            { disabled: currentPage >= totalPages - 1 })}
          >
            <Link
              data-cy="nextLink"
              className="page-link"
              to="next"
              aria-disabled={currentPage >= totalPages - 1}
              onClick={() => onPageChange(currentPage + 1)}
            >
              »
            </Link>
          </li>
        </>
      </ul>

      <ul>
        {currentItems.map(item => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
};
