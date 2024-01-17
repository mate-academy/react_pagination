export const PageItem: React.FC<{
  isActive: boolean,
  numberOfElem: number,
  onChangePage: React.Dispatch<React.SetStateAction<number>>,
  total: number,
}> = ({
  isActive,
  numberOfElem,
  onChangePage,
  total,
}) => (
  <li className={`page-item ${isActive ? 'active' : ''}`}>
    <a
      data-cy="pageLink"
      className="page-link"
      href={`#${numberOfElem}`}
      onClick={() => {
        if (numberOfElem >= total) {
          onChangePage(1);
        } else {
          onChangePage(numberOfElem);
        }
      }}
    >
      {`${numberOfElem}`}
    </a>
  </li>
);
