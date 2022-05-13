import React from 'react';
import './Pagination.scss';

type Props = {
  total: number,
  perPage?: number,
  page?: number,
  currentPage: number,
  withInfo: boolean,
  selectPage: (selectedPage: number) => void,
};

const Pagination: React.FC<Props> = ({
  total,
  perPage = 5,
  page = 1,
  currentPage,
  withInfo,
  selectPage,
}) => {
  const pagesArray: number[] = [];
  let startPage = 1;

  if (total - perPage >= page) {
    startPage = page;
  } else {
    startPage = total - perPage + 1;
  }

  for (let i = startPage; i < startPage + perPage; i += 1) {
    pagesArray.push(i);
  }

  return (
    <>
      {
        withInfo
        && (
          <div
            className="WithInfo"
          >
            {`${startPage} - ${startPage + perPage - 1} of ${total}`}
          </div>
        )
      }
      {
        pagesArray.map(visiblePage => (
          <button
            type="button"
            onClick={() => {
              selectPage(visiblePage);
            }}
            className={
              currentPage === visiblePage ? 'PageItem Selected' : 'PageItem'
            }
            key={visiblePage}
          >
            {visiblePage}
          </button>
        ))
      }
    </>
  );
};

// The expression below was added because of linter
// but it doesn't have any sense
Pagination.defaultProps = {
  perPage: 5,
  page: 1,
};

export default Pagination;
