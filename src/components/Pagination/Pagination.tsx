import cn from 'classnames';

type Props = {
  items: string[];
  itemsPerPage: number;
  itemsQuantity: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  multiplier: number;
  setMultiplier: React.Dispatch<React.SetStateAction<number>>;
};

export const Pagination: React.FC<Props> = ({
  items,
  itemsPerPage,
  itemsQuantity,
  page,
  setPage,
  multiplier,
  setMultiplier,
}) => {
  const pagesNumber = Math.ceil(itemsQuantity / itemsPerPage);

  return (
    <div className="Pagination">
      <ul className="pagination">
        <li className={cn('page-item', { disabled: page === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={page === 1 ? true : false}
            onClick={() => {
              setPage(prev => (prev === 1 ? prev : prev - 1));
              setMultiplier(prev => prev - itemsPerPage);
            }}
          >
            «
          </a>
        </li>

        {items.slice(0, pagesNumber).map((el, i) => (
          <li key={el} className={cn('page-item', { active: page === i + 1 })}>
            <a
              data-cy="pageLink"
              className="page-link"
              href="#1"
              onClick={() => {
                setPage(i + 1);
                setMultiplier(i * itemsPerPage);
              }}
            >
              {i + 1}
            </a>
          </li>
        ))}
        <li className={cn('page-item', { disabled: page === pagesNumber })}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={page === pagesNumber ? 'true' : false}
            onClick={() => {
              setPage(prev => (prev === pagesNumber ? prev : prev + 1));
              setMultiplier(prev => prev + itemsPerPage);
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.slice(0 + multiplier, itemsPerPage + multiplier).map((el, i) => (
          <li key={i} data-cy="item">
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};
