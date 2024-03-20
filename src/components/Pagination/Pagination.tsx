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
          className={cn('page-item', { disabled: currentPage === 1 })}
          onClick={handleBack}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
          >
            «
          </a>
        </li>
        {pagesToRender.map(pageN => (
          <li
            className={cn('page-item', { active: currentPage === pageN })}
            key={pageN}
            value={pageN}
            onClick={() => onPageChange(pageN)}
          >
            <a data-cy="pageLink" className="page-link" href={`#${pageN}`}>
              {pageN}
            </a>
          </li>
        ))}
        <li
          className={cn('page-item', {
            disabled: currentPage === numberOfPages,
          })}
          onClick={handleForward}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === numberOfPages ? 'true' : 'false'}
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
