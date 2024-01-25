import { useContext } from 'react';
import { PageContext } from '../../PageContext/PageContext';

export const Pagination: React.FC = () => {
  const { total, currentPage, perPage } = useContext(PageContext);

  const pages: number[] = Array.from(Array(Math.ceil(total / perPage)).keys());

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
      {
        pages.map((page: number) => (
          <li className="page-item active">
            <a data-cy="pageLink" className="page-link" href="#1">{page}</a>
          </li>
        ))
      }
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
