import { useEffect } from 'react';

interface Props {
  newList: string[];
  total: number;
  perPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setInfo: React.Dispatch<React.SetStateAction<string>>;
  items: string[];
}

export const Pagination: React.FC<Props> = ({
  newList,
  total,
  perPage,
  currentPage,
  setCurrentPage,
  setInfo,
  items,
}) => {
  const indexOfFirst = items.indexOf(newList[0]) + 1;
  const indexOfLast = items.indexOf(newList[newList.length - 1]) + 1;

  useEffect(() => {
    setInfo(`Page ${currentPage} (items ${indexOfFirst} - ${indexOfLast} of ${items.length})`);
  }, [currentPage, indexOfFirst, indexOfLast, items.length, setInfo]);

  const totalPages = Math.ceil(total / perPage);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const goToPrevPage = () => {
    if (!isFirstPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (!isLastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const pages = Array.from({ length: totalPages }).map((_, index) => index);

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${isFirstPage ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirstPage}
            onClick={goToPrevPage}
          >
            «
          </a>
        </li>

        {pages.map((page) => (
          <li key={page} className={`page-item${currentPage === page + 1 ? ' active' : ''}`}>
            <a
              data-cy="pageLink"
              href={`#${page + 1}`}
              onClick={() => {
                setCurrentPage(page + 1);
              }}
              className="page-link"
            >
              {page + 1}
            </a>
          </li>
        ))}

        <li className={`page-item ${isLastPage ? 'disabled' : ''}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLastPage}
            onClick={goToNextPage}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {newList.map(item => (
          <li key={item} data-cy="item">{item}</li>
        ))}
      </ul>
    </>
  );
};
