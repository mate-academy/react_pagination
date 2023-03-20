import classNames from 'classnames';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination:React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(total / perPage);
  const pages = Array.from(Array(pagesCount).keys());

  return (
    <ul className="pagination">
      <li
        className={
          classNames('page-item', { disabled: currentPage === 1 })
        }
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => {
            if (currentPage === 1) {
              return;
            }

            onPageChange(currentPage - 1);
          }}
        >
          «
        </a>
      </li>
      {pages.map((number) => (
        <li
          key={number}
          className={
            classNames('page-item', { active: number + 1 === currentPage })
          }
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${number + 1}`}
            onClick={() => onPageChange(number + 1)}
          >
            {number + 1}
          </a>
        </li>
      ))}
      <li className={
        classNames('page-item', { disabled: currentPage === pagesCount })
      }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pagesCount}
          onClick={() => {
            if (currentPage === pagesCount) {
              return;
            }

            onPageChange(currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
