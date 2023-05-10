type Props = {
  pageList: JSX.Element[]
  itemList: JSX.Element[]
  active: number
  setActive: (number : number) => void
};

export const Pagination: React.FC<Props> = ({
  pageList,
  itemList,
  active,
  setActive,
}) => {
  return (
    <>
      <ul className="pagination">
        <li
          className={`page-item ${active === 1 ? 'disabled' : ''}`}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={active === 1}
            onClick={() => active !== 1 && setActive(active - 1)}
          >
            «
          </a>
        </li>
        {pageList}
        <li
          className={`page-item ${active === pageList.length ? 'disabled' : ''}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={active === pageList.length}
            onClick={() => active !== pageList.length && setActive(active + 1)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemList}
      </ul>

    </>
  );
};
