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
  const numberOfPage = Math.ceil(total / perPage);

  const pagesList = Array.from(
    { length: numberOfPage },
    (_, index) => index + 1,
  );

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: currentPage === 1,
        })}
      >
        <a
          data-cy="prevLink"
          className={classNames('page-link', {
            disabled: currentPage === 1,
          })}
          onClick={e => {
            if (currentPage !== 1) {
              onPageChange(currentPage - 1);
            }

            e.preventDefault();
          }}
          aria-disabled={currentPage === 1}
        >
          «
        </a>
      </li>
      {pagesList.map(i => (
        <li
          key={i}
          className={classNames('page-item', { active: i === currentPage })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${i}`}
            onClick={e => {
              if (currentPage !== i) {
                onPageChange(i);
              }

              e.preventDefault();
            }}
          >
            {i}
          </a>
        </li>
      ))}
      <li
        className={classNames('page-item', {
          disabled: currentPage === numberOfPage,
        })}
      >
        <a
          data-cy="nextLink"
          className={classNames('page-link', {
            disabled: currentPage === numberOfPage,
          })}
          onClick={e => {
            if (currentPage !== numberOfPage) {
              onPageChange(currentPage + 1);
            }

            e.preventDefault();
          }}
          aria-disabled={currentPage === numberOfPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
