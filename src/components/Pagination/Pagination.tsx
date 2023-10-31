import cn from 'classnames';
import array from '../../utils/pages';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  items: number[];
  onPageChange: (currentPage: number) => void;
};

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
  const firstItemOnPage = lastItemOnPage - perPage;

  return (
    <>
      <ul className="pagination">

        <li className="page-item">
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
            onClick={() => pageChanger(currentPage - 1)}
          >
            «
          </a>
        </li>
        {array.map((page) => (
          <li className={cn('page-item', { active: page === currentPage })}>
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => onPageChange(page)}
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
            onClick={() => pageChanger(currentPage + 1)}
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
