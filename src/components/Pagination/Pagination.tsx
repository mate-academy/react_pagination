import classNames from 'classnames';
import { getNumbers } from '../../utils';
import { TilePages } from '../TilePages/TilePages';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, totalPages);
  const firstPage = currentPage === 1;
  const lastPage = currentPage === totalPages;

  return (
    <ul className="pagination">
      <li className={classNames('page-item', {
        disabled: firstPage,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${currentPage - 1}`}
          onClick={() => !firstPage && onPageChange(currentPage - 1)}
          aria-disabled={firstPage}
        >
          «
        </a>
      </li>

      <TilePages
        pages={pages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      <li className={classNames('page-item', {
        disabled: lastPage,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${currentPage + 1}`}
          onClick={() => !lastPage && onPageChange(currentPage + 1)}
          aria-disabled={lastPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
