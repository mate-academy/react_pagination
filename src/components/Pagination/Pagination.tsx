import cn from 'classnames';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (value: React.SetStateAction<number>) => void,
}

export const Pagination: React.FC<Props> = (
  {
    total,
    perPage,
    currentPage,
    onPageChange,
  },

) => {
  const numberOfPages = Array(Math.ceil(total / perPage))
    .fill(0)
    .map((_, i) => i + 1);

  const numberOfItems = Array(perPage)
    .fill(0)
    .map((_, i) => i + ((currentPage - 1) * perPage) + 1);

  const numberOfItemsOnLastPage = Array(
    total - (Math.ceil(total / perPage) - 1) * perPage,
  )
    .fill(0)
    .map((_, i) => i + ((currentPage - 1) * perPage) + 1);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === numberOfPages.length;

  return (
    <>
      <ul className="pagination">
        <li
          className={cn('page-item',

            { disabled: isFirstPage })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirstPage}
            onClick={() => onPageChange(
              (prevState) => prevState - 1,
            )}
          >
            «
          </a>
        </li>
        {numberOfPages.map(number => (
          <li className={cn('page-item', { active: currentPage === number })}>
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${number}`}
              onClick={() => onPageChange(number)}
            >
              {number}
            </a>
          </li>
        ))}
        <li
          className={cn('page-item',
            { disabled: isLastPage })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLastPage}
            onClick={() => onPageChange(
              (prevState) => prevState + 1,
            )}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {(currentPage !== Math.ceil(total / perPage))
          ? numberOfItems.map(item => (
            <li data-cy="item" key={item}>{`Item ${item}`}</li>
          ))

          : numberOfItemsOnLastPage.map(item => (
            <li data-cy="item" key={item}>{`Item ${item}`}</li>
          ))}
      </ul>
    </>
  );
};
