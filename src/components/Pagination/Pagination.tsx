import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemPerPage: number;
};

export const Pagination: React.FC<Props> = ({
  totalItems,
  itemPerPage,
  onPageChange,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalItems / +itemPerPage);
  const pageNumbers = getNumbers(1, totalPages);

  return (
    <>
      <ul className="pagination">
        <>
          <li className={classNames('page-item',
            { disabled: currentPage <= 0 })}
          >
            <a
              data-cy="prevLink"
              className="page-link"
              href="#prev"
              aria-disabled={currentPage <= 0}
              onClick={() => onPageChange(currentPage - 1)}
            >
              «
            </a>
          </li>
          {pageNumbers.map(number => (
            <li
              key={number}
              className={classNames('page-item',
                { active: currentPage === (number - 1) })}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${number}`}
                onClick={() => onPageChange(number - 1)}
              >
                {number}
              </a>
            </li>
          ))}
          <li className={classNames('page-item',
            { disabled: currentPage >= totalPages - 1 })}
          >
            <a
              data-cy="nextLink"
              className="page-link"
              href="#next"
              aria-disabled={currentPage >= totalPages - 1}
              onClick={() => onPageChange(currentPage + 1)}
            >
              »
            </a>
          </li>
        </>
      </ul>
    </>
  );
};
