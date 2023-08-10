type Props = {
  pages: string[];
  pageCur: number;
  setPage: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({ pages, pageCur, setPage }) => {
  return (
    <ul className="pagination">
      <li className={`page-item ${pageCur !== 1 ? '' : 'disabled'}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={pageCur === 1 ? 'true' : 'false'}
          onClick={() => {
            if (pageCur !== 1) {
              setPage(pageCur - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {
        pages.map(page => {
          return (
            <li className={`page-item ${+page === pageCur ? 'active' : ''}`}>
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${page}`}
                onClick={() => {
                  if (+page !== pageCur) {
                    setPage(+page);
                  }
                }}
              >
                {page}
              </a>
            </li>
          );
        })
      }
      <li className={`page-item ${pageCur !== pages.length ? '' : 'disabled'}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={pageCur === pages.length ? 'true' : 'false'}
          onClick={() => {
            if (pageCur !== pages.length) {
              setPage(pageCur + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
