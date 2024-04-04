import cn from 'classnames';

type Props = {
  items: string[];
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
  perPage: number;
};

export const Pagination: React.FC<Props> = ({
  items,
  currentPage,
  setCurrentPage,
  perPage,
}) => (
  <ul className="pagination">
    <li className={cn({ disabled: currentPage === 1 }, 'page-item')}>
      <a
        data-cy="prevLink"
        className="page-link"
        href="#prev"
        aria-disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        «
      </a>
    </li>
    {Array.from({ length: Math.ceil(items.length / perPage) }, (_, index) => (
      <li
        className={cn({ active: currentPage === index + 1 }, 'page-item')}
        key={index}
      >
        <a
          data-cy="pageLink"
          className="page-link"
          href={`#${index + 1}`}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </a>
      </li>
    ))}
    <li
      className={cn(
        { disabled: currentPage === Math.ceil(items.length / perPage) },
        'page-item',
      )}
    >
      <a
        data-cy="nextLink"
        className="page-link"
        href="#next"
        aria-disabled={currentPage === Math.ceil(items.length / perPage)}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        »
      </a>
    </li>
  </ul>
);
