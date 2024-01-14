import cn from 'classnames';

type Selected = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
};

export const Pagination: React.FC<Selected> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const visibleItems: number[] = [];
  const pageCounter: number[] = [];

  const startOfCount = (currentPage * perPage) - perPage + 1;
  let endOfCount = currentPage * perPage;
  const endOfPagesCount = Math.ceil(total / perPage);

  if (endOfCount > total) {
    endOfCount = total;
  }

  for (let i = startOfCount; i <= endOfCount; i += 1) {
    visibleItems.push(i);
  }

  for (let i = 1; i <= endOfPagesCount; i += 1) {
    pageCounter.push(i);
  }

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item',
          { disabled: currentPage === 1 })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={
              currentPage === 1 ? (
                'true'
              ) : (
                'false'
              )
            }
            onClick={() => {
              if (currentPage !== 1) {
                onPageChange((currentPage - 1));
              }
            }}
          >
            «
          </a>
        </li>
        {pageCounter.map((number) => (
          <li
            className={cn('page-item',
              { active: currentPage === number })}
            key={number}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href="#1"
              onClick={() => onPageChange(number)}
            >
              {number}
            </a>
          </li>
        ))}
        <li className={cn('page-item',
          { disabled: currentPage === endOfPagesCount })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={
              currentPage === endOfPagesCount ? (
                'true'
              ) : (
                'false'
              )
            }
            onClick={() => {
              if (currentPage !== endOfPagesCount) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {visibleItems.map((item) => (
          <li data-cy="item" key={item}>
            {`Item ${item}`}
          </li>
        ))}
      </ul>
    </>
  );
};
