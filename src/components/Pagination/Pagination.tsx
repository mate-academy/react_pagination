import classNames from 'classnames';

type Props = {
  totalItems: number
  itemsPerPage: number
  paginate: (page: number) => void
  nextPage: () => void
  prevtPage: () => void
  currentItem: number
};

export const Pagination: React.FC<Props> = (
  {
    totalItems,
    itemsPerPage,
    paginate,
    nextPage,
    prevtPage,
    currentItem,
  },
) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  // className={classNames('input', {
  //   'is-danger': hasError,
  // })}

  // <li className="page-item"></li>

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
          onClick={() => prevtPage()}
          // aria-disabled="true"
        >
          «
        </a>
      </li>
      {pageNumbers.map(page => (
        <li>
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
          href="#next"
          onClick={() => nextPage()}
          // aria-disabled="true"
        >
          »
        </a>
      </li>
    </ul>
  );
};
