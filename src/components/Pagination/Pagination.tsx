import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: Props) => {
  const amountOfPages = Math.ceil(total / perPage);
  const pageList = getNumbers(1, amountOfPages)
    .fill(0)
    .map((_, i) => i + 1);
  const itemList = getNumbers(1, total).map((_, i) => (
    // eslint-disable-next-line react/no-array-index-key
    <li key={i} data-cy="item">{`Item ${i + 1}`}</li>
  ));

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: currentPage === 1 })}>
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
        {pageList.map(page => (
          <li
            key={page}
            className={cn({
              'page-item': true,
              active: currentPage === page,
            })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${currentPage}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={cn('page-item', {
            disabled: currentPage === amountOfPages,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === amountOfPages ? 'true' : 'false'}
            onClick={() => {
              if (currentPage < amountOfPages) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemList.slice(perPage * currentPage - perPage, perPage * currentPage)}
      </ul>
    </>
  );
};
