import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pagesArray = [];
  const items = [];
  const startIndex = (currentPage - 1) * perPage;
  const lastIndex = Math.min(startIndex + perPage, total);

  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pagesArray.push(i);
  }

  for (let i = startIndex; i < lastIndex; i++) {
    items.push(i);
  }

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames('page-item', { disabled: currentPage === 1 })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => {
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {pagesArray.map(page => {
          return (
            <li
              className={classNames('page-item', {
                active: currentPage === page,
              })}
              key={page}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${page}`}
                onClick={() => {
                  onPageChange(page);
                }}
              >
                {page}
              </a>
            </li>
          );
        })}
        <li
          className={classNames('page-item', {
            disabled: currentPage === pagesArray.length,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pagesArray.length}
            onClick={() => {
              if (currentPage < pagesArray.length) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.map(item => (
          <li key={item} data-cy="item">
            {`Item ${item + 1}`}
          </li>
        ))}
      </ul>
    </>
  );
};
