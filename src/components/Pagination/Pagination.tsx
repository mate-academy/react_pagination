import React from 'react';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const renderingPages = Math.ceil(total / perPage);

  const generatePagesLinksMarkup = () => {
    const pageLinks = [];

    for (let i = 1; i <= renderingPages; i++) {
      pageLinks.push(
        <li className={cn('page-item', { active: currentPage === i })} key={i}>
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${i}`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </a>
        </li>,
      );
    }

    return pageLinks;
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>
      {generatePagesLinksMarkup()}
      <li
        className={cn('page-item', {
          disabled: currentPage === renderingPages,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === renderingPages ? 'true' : 'false'}
          onClick={() =>
            currentPage < renderingPages && onPageChange(currentPage + 1)
          }
        >
          »
        </a>
      </li>
    </ul>
  );
};
