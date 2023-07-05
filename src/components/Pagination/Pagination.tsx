import cn from 'classnames';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (number: number) => void,
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(total / perPage);
  const pages = [];

  for (let i = 0; i < numberOfPages; i += 1) {
    pages.push(i + 1);
  }

  const prevButton = (
    <li className={cn('page-item', {
      disabled: currentPage === 1,
    })}
    >
      <a
        data-cy="prevLink"
        className="page-link"
        href="#prev"
        aria-disabled="true"
        onClick={() => onPageChange(currentPage - 1)}
      >
        «
      </a>
    </li>
  );

  const afterButton = (
    <li className={cn('page-item', {
      disabled: currentPage === numberOfPages,
    })}
    >
      <a
        data-cy="nextLink"
        className="page-link"
        href="#next"
        aria-disabled="true"
        onClick={() => onPageChange(currentPage + 1)}
      >
        »
      </a>
    </li>
  );

  return (
    <ul className="pagination">
      {prevButton}
      {pages.map(pageNum => (
        <li
          className={cn('page-item', {
            active: pageNum === currentPage,
          })}
          key={pageNum}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageNum}`}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </a>
        </li>
      ))}
      {afterButton}
    </ul>
  );
};
