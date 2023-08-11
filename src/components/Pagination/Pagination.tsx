type Props = {
  pages: string[];
  pageCur: number;
  setPage: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({ pages, pageCur, setPage }) => {
  const nextLinkCondition = pageCur === pages.length;
  const prevLinkCondition = pageCur === 1;

  return (
    <ul className="pagination">
      <li className={`page-item ${prevLinkCondition ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={prevLinkCondition ? 'true' : 'false'}
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
          const condition = +page === pageCur;

          return (
            <li
              className={`page-item ${condition ? 'active' : ''}`}
              key={page}
            >
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
      <li className={`page-item ${nextLinkCondition ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={nextLinkCondition ? 'true' : 'false'}
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
