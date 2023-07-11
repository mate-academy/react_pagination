import cn from 'classnames';

interface Props {
  items: string[],
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
}

export const Pagination: React.FC<Props> = ({
  items,
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(total / perPage);

  function handlePageChange(pageNumber: number): void {
    if (pageNumber !== currentPage
      && pageNumber > 0
      && pageNumber <= numberOfPages) {
      onPageChange(pageNumber);
    }
  }

  return (
    <ul className="pagination">
      <li className={cn('page-item',
        { disabled: currentPage === 1 })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          «
        </a>
      </li>

      {items.slice(0, numberOfPages).map((item, index) => (
        <li
          className={cn('page-item', { active: currentPage === (index + 1) })}
          key={item}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href="#1"
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </a>
        </li>
      ))}

      <li className={cn('page-item',
        { disabled: currentPage === numberOfPages })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === numberOfPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
