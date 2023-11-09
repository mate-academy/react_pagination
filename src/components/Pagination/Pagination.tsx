import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  items: number[];
  onPageChange: (currentPage: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  items,
  onPageChange,

}) => {
  const pageChanger = (page: number) => {
    onPageChange(page);
  };

  const array = Array.from({ length: Math.ceil(total / perPage) },
    (_, index) => index + 1);

  const lastItemOnPage = currentPage * perPage;
  const firstItemOnPage = lastItemOnPage - perPage;

  return (
    <>
      <ul className="pagination">

        <li className={cn('page-item',
          { disabled: currentPage * perPage <= perPage })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
            onClick={() => pageChanger(currentPage - 1)}
          >
            «
          </a>
        </li>
        {array.map((page) => (
          <li className={cn('page-item', { active: page === currentPage })}>
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li className={cn('page-item',
          { disabled: currentPage * perPage >= total })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
            onClick={() => pageChanger(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.slice(firstItemOnPage, lastItemOnPage).map((item) => (
          <li
            key={item}
            data-cy="item"
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
