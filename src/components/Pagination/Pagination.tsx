import cn from 'classnames';

type PaginationProps = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination = ({
  total, perPage, currentPage, onPageChange,
}: PaginationProps) => {
  const createArray = (numberOfPages: number) => {
    const result = [];

    for (let i = 1; i <= numberOfPages; i += 1) {
      result.push(i);
    }

    return result;
  };

  const lastPage = Math.ceil(total / perPage);

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', {
          disabled: currentPage === 1,
        })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href={`#${currentPage - 1}`}
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={() => {
              if (currentPage !== 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>

        {createArray(lastPage).map(number => {
          return (
            <li
              key={number}
              className={cn('page-item', {
                active: number === currentPage,
              })}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${number}`}
                onClick={() => {
                  if (currentPage !== number) {
                    onPageChange(number);
                  }
                }}
              >
                {number}
              </a>
            </li>
          );
        })}
        <li className={cn('page-item', {
          disabled: currentPage === lastPage,
        })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href={`#${currentPage + 1}`}
            aria-disabled={currentPage === lastPage
              ? 'true' : 'false'}
            onClick={() => {
              if (currentPage !== lastPage) {
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
