import cn from 'classnames';

interface Props {
  currentPage: number;
  onPageChange: (value: number) => void;
  pages: number[];
}

export const Pagination: React.FC<Props> = ({
  currentPage,
  onPageChange,
  pages,
}) => {
  const canMoveBack = currentPage > 1;
  const canMoveForward = currentPage < pages.length;

  function moveBack() {
    if (canMoveBack) {
      onPageChange(currentPage - 1);
    }
  }

  function moveForward() {
    if (canMoveForward) {
      onPageChange(currentPage + 1);
    }
  }

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: !canMoveBack })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={!canMoveBack}
          onClick={moveBack}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={cn('page-item', { active: currentPage === page })}
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

      <li className={cn('page-item', { disabled: !canMoveForward })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={!canMoveForward}
          onClick={moveForward}
        >
          »
        </a>
      </li>
    </ul>
  );
};
