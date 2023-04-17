import cn from 'classnames';

type Props = {
  items: string[],
  currentPage: number,
  perPage: number,
  onPageChange: (value: number) => void,
};

export const Pagination: React.FC<Props> = ({
  items, currentPage, perPage, onPageChange,
}) => {
  const lastPage = Math.ceil(items.length / perPage);

  const displayPagination = Array.from({ length: lastPage }, (_, i) => i + 1)
    .map(page => (
      <li
        key={page}
        className={
          cn(
            'page-item',
            { active: currentPage === page },
          )
        }
      >
        <a
          href={`#${page}`}
          data-cy="pageLink"
          className="page-link"
          onClick={() => onPageChange(page)}
        >
          {page}
        </a>
      </li>
    ));

  const filteredItems = (
    units: string[], forPage: number, currPage: number,
  ) => {
    const startIndex = (currPage - 1) * forPage;
    const endIndex = startIndex + forPage;

    return units.slice(startIndex, endIndex).map(unit => (
      <li key={unit} data-cy="item">
        {unit}
      </li>
    ));
  };

  const handleMoveBack = ((currPage: number) => {
    onPageChange(currPage > 1 ? currPage - 1 : 1);
  });

  const handleMoveForward = ((currPage: number) => {
    onPageChange(currPage < lastPage ? currPage + 1 : lastPage);
  });

  return (
    <>
      <ul className="pagination">
        <li className={
          cn(
            'page-item',
            { disabled: currentPage === 1 },
          )
        }
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => handleMoveBack(currentPage)}
          >
            «
          </a>
        </li>

        {displayPagination}

        <li className={
          cn(
            'page-item',
            { disabled: currentPage === lastPage },
          )
        }
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === lastPage}
            onClick={() => handleMoveForward(currentPage)}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {filteredItems(items, perPage, currentPage)}
      </ul>
    </>
  );
};
