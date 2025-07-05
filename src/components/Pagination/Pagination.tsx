import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (pages: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
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
              onPageChange(currentPage - 1);
            }}
          >
            «
          </a>
        </li>

        {Array.from({ length: Math.ceil(total / perPage) }, (_, i) => (
          <li
            key={i + 1}
            className={`page-item${currentPage === i + 1 ? ' active' : ''}`}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${i + 1}`}
              onClick={() => {
                onPageChange(i + 1);
              }}
            >
              {i + 1}
            </a>
          </li>
        ))}
        <li
          className={classNames('page-item', {
            disabled: currentPage === Math.ceil(total / perPage),
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === Math.ceil(total / perPage)}
            onClick={() => {
              onPageChange(currentPage + 1);
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {Array.from({ length: perPage }, (_, i) => {
          const index = (currentPage - 1) * perPage + i;

          if (index >= total) {
            return;
          }

          return (
            <li data-cy="item" key={index}>
              Item {index + 1}
            </li>
          );
        })}
      </ul>
    </>
  );
};
