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

        {itemsArr.map((el, id) => {
          return (
            <li className={`page-item ${currentPage === id + 1 ? 'active' : ''}`} key={el[0]}>
              <a
                data-cy="pageLink"
                className="page-link"
                href="#1"
                onClick={() => {
                  if (currentPage !== id + 1) {
                    setCurrentPage(id + 1);
                  }
                }}
              >
                {id + 1}
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
