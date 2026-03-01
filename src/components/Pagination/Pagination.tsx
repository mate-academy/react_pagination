import { Link, useSearchParams } from 'react-router-dom';
import { getPages } from '../../utils';

type Props = {
  total: number;
  perPage: number;
};

export const Pagination: React.FC<Props> = ({ total, perPage }) => {
  const [searchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const pages = getPages(total, perPage);
  const lastPage = pages[pages.length - 1];

  const makeLink = (page: number) => `?page=${page}&perPage=${perPage}`;

  return (
    <ul className="pagination">
      <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
        <Link
          data-cy="prevLink"
          className="page-link"
          to={makeLink(currentPage - 1)}
          aria-disabled={currentPage === 1}
        >
          «
        </Link>
      </li>

      {pages.map(number => (
        <li
          key={number}
          className={currentPage === number ? 'page-item active' : 'page-item'}
        >
          <Link data-cy="pageLink" className="page-link" to={makeLink(number)}>
            {number}
          </Link>
        </li>
      ))}

      <li
        className={
          currentPage === lastPage ? 'page-item disabled' : 'page-item'
        }
      >
        <Link
          data-cy="nextLink"
          className="page-link"
          to={makeLink(currentPage + 1)}
          aria-disabled={currentPage === lastPage}
        >
          »
        </Link>
      </li>
    </ul>
  );
};
