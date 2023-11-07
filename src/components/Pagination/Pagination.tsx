import cn from 'classnames';

type PaginationProps = {
  total: number[];
  setCurrentPage: (item: number) => void;
  // perPage: number;
  currentPage: number;
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  setCurrentPage,
  // perPage,
  currentPage,
}) => {
  const firstDisabledAria = currentPage === 1;
  const arrowDisable = total.length;
  const endDisabledAria = currentPage === arrowDisable;

  const prevLinkCheck = (prevLink: number) => {
    if (prevLink + 1 !== 1) {
      setCurrentPage(prevLink);
    }
  };

  const checkButton = (item: number) => {
    if (item !== currentPage) {
      setCurrentPage(item);
    }
  };

  const nextLinkCheck = (item: number) =>{
    if (item -1 !== arrowDisable) {
      setCurrentPage(item);
    }
  };


  return (
    <ul className="pagination">
      <li className={cn('page-item', {
        disabled: currentPage === 1,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={firstDisabledAria}
          onClick={() => prevLinkCheck(currentPage - 1)}
        >
          «
        </a>
      </li>

      {total.map((item: number) => (
        <li
          className={cn('page-item', { active: currentPage === item })}
          key={item}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${item}`}
            onClick={() => checkButton(item)}
          >
            {item}
          </a>
        </li>
      ))}

      <li className={`page-item ${cn({
        disabled: currentPage === arrowDisable,
      })}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={endDisabledAria}
          onClick={() => nextLinkCheck(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
