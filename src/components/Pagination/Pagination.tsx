import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total, perPage, currentPage = 1, onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const prevArrowDisabled = currentPage >= totalPages;
  const nextArrowDisabled = currentPage <= 1;

  const handleNextPage = () => {
    if (currentPage >= totalPages) {
      return;
    }

    onPageChange(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage <= 1) {
      return;
    }

    onPageChange(currentPage - 1);
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', {
        disabled: prevArrowDisabled,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={prevArrowDisabled}
          onClick={handlePrevPage}
        >
          «
        </a>
      </li>
      {new Array(totalPages).fill(null).map((_, idx) => {
        const id = idx + 1;

        return (
          <li
            key={id}
            className={cn('page-item', { active: id === currentPage })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${id}`}
              onClick={() => onPageChange(id)}
            >
              {id}

            </a>
          </li>
        );
      })}
      <li className={cn('page-item', {
        disabled: nextArrowDisabled,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={nextArrowDisabled}
          onClick={handleNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
