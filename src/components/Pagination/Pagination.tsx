import { getNumbers } from '../../utils';

export const Pagination = ({ total, perPage, currentPage, onPageChange }) => {
  const buttonsAmount = total / perPage;
  const buttons = getNumbers(1, buttonsAmount);

  return (
    <ul className="pagination">
      <li className="page-item disabled">
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled="true"
        >
          «
        </a>
      </li>

      {buttons.map(n => (
        <li key={n} className="page-item active">
          <a data-cy="pageLink" className="page-link" href={`#${n}`}>
            {n}
          </a>
        </li>
      ))}

      <li className="page-item">
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
        >
          »
        </a>
      </li>
    </ul>
  );
};
