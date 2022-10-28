import cn from 'classnames';

type Props = {
  currentPage: number;
  itemsPerPage: number;
  onSetPage: (currentPage: number) => void;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  itemsPerPage,
  onSetPage,
}) => {
  const changeCountOfPages = (countOfItems: number) => {
    const pages = [];
    const countOfPages = Math.ceil(42 / countOfItems);

    for (let i = 0; i < countOfPages; i += 1) {
      pages.push(i + 1);
    }

    return pages;
  };

  const lastPage = changeCountOfPages(itemsPerPage).length;

  const checkPage = (page: number) => {
    return currentPage === page;
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', {
        disabled: checkPage(1),
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={checkPage(1)}
          onClick={() => (
            !checkPage(1) && onSetPage(currentPage - 1)
          )}
        >
          «
        </a>
      </li>

      {
        changeCountOfPages(itemsPerPage).map(page => (
          <li
            className={cn('page-item', {
              active: checkPage(page),
            })}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => onSetPage(page)}
            >
              {page}
            </a>
          </li>
        ))
      }
      <li className={cn('page-item', {
        disabled: checkPage(lastPage),
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={checkPage(lastPage)}
          onClick={() => (
            !checkPage(lastPage) && onSetPage(currentPage + 1)
          )}
        >
          »
        </a>
      </li>
    </ul>
  );
};
