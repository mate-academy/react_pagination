import cn from 'classnames';

type Props = {
  total: number;
  perPage: string;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: Props) => {
  const amountOfPages = Math.ceil(total / +perPage);
  const pageList = [];
  const itemList = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= amountOfPages; i++) {
    pageList.push(
      <li
        key={i}
        className={cn({
          'page-item': true,
          active: currentPage === i,
        })}
      >
        <a
          data-cy="pageLink"
          className="page-link"
          href={`#${currentPage}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </a>
      </li>,
    );
  }

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < total; i++) {
    itemList.push(
      <li key={i + 1} data-cy="item">
        Item {i + 1}
      </li>,
    );
  }

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: currentPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={() => {
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {pageList}
        <li
          className={cn('page-item', {
            disabled: currentPage === amountOfPages,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === amountOfPages ? 'true' : 'false'}
            onClick={() => {
              if (currentPage < amountOfPages) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemList.slice(
          +perPage * +currentPage - +perPage,
          +perPage * +currentPage,
        )}
      </ul>
    </>
  );
};
