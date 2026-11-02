import { getNumbers } from '../../utils';

type TPagination = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = (props: TPagination) => {
  const pagesCount = Math.ceil(props.total / props.perPage);
  const next = () => {
    if (props.currentPage > 1) {
      props.onPageChange(props.currentPage - 1);
    }
  };

  const prev = () => {
    if (props.currentPage < pagesCount) {
      props.onPageChange(props.currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${props.currentPage > 1 ? '' : 'disabled'}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={props.currentPage > 1 ? 'false' : 'true'}
          onClick={next}
        >
          «
        </a>
      </li>

      {getNumbers(1, pagesCount).map((n, i) => (
        <li
          className={`page-item ${props.currentPage === n ? 'active' : ''}`}
          key={i}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${n}`}
            onClick={() => {
              props.onPageChange(n);
            }}
          >
            {n}
          </a>
        </li>
      ))}

      <li
        className={`page-item ${props.currentPage === pagesCount ? 'disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={props.currentPage < pagesCount ? 'false' : 'true'}
          onClick={prev}
        >
          »
        </a>
      </li>
    </ul>
  );
};
