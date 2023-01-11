import React from 'react';
import cn from 'classnames';

type Props = {
  length: number;
  currentPage: number;
  onPageChange: (item: number) => void;
};

export const NavigationList: React.FC<Props> = ({
  length,
  currentPage,
  onPageChange,
}) => {
  return (
    <>
      {
        Array.from(
          { length },
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
          ))
      }
    </>
  );
};
