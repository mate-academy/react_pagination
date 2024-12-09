import cn from 'classnames';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = Array.from(
    { length: Math.ceil(total / perPage) },
    (_, i) => i + 1,
  );

  return (
    <>
      <ul className="pagination">
        <li
          className={cn('page-item', {
            disabled: currentPage <= 1,
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={e => {
              e.preventDefault();
              onPageChange(currentPage - 1);
            }}
          >
            «
          </a>
        </li>
        {pages.map(element => (
          <li
            key={element}
            className={cn('page-item', {
              active: currentPage === element,
            })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${element}`}
              onClick={e => {
                e.preventDefault();
                onPageChange(element);
              }}
            >
              {element}
            </a>
          </li>
        ))}
        <li
          className={cn('page-item', {
            disabled: currentPage >= pages[pages.length - 1],
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={
              currentPage === pages[pages.length - 1] ? 'true' : 'false'
            }
            onClick={e => {
              e.preventDefault();
              onPageChange(currentPage + 1);
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {Array.from({ length: total }, (_, i) => i + 1)
          .slice(
            currentPage * perPage - perPage,
            (currentPage + 1) * perPage - perPage,
          )
          .map((item, index) => (
            <li key={index} data-cy="item">
              Item {item}
            </li>
          ))}
      </ul>
    </>
  );
};
