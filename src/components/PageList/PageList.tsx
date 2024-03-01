import React from 'react';

interface ListProps {
  page: number;
  active: number;
  onClick: (page: number) => void;
}

export const PageList: React.FC<ListProps> = ({ page, active, onClick }) => {
  const handleClick = () => {
    onClick(page);
  };

  return (
    <li className={page === active ? 'page-item active' : 'page-item'}>
      <a
        data-cy="pageLink"
        className="page-link"
        href={`#${page}`}
        onClick={handleClick}
      >
        {page}
      </a>
    </li>
  );
};
