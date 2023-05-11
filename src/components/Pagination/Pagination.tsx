import cn from 'classnames';

type Props = {
  total: number
  perPage: number
  currentPage: number
  onPageChange:(number: number) => void
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesLength = total / +perPage;

  const createPageList = () => {
    const result = [];

    for (let i = 0; i < pagesLength; i += 1) {
      result.push(
        <li
          key={`#${i + 1}`}
          className={cn('page-item', { active: currentPage === i + 1 })}
        >
          <a
            data-cy="pageLink"
            onClick={() => onPageChange(i + 1)}
            className="page-link"
            href={`#${i + 1}`}
          >
            {i + 1}
          </a>
        </li>,
      );
    }

    return result;
  };

  const minLeftPosition = currentPage === 1;
  const maxRightPosition = currentPage >= pagesLength;
  const pagesList = createPageList();

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', { disabled: minLeftPosition })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>
      {pagesList}
      <li
        className={cn('page-item', { disabled: maxRightPosition })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={maxRightPosition}
          onClick={() => onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
