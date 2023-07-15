import classNames from 'classnames';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (num: number) => void,
}

export const Pagination = (props: Props) => {
  const {
    total,
    perPage,
    currentPage,
    onPageChange,
  } = props;

  const numberOfPages = Math.ceil(total / perPage);
  const pageItems = [];

  for (let i = 1; i <= numberOfPages; i += 1) {
    const pageObj = {
      id: `page-${i}`,
      value: i,
    };

    pageItems.push(pageObj);
  }

  const nextPage = () => {
    if (currentPage !== numberOfPages) {
      onPageChange(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
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
          aria-disabled={currentPage !== 1 ? 'false' : 'true'}
          onClick={prevPage}
        >
          «
        </a>
      </li>

      {
        pageItems.map(item => (
          <li
            className={classNames('page-item', {
              active: item.value === currentPage,
            })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${item.value}`}
              onClick={() => onPageChange(item.value)}
            >
              {item.value}
            </a>
          </li>
        ))
      }
      <li
        className={classNames('page-item', {
          'disabled': currentPage === numberOfPages,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage !== numberOfPages ? 'false' : 'true'}
          onClick={nextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
