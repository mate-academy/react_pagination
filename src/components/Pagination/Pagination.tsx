import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
};

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: Props) => {
  const pagesCount = Math.ceil(total / perPage);

  const paginationItems: number[] = [];

  for (let i = 0; i < pagesCount; i++) {
    paginationItems.push(i + 1);
  }

  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === pagesCount;

  return (
    <ul className="pagination">
      <li className={cn('page-item', isPreviousDisabled && 'disabled')}>
        <a
          onClick={() => {
            if (isPreviousDisabled) {
              return;
            }

            onPageChange(prev => prev - 1);
          }}
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isPreviousDisabled}
        >
          «
        </a>
      </li>

      {paginationItems.map(item => (
        <li
          key={item}
          className={cn('page-item', currentPage === item && 'active')}
        >
          <a
            onClick={() => {
              if (currentPage === item) {
                return;
              }

              onPageChange(item);
            }}
            data-cy="pageLink"
            className="page-link"
            href={`#${item}`}
          >
            {item}
          </a>
        </li>
      ))}

      <li className={cn('page-item', isNextDisabled && 'disabled')}>
        <a
          onClick={() => {
            if (isNextDisabled) {
              return;
            }

            onPageChange(prev => prev + 1);
          }}
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isNextDisabled}
        >
          »
        </a>
      </li>
    </ul>
  );
};
