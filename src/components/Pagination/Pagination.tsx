import classNames from 'classnames';

type Props = {
  pages: number[];
  onChange: (elem: number) => void;
  currentPage: number;
};

export const Pagination: React.FC<Props> = ({
  pages,
  onChange,
  currentPage,
}) => (
  <ul className="pagination">
    <li className={classNames('page-item', { disabled: currentPage === 1 })}>
      <a
        data-cy="prevLink"
        className="page-link"
        href="#prev"
        aria-disabled={currentPage === 1}
        onClick={() => {
          if (currentPage > 1) {
            onChange(currentPage - 1);
          }
        }}
      >
        «
      </a>
    </li>
    {pages.map(elem => (
      <li
        className={classNames('page-item', { active: currentPage === elem })}
        key={elem}
      >
        <a
          data-cy="pageLink"
          className="page-link"
          href="#1"
          onClick={() => onChange(elem)}
        >
          {elem}
        </a>
      </li>
    ))}
    <li
      className={classNames('page-item', {
        disabled: currentPage === pages[pages.length - 1],
      })}
    >
      <a
        data-cy="nextLink"
        className="page-link"
        href="#next"
        aria-disabled={currentPage === pages[pages.length - 1]}
        onClick={() => {
          if (currentPage !== pages[pages.length - 1]) {
            onChange(currentPage + 1);
          }
        }}
      >
        »
      </a>
    </li>
  </ul>
);
