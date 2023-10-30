import cn from "classnames";
import array from "../../utils/pages";

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  items: Number[];
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  perPage,
  currentPage,
  items,
  onPageChange,

}) => {
  const pageChanger = (page: number) => {
    onPageChange(page);
  };


  const lastItemOnPage = currentPage * perPage;
  const firstItemOnPage = lastItemOnPage - perPage ;

  return (
    <>
      <ul className="pagination">

        <li className="page-item disabled">
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
            onClick={() => pageChanger(page)}
          >
            «
          </a>
        </li>
        {array.map((page) => (
          <li className={cn('page-item', { 'active': page === currentPage })}>
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => pageChanger(page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
            onClick={() => pageChanger(page)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.slice(firstItemOnPage, lastItemOnPage).map((item) => (
          <li data-cy="item">{item}</li>
        ))}
      </ul>
    </>
  );
};
