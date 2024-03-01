import classNames from 'classnames';
import { getNumbers } from '../../utils';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = Math.ceil(total / perPage);

  const numbers = getNumbers(1, pages);
  const prevButtonClasses = classNames({
    'page-item': true,
    disabled: currentPage === 1,
  });
  const nextButtonClasses = classNames({
    'page-item': true,
    disabled: currentPage === pages,
  });

  return (
    <ul className="pagination">
      <li className={prevButtonClasses}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {numbers.map(item => (
        <li
          key={item}
          className={`page-item ${currentPage === item && 'active'}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${item}`}
            onClick={() => {
              onPageChange(item);
            }}
          >
            {item}
          </a>
        </li>
      ))}

      <li className={nextButtonClasses}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pages ? 'true' : 'false'}
          onClick={() => {
            if (currentPage !== pages) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
