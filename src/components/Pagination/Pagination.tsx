import cn from 'classnames';

type PaginationProps = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (button: number) => void;
};

function getArrayButtons(total: number, perPage: number) {
  const result = [];
  const maxPage = Math.ceil(total / perPage);

  for (let i = 1; i <= maxPage; i++) {
    result.push(i);
  }

  return result;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const buttons = getArrayButtons(total, perPage);

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => {
            if (currentPage !== 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {buttons.map(button => (
        <li
          key={button}
          className={cn('page-item', { active: button === currentPage })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${button}`}
            onClick={() => onPageChange(button)}
          >
            {button}
          </a>
        </li>
      ))}
      <li
        className={cn('page-item', {
          disabled: currentPage === buttons.length,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={currentPage === buttons.length ? 'true' : 'false'}
          onClick={() => {
            if (currentPage !== buttons.length) {
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
