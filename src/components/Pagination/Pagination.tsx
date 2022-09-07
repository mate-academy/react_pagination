import classNames from 'classnames';

type Props = {
  totalItems: number
  itemsPerPage: number
  paginate: (page: number) => void
  currentItem: number
};

export const Pagination: React.FC<Props> = (
  {
    totalItems,
    itemsPerPage,
    paginate,
    currentItem,
  },
) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      <li className={classNames('page-item', {
        'page-item disabled': currentItem === 1,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          onClick={() => paginate(currentItem - 1)}
        >
          «
        </a>
      </li>
      {pageNumbers.map(page => (
        <li
          key={page}
          className={classNames(
            'page-item',
            {
              active: page === currentItem,
            },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => paginate(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={classNames('page-item', {
        'page-item disabled': currentItem === pageNumbers.length,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${currentItem}`}
          onClick={() => paginate(currentItem + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
