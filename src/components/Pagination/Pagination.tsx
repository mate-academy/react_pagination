import React from 'react';

type Props = {
  total: number;
  perPage: string;
  currentPage: string;
  onPageChange: React.Dispatch<React.SetStateAction<string>>;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const amountOfButton = Math.ceil(total / Number(perPage));
  const buttons = [];

  const handlePageClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    onPageChange(event.currentTarget.textContent || '1');
  };

  for (let i = 1; i <= amountOfButton; i += 1) {
    buttons.push(
      <li
        key={i}
        className={`page-item ${currentPage === i.toString() ? 'active' : null}`}
      >
        <a
          onClick={handlePageClick}
          data-cy="pageLink"
          className="page-link"
          href={`#${i}`}
        >
          {i}
        </a>
      </li>,
    );
  }

  return (
    <ul className="pagination">
      <li className="page-item disabled">
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled="true"
        >
          «
        </a>
      </li>
      {buttons}
      <li className="page-item">
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
        >
          »
        </a>
      </li>
    </ul>
  );
};
