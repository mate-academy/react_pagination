import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (p: number) => {};
};

export const Pagination = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}: Props) => {
  const pages = Math.ceil(total / perPage);
  const pageArray = [];

  for (let i = 1; i <= pages; i++) {
    pageArray.push(i);
  }

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', { disabled: currentPage === 1 })}
        onClick={() => {
          if (currentPage > 1) {
            onPageChange(currentPage - 1);
          }
        }}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
        >
          «
        </a>
      </li>

      {pageArray.map(p => (
        <li
          className={classNames('page-item', { active: currentPage === p })}
          key={p}
          onClick={() => {
            onPageChange(p);
          }}
        >
          <a data-cy="pageLink" className="page-link" href={'#' + p}>
            {p}
          </a>
        </li>
      ))}

      <li
        className={classNames('page-item', { disabled: currentPage === pages })}
        onClick={() => {
          if (currentPage < pages) {
            onPageChange(currentPage + 1);
          }
        }}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pages ? 'true' : 'false'}
        >
          »
        </a>
      </li>
    </ul>
  );
};
