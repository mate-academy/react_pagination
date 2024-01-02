import React from 'react';

type Props = {
  total: number,
  perPage: string,
  currentPage: number,
  setCurrentPage: (value: number) => void,
};

export const Pagination:React.FC<Props> = (
  {
    total, perPage, currentPage, setCurrentPage,
  },
) => {
  const paginationPageCount = Math.ceil(total / +perPage);
  const paginationPageCountArr = Array.from({ length: paginationPageCount },
    (_, i) => i + 1);
  const allItems = [];

  for (let i = 1; i <= total; i += 1) {
    allItems.push(`Item ${i}`);
  }

  const itemsArr = [];

  for (let j = 0; j < allItems.length; j += +perPage) {
    itemsArr.push(allItems.slice(j, j + +perPage));
  }

  const itemsList = itemsArr[currentPage - 1];

  function prevLinkHandler() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextLinkHandler() {
    if (currentPage !== paginationPageCount) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={prevLinkHandler}
          >
            «
          </a>
        </li>

        {paginationPageCountArr.map((el) => {
          return (
            <li className={`page-item ${currentPage === el ? 'active' : ''}`} key={el}>
              <a
                data-cy="pageLink"
                className="page-link"
                href="#1"
                onClick={() => {
                  if (currentPage !== el) {
                    setCurrentPage(el);
                  }
                }}
              >
                {el}
              </a>
            </li>
          );
        })}

        <li className={`page-item ${currentPage === paginationPageCount ? 'disabled' : ''}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={
              currentPage === paginationPageCount ? 'true' : 'false'
            }
            onClick={nextLinkHandler}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemsList.map(item => {
          return (
            <li data-cy="item" key={item}>{item}</li>
          );
        })}
      </ul>
    </>
  );
};
