import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange = () => {},
}) => {
  const pages = Math.ceil(total / perPage);
  const generatePages = getNumbers(1, pages);
  const isFirstPageSelected = currentPage === 1;
  const isLastPageSelected = currentPage === pages;

  const getClassName = (condition: boolean) => cn('page-item',
    { disabled: condition });

  const handlePrev = () => !isFirstPageSelected
  && onPageChange(currentPage - 1);

  const handleNext = () => !isLastPageSelected
  && onPageChange(currentPage + 1);

  const handleChangePage = ({ currentTarget }:
  React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const { textContent } = currentTarget;

    if (textContent !== null) {
      onPageChange(+textContent);
    }
  };

  return (
    <ul className="pagination">
      <li className={getClassName(isFirstPageSelected)}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPageSelected}
          onClick={handlePrev}
        >
          «
        </a>
      </li>

      {generatePages.map(page => (
        <li
          key={page}
          className={cn('page-item',
            { active: page === currentPage })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={handleChangePage}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={getClassName(isLastPageSelected)}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPageSelected}
          onClick={handleNext}
        >
          »
        </a>
      </li>
    </ul>
  );
};
