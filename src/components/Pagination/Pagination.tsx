import classNames from 'classnames';

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
  const countPageItem = Math.ceil(total / perPage);

  const pageItem = new Array(countPageItem).fill(1).map((_, i) => i + 1);

  const handlerPage = (pageNum:number) => {
    onPageChange(pageNum);
  };

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: currentPage === 1,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 && 'true'}
          onClick={() => {
            onPageChange(currentPage > 1
              ? currentPage - 1
              : currentPage);
          }}
        >
          «
        </a>
      </li>
      {pageItem.map((page) => (
        <li
          className={classNames('page-item', {
            active: currentPage === page,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => {
              handlerPage(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={classNames('page-item', {
          disabled: currentPage === countPageItem,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageItem.length && 'true'}
          onClick={() => {
            onPageChange(
              currentPage < countPageItem
                ? currentPage + 1
                : currentPage,
            );
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
