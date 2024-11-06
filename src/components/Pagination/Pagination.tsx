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
  const totalPage = Math.ceil(total / perPage);
  const totalPageArray = [];

  for (let i = 1; i < totalPage + 1; i++) {
    totalPageArray.push(i);
  }

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames('page-item', {
            'page-item disabled': currentPage === 1,
          })}
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
        {totalPageArray.map(page => (
          <li
            key={page}
            className={classNames('page-item', {
              'page-item active': currentPage === page,
            })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href="#2"
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={classNames('page-item', {
            'page-item disabled': currentPage === totalPage,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPage}
            onClick={() => {
              if (currentPage < totalPage) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
