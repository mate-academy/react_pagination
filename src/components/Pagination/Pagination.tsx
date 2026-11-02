import { getNumbers } from '../../utils';

type TPagination = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination = (props: TPagination) => {
  const { currentPage = 1 } = props;
  const pagesCount = Math.ceil(props.total / props.perPage);
  const next = () => {
    if (currentPage > 1) {
      props.onPageChange(currentPage - 1);
    }
  };

  const prev = () => {
    if (currentPage < pagesCount) {
      props.onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage > 1 ? '' : 'disabled'}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage > 1 ? 'false' : 'true'}
          onClick={next}
        >
          «
        </a>
      </li>

      {getNumbers(1, pagesCount).map((n, i) => (
        <li
          className={`page-item ${currentPage === n ? 'active' : ''}`}
          key={i}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${n}`}
            onClick={() => {
              if (n !== currentPage) {
                props.onPageChange(n);
              }
            }}
          >
            {n}
          </a>
        </li>
      ))}

      <li
        className={`page-item ${currentPage === pagesCount ? 'disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage < pagesCount ? 'false' : 'true'}
          onClick={prev}
        >
          »
        </a>
      </li>
    </ul>
  );
};
