import { FC } from 'react';
import cn from 'classnames';

interface Props {
  total: number;
  perPage: number
  currentPage: number
  onPageChange: (pageId: number) => void;
}

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const natigationItems
    = Array.from(
      { length: Math.ceil(total / perPage) },
      (_, i) => i + 1,
    )
      .map(item => (
        <li
          key={item}
          className={cn(
            'page-item',
            { active: item === currentPage },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${item}`}
            onClick={() => onPageChange(item)}
          >
            {item}
          </a>
        </li>
      ));

  const navListLength = natigationItems.length;

  return (
    <>
      <ul className="pagination">
        <li className={cn(
          'page-item',
          { disabled: currentPage <= 1 },
        )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage <= 1}
            onClick={() => {
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {natigationItems}
        <li className={cn(
          'page-item',
          { disabled: currentPage >= navListLength },
        )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage >= navListLength}
            onClick={() => {
              if (currentPage < navListLength) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {Array(perPage)
          .fill(0)
          .map((_, i) => i)
          .sort((a, b) => b - a)
          .map(item => {
            const maxValue = perPage * currentPage;

            if (maxValue - item > total) {
              return null;
            }

            return (
              <li
                key={item}
                data-cy="item"
              >
                {`Item ${maxValue - item}`}
              </li>
            );
          })}
      </ul>
    </>
  );
};
