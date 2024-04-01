import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  items: string[];
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  items,
}) => {
  const countTabs = Math.ceil(total / perPage);

  const disablePrev = currentPage === 1;
  const disableNext = currentPage === countTabs;

  return (
    <>
      <ul className="pagination">
        <li
          className={cn('page-item', {
            disabled: disablePrev,
          })}
        >
          <a
            data-cy="prevLink"
            className={cn('page-link')}
            href="#prev"
            aria-disabled={disablePrev}
            onClick={() => !disablePrev && onPageChange(currentPage - 1)}
          >
            «
          </a>
        </li>

        {items.slice(0, countTabs).map((tab, index) => {
          const correctIndex = index + 1;

          return (
            <li
              key={tab}
              className={cn('page-item', {
                active: correctIndex === currentPage,
              })}
            >
              <a
                onClick={() => onPageChange(correctIndex)}
                data-cy="pageLink"
                className="page-link"
                href={`#${correctIndex}`}
              >
                {correctIndex}
              </a>
            </li>
          );
        })}

        <li
          className={cn('page-item', {
            disabled: disableNext,
          })}
        >
          <a
            data-cy="nextLink"
            className={cn('page-link')}
            href="#next"
            aria-disabled={disableNext}
            onClick={() => !disableNext && onPageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
