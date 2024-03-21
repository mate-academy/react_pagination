import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: string[];
  perPage: number;
  currentPage: number;
  onPageChange: (n: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(total.length / perPage);
  const pagesToRender = getNumbers(1, numberOfPages);

  const sliceFrom = currentPage * perPage - perPage;
  const sliceTo = currentPage * perPage;
  const slicedItems = total.slice(sliceFrom, sliceTo);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === numberOfPages;

  const handleBack = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleForward = () => {
    if (currentPage < numberOfPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={cn('page-item', { disabled: isFirstPage })}
          onClick={handleBack}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirstPage}
          >
            «
          </a>
        </li>
        {pagesToRender.map(page => (
          <li
            className={cn('page-item', { active: currentPage === page })}
            key={page}
            value={page}
            onClick={() => onPageChange(page)}
          >
            <a data-cy="pageLink" className="page-link" href={`#${page}`}>
              {page}
            </a>
          </li>
        ))}
        <li
          className={cn('page-item', {
            disabled: isLastPage,
          })}
          onClick={handleForward}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLastPage}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {slicedItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
