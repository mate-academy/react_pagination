import cn from 'classnames';

import { useContext } from 'react';
import { PageContext } from '../../PageContext/PageContext';

interface Props {
  items: string[];
}

export const Pagination: React.FC<Props> = () => {
  const { currentPage, pages, setCurrentPage } = useContext(PageContext);

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled="true"
          onClick={() => setCurrentPage(prevPage => prevPage - 1)}
        >
          «
        </a>
      </li>
      {
        Array.from({ length: pages }, (_, i) => i + 1).map((page: number) => (
          <li
            className={cn('page-item', { active: currentPage === page })}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              type="button"
              onClick={() => {
                setCurrentPage(page);
              }}
            >
              {page}
            </a>
          </li>
        ))
      }
      <li className={cn('page-item', { disabled: currentPage === pages })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
          onClick={() => setCurrentPage(prevPage => prevPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
