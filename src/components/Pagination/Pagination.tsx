import React from "react";
import { getNumbers } from "../../utils";

interface Props {
  buttonsLength: number,
  activePage: number,
  callback: (page:number) => void,
}

export const Pagination : React.FC<Props> = ({buttonsLength, activePage, callback}) => {
  const buttonsItems = getNumbers(1, buttonsLength);


  return (
    <ul className="pagination">
      <li className={`page-item ${activePage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          onClick={() => callback(activePage === 1 ? 1 : activePage - 1)}
          aria-disabled={activePage === 1}>
          «
        </a>
      </li>
      {buttonsItems.map(n => (
        <li  key={n} className={`page-item ${activePage === n ? 'active' : ''}`}>
          <a
            data-cy="pageLink"
            className="page-link"
            href={'#' + n}
            onClick={() => callback(n)}
          >
            {n}
          </a>
        </li>
      ))}
      <li className={`page-item ${activePage === buttonsLength ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          onClick={() => callback(activePage === buttonsLength ? buttonsLength : activePage + 1)}
          aria-disabled={activePage === buttonsLength}>
          »
        </a>
      </li>
    </ul>
  )
};
