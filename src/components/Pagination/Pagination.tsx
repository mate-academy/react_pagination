import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number, pages: number) => void;
}

export const Pagination = ({
  perPage,
  currentPage,
  onPageChange,
  total,
}: Props) => {
  const items = getNumbers(1, total).map((n: number) => `Item ${n}`);

  //Number of items
  const pages = Math.ceil(total / perPage);

  //Pagination
  const links = getNumbers(1, pages);

  //Number of items per page
  const itemsPerPage = perPage;

  //Current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <ul className="pagination">
        <li
          className={currentPage === 1 ? 'page-item disabled' : 'page-item'}
          onClick={() => onPageChange(currentPage - 1, pages)}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
          >
            «
          </a>
        </li>
        {links.map(link => (
          <li
            key={link}
            className={link === currentPage ? 'page-item active' : 'page-item'}
            onClick={() => onPageChange(link, pages)}
          >
            <a data-cy="pageLink" className="page-link" href={`#${link}`}>
              {link}
            </a>
          </li>
        ))}
        <li
          className={currentPage === pages ? 'page-item disabled' : 'page-item'}
          onClick={() => onPageChange(currentPage + 1, pages)}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pages}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {currentItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
