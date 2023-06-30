import cn from 'classnames';

type Props = {
  items: string[],
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination = ({
  items,
  total,
  perPage,
  currentPage,
  onPageChange,
}: Props) => {
  const numOfPages = () => {
    return Math.ceil(total / perPage);
  };

  const handleNextPage = () => {
    if (currentPage < numOfPages()) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleSelectPage = (num: number) => {
    if (currentPage !== num) {
      onPageChange(num);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: currentPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={handlePrevPage}
          >
            «
          </a>
        </li>
        {Array.from({ length: numOfPages() }, ((_, i: number) => (
          <li className={cn('page-item', { active: currentPage === i + 1 })}>
            <a
              data-cy="pageLink"
              className="page-link"
              href="#1"
              onClick={() => handleSelectPage(i + 1)}
            >
              {i + 1}
            </a>
          </li>
        )))}

        <li className={cn('page-item',
          { disabled: currentPage === numOfPages() })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === numOfPages()}
            onClick={handleNextPage}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items
          .slice((currentPage - 1) * perPage, currentPage * perPage)
          .map(item => (
            <li data-cy="item" key={item}>{item}</li>
          ))}
      </ul>
    </>
  );
};
