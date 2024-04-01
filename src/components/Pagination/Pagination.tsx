import cn from 'classnames';

interface PaginationProps {
  total: number;
  currPage: number;
  setCurrPage: (page: number) => void;
}

export const Pagination = ({
  total,
  currPage,
  setCurrPage }: PaginationProps) =>
{
  return (
    <ul className="pagination">
    <li className={cn('page-item', {disabled: currPage === 1})}>
      <a
        data-cy="prevLink"
        className="page-link"
        href="#prev"
        aria-disabled="true"
        onClick={() => setCurrPage(currPage - 1)}
      >
        «
      </a>
    </li>
    {Array.from({ length: total }, (_, i) => i + 1)
      .map(page => (
      <li
        className={cn('page-item', { active: page === currPage })}
        key={page}
        onClick={() => setCurrPage(page)}
      >
        <a
          data-cy="pageLink"
          className="page-link"
          href="#1"
        >
          {page}
        </a>
      </li>
    ))}

    <li className={
      cn('page-item',
        { disabled: currPage === total })
    }>
      <a
        data-cy="nextLink"
        className="page-link"
        href="#next"
        aria-disabled="false"
        onClick={() => setCurrPage(currPage + 1)}
      >
        »
      </a>
    </li>
  </ul>
  );
};
