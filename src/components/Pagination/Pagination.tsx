import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage : number,
  currentPage?: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pagesNumbers = Math.ceil(total / perPage);

  const mappedPagesNumbers = getNumbers(1, pagesNumbers)
    .map((numb: number) => numb);

  const handlePrevPageClick = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPageClick = () => {
    if (currentPage < pagesNumbers) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: currentPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={handlePrevPageClick}
          >
            «
          </a>
        </li>

        {mappedPagesNumbers.map((item) => (
          <li
            className={cn(
              'page-item',
              { active: currentPage === item },
            )}
            key={item}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${item}`}
              onClick={() => onPageChange(item)}
            >
              {item}
            </a>
          </li>
        ))}

        <li
          className={
            cn(
              'page-item',
              { disabled: currentPage === pagesNumbers },
            )
          }
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pagesNumbers}
            onClick={handleNextPageClick}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
