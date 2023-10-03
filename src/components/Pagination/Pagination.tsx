import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const amountOfPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, amountOfPages);

  const firstPage = currentPage === 1;
  const lastPage = currentPage === amountOfPages;

  const handlePrevLink = () => {
    if (!firstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextLink = () => {
    if (!lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: firstPage })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={firstPage}
          onClick={handlePrevLink}
        >
          «
        </a>
      </li>

      {pages.map(el => (
        <li
          className={cn('page-item', { active: el === currentPage })}
          key={el}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${el}`}
            onClick={() => onPageChange(el)}
          >
            {el}
          </a>
        </li>
      ))}

      <li className={cn('page-item', { disabled: lastPage })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={lastPage}
          onClick={handleNextLink}
        >
          »
        </a>
      </li>
    </ul>
  );
};
