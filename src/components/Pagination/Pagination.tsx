import React from 'react';

type Props = {
  page: number;
};

export const Pagination: React.FC<Props> = ({ page }) => {
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
      <li className="page-item active">
        <a
          data-cy="pageLink"
          className="page-link"
          href={`#${page}`}
        >
          1
        </a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href={`#${page}`}>2</a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href={`#${page}`}>3</a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href={`#${page}`}>4</a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href={`#${page}`}>5</a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href={`#${page}`}>6</a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href={`#${page}`}>7</a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href={`#${page}`}>8</a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href={`#${page}`}>9</a>
      </li>
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
  )
};
