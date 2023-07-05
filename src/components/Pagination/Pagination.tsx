import cn from 'classnames';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total = 42,
  perPage = 5,
  currentPage = 1,
  onPageChange = () => {},
}) => {
  const pagesCount = Math.ceil(total / perPage);

  const prevPage = () => {
    if (currentPage === 1) {
      return;
    }

    onPageChange(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage === pagesCount) {
      return;
    }

    onPageChange(currentPage + 1);
  };

  return (
    <ul className="pagination">
      <li className={cn(
        'page-item',
        { disabled: currentPage === 1 },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={
            (currentPage !== 1)
              ? 'false'
              : 'true'
          }
          onClick={prevPage}
        >
          «
        </a>
      </li>
      { Array.from({ length: pagesCount }, (_x, i) => (
        <li
          className={cn(
            'page-item',
            { active: currentPage === i + 1 },
          )}
          key={i}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${i + 1}`}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </a>
        </li>
      )) }

      <li className={cn(
        'page-item',
        { disabled: currentPage === pagesCount },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={
            currentPage === pagesCount
              ? 'true'
              : 'false'
          }
          onClick={nextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
