import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total, perPage, onPageChange, currentPage,
}) => {
  const pageAmount = Math.ceil(total / perPage);
  const pageNumbers = [];

  for (let i = 1; i <= pageAmount; i += 1) {
    pageNumbers.push(i);
  }

  return (
    <>
      <ul className="pagination">
        <li
          className={cn('page-item', { disabled: currentPage === 1 })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
            onClick={() => {
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>

        {pageNumbers.map(page => (
          <li
            key={page}
            className={cn('page-item', { active: page === currentPage })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={cn('page-item', { disabled: currentPage === pageAmount })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="true"
            onClick={() => {
              if (currentPage <= total) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
