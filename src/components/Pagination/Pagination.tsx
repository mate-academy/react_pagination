import { getNumbers } from '../../utils';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const linksCount = Math.ceil(total / perPage);

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => (
            currentPage !== 1 && onPageChange(currentPage - 1)
          )}
        >
          «
        </a>
      </li>
      {getNumbers(1, linksCount).map(linkNumber => (
        <li className={`page-item ${currentPage === linkNumber && 'active'}`}>
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${linkNumber}`}
            key={linkNumber}
            onClick={() => onPageChange(linkNumber)}
          >
            {linkNumber}
          </a>
        </li>
      ))}
      <li className={`page-item ${currentPage === linksCount && 'disabled'}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === linksCount}
          onClick={() => (
            currentPage !== linksCount && onPageChange(currentPage + 1)
          )}
        >
          »
        </a>
      </li>
    </ul>
  );
};
