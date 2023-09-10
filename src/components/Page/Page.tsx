import React from 'react';
import cn from 'classnames';

type Props = {
  page: number,
  selectedPage: number,
  onSelectPage: (value: number) => void,
};

export const Page: React.FC<Props> = ({
  page,
  onSelectPage,
  selectedPage,
}) => {
  return (
    <li className={cn(
      'page-item',
      { active: selectedPage === page },
    )}
    >
      <a
        data-cy="pageLink"
        className="page-link"
        href={`#${page}`}
        onClick={() => onSelectPage(page)}
      >
        {page}
      </a>
    </li>
  );
};
