/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import './Pagination.css';

type Props = {
  total: number;
  perPage: number;
  page: number;
  onPageChange: (number: number | string) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  page,
  onPageChange,
  onPrevPage,
  onNextPage,
}) => {
  const [withInfo, setWithInfo] = useState('');
  const [searchParams] = useSearchParams();

  const pages: number = useMemo(() => {
    return Math.ceil(total / perPage);
  }, [perPage]);

  useEffect(() => {
    const start = (page === 1) ? page : (page - 1) * perPage + 1;
    const end = (page === pages) ? total : page * perPage;

    setWithInfo(`${start} - ${end} of ${total}`);
  }, [page, pages]);

  const getVisiblePageNumbers = () => {
    const pageNumbers: number[] = Array.from(Array(pages)).map((_, i) => i + 1);
    const startIndex: (number | string)[] = pageNumbers.slice(0, page - 1);
    const endIndex: (number | string)[] = pageNumbers.slice(page);
    const dots = '...';
    const result:(number | string)[] = [];

    if (startIndex.length > 2) {
      startIndex.splice(1, startIndex.length - 2, dots);
    }

    if (endIndex.length > 2) {
      endIndex.splice(1, endIndex.length - 2, dots);
    }

    return result.concat(startIndex, page, endIndex);
  };

  const visiblePageNumbers = useMemo(
    getVisiblePageNumbers,
    [page, pages],
  );

  return (
    <>
      <div className="pagination-withInfo">{withInfo}</div>

      <ul className="pagination-list">
        <li className="pagination-item">
          <Link
            to={`/?${searchParams.toString()}`}
            className={classNames('pagination-link', { disabled: page === 1 })}
            onClick={onPrevPage}
          >
            <span>&laquo;</span>
          </Link>
        </li>
        {visiblePageNumbers.map(number => (
          <li className="pagination-item" key={Math.random()}>
            <Link
              to={`/?${searchParams.toString()}`}
              className={classNames(
                'pagination-link',
                {
                  active: page === number,
                  disabled: typeof number !== 'number',
                },
              )}
              onClick={() => onPageChange(number)}
            >
              {number}
            </Link>
          </li>
        ))}
        <li className="pagination-item">
          <Link
            to={`/?${searchParams.toString()}`}
            className={classNames('pagination-link',
              { disabled: page === pages })}
            onClick={onNextPage}
          >
            <span>&raquo;</span>
          </Link>
        </li>
      </ul>
    </>
  );
};
