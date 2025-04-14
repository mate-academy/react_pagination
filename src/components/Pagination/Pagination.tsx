import cn from 'classnames';

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
  const pagesAmount: number = Math.ceil(total / perPage);
  const pagesNumbers: number[] = [];

  for (let i = 1; i <= pagesAmount; i++) {
    pagesNumbers.push(i);
  }

  return (
    <ul className="pagination">
      <li className={cn({ 'page-item': true, disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {pagesNumbers.map(page => (
        <li
          className={cn({ 'page-item': true, active: currentPage === page })}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={'#' + page}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={cn({
          'page-item': true,
          disabled: currentPage === pagesNumbers[pagesNumbers.length - 1],
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pagesNumbers[pagesNumbers.length - 1]}
          onClick={() => {
            if (currentPage < pagesAmount) {
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
