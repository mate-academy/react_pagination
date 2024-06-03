import classNames from 'classnames';

type Props = {
  pages: number[];
  activePage: number;
  onChangeActivePage: (page: number) => void;
  activeIndex: number;
};

export const Pagination: React.FC<Props> = ({
  pages,
  activePage,
  onChangeActivePage,
  activeIndex,
}) => {
  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: activePage === pages[0],
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={activePage === pages[0]}
          onClick={() => {
            if (activePage !== pages[0]) {
              onChangeActivePage(pages[activeIndex - 1]);
            }
          }}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          className={classNames('page-item', { active: activePage === page })}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#` + page}
            onClick={() => {
              onChangeActivePage(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={classNames('page-item', {
          disabled: activePage === pages[pages.length - 1],
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={activePage === pages[pages.length - 1]}
          onClick={() => {
            if (activePage !== pages[pages.length - 1]) {
              onChangeActivePage(pages[activeIndex + 1]);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
