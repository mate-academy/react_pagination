import classNames from 'classnames';

type Props = {
  itemsPerPage: number;
  items: string[];
  activePage: number;
  setActivePage: (page: number) => void;
  pageCount: number;
};

export const Pagination: React.FC<Props> = ({
  itemsPerPage,
  items,
  activePage,
  setActivePage,
  pageCount,
}) => {
  return (
    <>
      <ul className="pagination">
        <li
          className={classNames('page-item', {
            disabled: activePage === 1,
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href={`#prev`}
            aria-disabled={activePage === 1}
            onClick={e => {
              if (activePage === 1) {
                e.preventDefault();

                return;
              }

              setActivePage(activePage - 1);
            }}
          >
            «
          </a>
        </li>
        {Array.from({ length: pageCount }, (_, i) => (
          <li
            className={classNames('page-item', {
              active: i + 1 === activePage,
            })}
            key={i}
          >
            <a
              data-cy="pageLink"
              href={`#${i + 1}`}
              onClick={() => setActivePage(i + 1)}
              className="page-link"
            >
              {i + 1}
            </a>
          </li>
        ))}
        <li
          className={classNames('page-item', {
            disabled: activePage === pageCount,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={activePage === pageCount}
            onClick={e => {
              if (activePage === pageCount) {
                e.preventDefault();

                return;
              }

              setActivePage(activePage + 1);
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {[...items]
          .slice(
            activePage * itemsPerPage - itemsPerPage,
            activePage * itemsPerPage,
          )
          .map(item => {
            return (
              <li data-cy="item" key={item}>
                {item}
              </li>
            );
          })}
      </ul>
    </>
  );
};
