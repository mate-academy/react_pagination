import { getNumbers } from '../../utils';

interface Props {
  items: string[];
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
}

export const Pagination: React.FC<Props> = ({
  items,
  itemsPerPage: ItemsPerPage,
  currentPage,
  onPageChange,
}) => {
  function creativePageContent(
    data: string[],
    listLength: number,
    selectPage: number = 1,
  ) {
    const arrayOfSliceData = [];
    const index = selectPage - 1;

    for (let i = 0; i < data.length; i += listLength) {
      arrayOfSliceData.push(data.slice(i, i + listLength));
    }

    if (arrayOfSliceData[index]) {
      const pageContent = arrayOfSliceData[index];

      return pageContent;
    }

    return 0;
  }

  const content = creativePageContent(items, ItemsPerPage, currentPage);

  const totalPages = Math.ceil(items.length / ItemsPerPage);
  const pages: number[] = getNumbers(1, totalPages);

  function movePage(page: number, direction: string) {
    if (direction === 'back' && page !== 1) {
      onPageChange(page - 1);
    }

    if (direction === 'next' && page !== totalPages) {
      onPageChange(page + 1);
    }
  }

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''} `}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? true : false}
            onClick={() => movePage(currentPage, 'back')}
          >
            «
          </a>
        </li>

        {pages.map(page => (
          <li
            key={page}
            className={`page-item ${page === currentPage ? 'active' : ''}`}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={`page-item ${currentPage === totalPages ? 'disabled' : ''} `}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages ? true : false}
            onClick={() => movePage(currentPage, 'next')}
          >
            »
          </a>
        </li>
      </ul>
      {}
      <ul>
        {content.map((n, index) => (
          <li key={index} data-cy="item">
            {n}
          </li>
        ))}
      </ul>
    </>
  );
};
