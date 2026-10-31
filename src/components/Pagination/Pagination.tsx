import cn from 'classnames';

type PaginationProps = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination = (props: PaginationProps) => {
  const totalPages = Math.ceil(props.total / props.perPage);
  const pages: number[] = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: props.currentPage === 1,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={props.currentPage === 1}
          onClick={() => {
            if (props.currentPage > 1) {
              props.onPageChange(props.currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {pages.map(pageInd => (
        <li
          key={pageInd}
          className={cn('page-item', {
            active: props.currentPage === pageInd,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageInd}`}
            onClick={() => {
              if (pageInd !== props.currentPage) {
                props.onPageChange(pageInd);
              }
            }}
          >
            {pageInd}
          </a>
        </li>
      ))}

      <li
        className={cn('page-item', {
          disabled: props.currentPage === totalPages,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={props.currentPage === totalPages}
          onClick={() => {
            if (props.currentPage < totalPages) {
              props.onPageChange(props.currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
