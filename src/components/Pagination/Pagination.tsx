import classNames from 'classnames';
import { useEffect, useState } from 'react';

type Props = {
  total:number;
  perPage:number;
  currentPage:number;
  stepForward: () => void;
  stepBack: () => void;
  click: (num: number) => void;
};

const paginationItemsLi = (
  number: number,
  activeLi: number,
  handler: Props['click'],
) => {
  const paginationLI = [];

  for (let i = 1; i <= number; i += 1) {
    const active = (i === activeLi) ? 'active' : '';

    paginationLI.push((
      <li
        className={`page-item ${active}`}
        key={`page-item-${i}`}
      >
        <a
          data-cy="pageLink"
          className="page-link"
          href={`#${i}`}
          onClick={() => handler(i)}
        >
          {`${i}`}
        </a>
      </li>
    ));
  }

  return paginationLI;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  stepForward,
  stepBack,
  click,
}) => {
  const [paginationCount, setPaginationCount] = useState(0);
  const [disableStepBack, setDisableStepBack] = useState(false);
  const [disableStepForward, setDisableStepForward] = useState(false);

  useEffect(() => {
    setPaginationCount(Math.ceil(total / perPage));
    setDisableStepForward(currentPage === paginationCount);
    setDisableStepBack(currentPage === 1);
  }, [perPage, currentPage]);

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', { disabled: disableStepBack })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled="true"
          onClick={() => stepBack()}
        >
          «
        </a>
      </li>

      {paginationItemsLi(paginationCount, currentPage, click)}

      <li
        className={classNames('page-item', { disabled: disableStepForward })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
          onClick={() => stepForward()}
        >
          »
        </a>
      </li>
    </ul>
  );
};
