import classNames from 'classnames';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (selectPage: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = new Array(Math.ceil(total / perPage)).fill(0)
    .map((item, index) => item + index + 1);
  const slide = (direction: string) => {
    switch (direction) {
      case '#prev': onPageChange(currentPage - 1);
        break;

      case '#next': onPageChange(currentPage + 1);
        break;

      default:
        break;
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item', (currentPage === 1) ? 'disabled' : '',
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={(event) => {
            slide(event.currentTarget.hash);
          }}
        >
          «
        </a>
      </li>

      {pages.map((item) => (
        <li
          key={item * 5}
          className={classNames(
            'page-item', (item === currentPage) ? 'active' : '',
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            onClick={(event) => {
              onPageChange(+(event.currentTarget.hash.slice(1)));
            }}
            href={`#${item}`}
          >
            {item}
          </a>
        </li>
      ))}

      <li
        className={classNames(
          'page-item', (currentPage === pages.length) ? 'disabled' : '',
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pages.length}
          onClick={(event) => {
            slide(event.currentTarget.hash);
          }}
        >
          »
        </a>
      </li>
    </ul>

  );
};
