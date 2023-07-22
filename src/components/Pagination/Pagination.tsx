import { useEffect } from 'react';

interface Props {
  newList: string[];
  pages: number[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setInfo: React.Dispatch<React.SetStateAction<string>>;
  items: string[];
}

export const Pagination: React.FC<Props> = ({
  newList,
  pages,
  currentPage,
  setCurrentPage,
  setInfo,
  items,
}) => {
  const indexOfFirst = items.indexOf(newList[0]) + 1;
  const indexOfLast = items.indexOf(newList[newList.length - 1]) + 1;

  useEffect(() => {
    setInfo(
      `Page ${currentPage + 1} (items ${indexOfFirst} - ${
        indexOfLast
      } of ${items.length})`,
    );
  }, [currentPage, indexOfFirst, newList.length, items.length, setInfo]);

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === pages.length - 1;

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

        {pages.map(page => (
          <li key={page} className={`page-item${currentPage === pages.indexOf(page) ? ' active' : ''}`}>
            <a
              data-cy="pageLink"
              href={`#${page}`}
              onClick={() => {
                setCurrentPage(pages.indexOf(page));
              }}
              className="page-link"
            >
              {page}
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
