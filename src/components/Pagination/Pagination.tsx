import cn from 'classnames';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  itemsOnPage:string[],
  setCurrentPage:(page : number) => void,
}

export const Pagination: React.FC<Props> = (props) => {
  const {
    total, perPage, currentPage, itemsOnPage, setCurrentPage,
  } = props;

  const totalPage = (Math.ceil(total / perPage));
  const pagesNumbers = Array.from({ length: totalPage }, (_, i) => i + 1);

  const handelPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handelNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={cn('page-item', { disabled: currentPage === 1 })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={handelPrevPage}
          >
            «
          </a>
        </li>

        {pagesNumbers.map(pageNumber => (
          <li
            className={cn(
              'page-item',
              { active: pageNumber === currentPage },
            )}
            key={pageNumber}
          >
            <a
              data-cy="pageLink"
              className={cn(
                'page-link',
              )}
              href={`#${pageNumber - 1}`}
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </a>
          </li>

        ))}

        <li
          className={cn(
            'page-item',
            { disabled: currentPage === pagesNumbers.length },
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pagesNumbers.length}
            onClick={handelNextPage}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemsOnPage.map(item => <li data-cy="item" key={item}>{item}</li>)}
      </ul>
    </>
  );
};
