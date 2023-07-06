import cn from 'classnames';

interface Props{
  currentPage: number,
  totalPages: number[],
  onPageChange: (item: number) => void,
  onChahgeByArrow: (back: string, currentPage: number) => void,
}

export const Pagination = ({
  currentPage, totalPages, onPageChange, onChahgeByArrow,
}: Props) => {
  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage !== 1 ? 'false' : 'true'}
          onClick={() => (
            currentPage !== 1 && onChahgeByArrow('back', currentPage)
          )}
        >
          «
        </a>
      </li>
      {totalPages.map((item: number) => (
        <li
          className={cn('page-item', { active: currentPage === item })}
          key={item}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${item}`}
            onClick={() => onPageChange(item)}
          >
            {item}
          </a>
        </li>
      ))}

      <li
        className={cn('page-item', {
          disabled: currentPage === totalPages.length,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage !== totalPages.length ? 'false' : 'true'}
          onClick={() => (
            currentPage !== totalPages.length
              && onChahgeByArrow('forward', currentPage)
          )}
        >
          »
        </a>
      </li>
    </ul>
  );
};
