import cn from 'classnames';

type Props = {
  currentPage: number;
  itemsPerPage: number;
  changeCountOfPages: (itemsPerPage: number) => number[];
  goNext: () => void;
  goPrev: () => void;
  onSetPage: (currentPage: number) => void;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  itemsPerPage,
  changeCountOfPages,
  goNext,
  goPrev,
  onSetPage,
}) => {
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
          aria-disabled={currentPage === 1
            ? 'true'
            : 'false'}
          onClick={() => {
            if (currentPage !== 1) {
              goPrev();
            }
          }}
        >
          «
        </a>
      </li>

      {
        changeCountOfPages(itemsPerPage).map(page => (
          <li
            className={cn('page-item', {
              active: page === currentPage,
            })}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => onSetPage(page)}
            >
              {page}
            </a>
          </li>
        ))
      }
      <li className={cn('page-item', {
        disabled: currentPage === changeCountOfPages(itemsPerPage).length,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === changeCountOfPages(itemsPerPage).length
            ? 'true'
            : 'false'}
          onClick={() => {
            if (currentPage !== changeCountOfPages(itemsPerPage).length) {
              goNext();
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
