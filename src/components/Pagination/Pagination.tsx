import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './Pagination.scss';

type Props = {
  total: number,
  perPage: number,
  page: number,
  perPageUrl: string,
  onPageChange: (page:number) => void,
  getNextPage: () => void,
  getPrevPage: () => void,
};

const Pagination: React.FC<Props> = ({
  total,
  perPage,
  page,
  perPageUrl,
  onPageChange,
  getNextPage,
  getPrevPage,
}) => {
  const arrayPagesNumbers: (number | string)[] = [];
  const [currentArrayNumbers, setCurrentArrayNumbers]
    = useState<(number | string)[]>([]);

  const [searchParamPage, setSearchParamPage] = useSearchParams();
  const pageUrl = searchParamPage.get('page') || '1';

  const pagesNumbers = Math.ceil(total / perPage);

  for (let i = 1; i <= pagesNumbers; i += 1) {
    arrayPagesNumbers.push(i);
  }

  useEffect(() => {
    let tempArrayPage:(number | string)[] = [...arrayPagesNumbers];
    const sliceArrayFirst = arrayPagesNumbers.slice(0, 1).concat(['...']);
    const sliceArraySecond = arrayPagesNumbers.slice(0, 3)
      .concat(['...']);
    const sliceArrayMiddle = arrayPagesNumbers.slice((page - 1),
      (page + 1)).concat(['....']);
    const sliceArrayLast = arrayPagesNumbers.slice(arrayPagesNumbers.length
      - 3);

    if (arrayPagesNumbers.length <= 5) {
      tempArrayPage = arrayPagesNumbers;
    } else if (page >= 1 && page <= 2) {
      tempArrayPage = [...sliceArraySecond,
        arrayPagesNumbers.length];
    } else if (page === 3) {
      tempArrayPage = [...sliceArraySecond, arrayPagesNumbers.length];
    } else if (page > 3 && page < (arrayPagesNumbers.length - 1)) {
      tempArrayPage = [...sliceArrayFirst,
        ...sliceArrayMiddle, arrayPagesNumbers.length];
    } else if (page > (arrayPagesNumbers.length - 2)) {
      tempArrayPage = [...sliceArrayFirst, ...sliceArrayLast];
    }

    setCurrentArrayNumbers(tempArrayPage);
    setSearchParamPage({
      page: page.toString(),
      perPage: perPage.toString(),
    });
  }, [page, perPage]);

  searchParamPage.set('page', 'perPage');

  return (
    <div>
      <ul className="pagination-list">
        <li>
          <Link
            to={`?page=${pageUrl}&perPage=${perPageUrl}`}
          >
            <button
              type="button"
              className="pagination-list__pageItem pagination-list__item__list"
              disabled={(page === 1)}
              onClick={getPrevPage}
            >
              Prev
            </button>
          </Link>
        </li>
        {currentArrayNumbers.map((number) => (
          <li
            className="pagination-list__item"
            key={number}
          >
            <Link
              to={`?page=${page}&perPage=${perPageUrl}`}
              className={`pagination-list__item__list ${(page === number) && 'pagination-list-active'
              }`}
              onClick={() => onPageChange(number as number)}
            >
              {number}
            </Link>
          </li>
        ))}
        <li>
          <Link
            to={`?page=${pageUrl}&perPage=${perPageUrl}`}
          >
            <button
              type="button"
              className="pagination-list__pageItem pagination-list__item__list"
              disabled={(page >= pagesNumbers)}
              onClick={getNextPage}
            >
              Next
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
