import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import './Pagination.scss';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  withInfo: boolean;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  setCurrentPage,
  withInfo,
}) => {
  const [active, setActive] = useState<number>(currentPage);
  const [prevActive, setPrevActive] = useState<boolean>(true);
  const [nextActive, setNextActive] = useState<boolean>(true);

  const pages: number[] = useMemo(() => {
    const result = [];
    const pagesAmount = Math.ceil(total / perPage);

    for (let i = 1; i <= pagesAmount; i += 1) {
      result.push(i);
    }

    return result;
  }, [total, perPage]);

  const shift = (vector: string) => {
    if (vector === 'left') {
      setCurrentPage(currentPage - 1);
      setActive(currentPage - 1);
    } else {
      setCurrentPage(currentPage + 1);
      setActive(currentPage + 1);
    }
  };

  useEffect(() => {
    if (currentPage === 1) {
      setPrevActive(false);
    } else {
      setPrevActive(true);
    }

    if (currentPage === pages.length) {
      setNextActive(false);
    } else {
      setNextActive(true);
    }
  });

  const withInfoData = () => {
    return `${perPage * (currentPage - 1) + 1} - ${currentPage * perPage > total
      ? total
      : currentPage * perPage
    } of ${total}`;
  };

  return (
    <div>
      <ul>
        <li>
          {`Total elements: ${total}`}
        </li>
        <li>
          {`Elements per page: ${perPage}`}
        </li>
        <li>
          {`Current page: ${currentPage}`}
        </li>
      </ul>

      {withInfo ? withInfoData() : ''}

      <div className="buttons">
        <button
          type="button"
          onClick={() => shift('left')}
          disabled={!prevActive}
        >
          &laquo;
        </button>
        {pages.map(page => (
          <button
            type="button"
            key={page}
            className={classNames(
              'button',
              { active: active === page },
            )}
            onClick={() => {
              setCurrentPage(page);
              setActive(page);
            }}
          >
            {page}
          </button>
        ))}
        <button
          type="button"
          onClick={() => shift('right')}
          disabled={!nextActive}
        >
          &raquo;
        </button>
      </div>
    </div>
  );
};
