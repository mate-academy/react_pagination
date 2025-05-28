import cn from 'classnames';
import { StratureIDAndBody } from '../../types/StratureIDAndBody';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange?: (value: number) => void;
}

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange = () => {},
}: PaginationProps) => {
  const countNumbersOfPages = (
    totalLength: number,
    perPageLength: number,
  ): StratureIDAndBody[] => {
    let quantityPages: StratureIDAndBody[] = [];

    const howManyPages = Math.ceil(totalLength / Number(perPageLength));

    for (let i = 1; i <= howManyPages; i++) {
      quantityPages = [...quantityPages, { id: i, body: `${i}` }];
    }

    return quantityPages;
  };

  const numberOfPages = countNumbersOfPages(total, perPage);

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => {
            if (currentPage !== 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {numberOfPages.map((numberPage, idx) => {
        return (
          <li
            key={numberPage.id}
            className={cn('page-item', {
              active: currentPage === +numberPage.body,
            })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${idx + 1}`}
              onClick={() => onPageChange(+numberPage.body)}
            >
              {numberPage.body}
            </a>
          </li>
        );
      })}

      <li
        className={cn('page-item', {
          disabled: currentPage === numberOfPages.length,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === numberOfPages.length}
          onClick={() => {
            if (currentPage !== numberOfPages.length) {
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
