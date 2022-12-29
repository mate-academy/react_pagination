import cn from 'classnames';
import { generateKey } from '../../utils/generateKey';
import sliceIntoChunks from '../../utils/sliceIntoChunks';

type Props = {
  items: string[],
  total: number,
  itemsPerPage: number,
  currentPage: number,
  setPage: React.Dispatch<React.SetStateAction<number>>,
};

export const Pagination = ({
  items,
  total,
  itemsPerPage,
  currentPage = 1,
  setPage,
}: Props) => {
  const pages = sliceIntoChunks(
    items,
    total,
    itemsPerPage,
  );

  const handlePageChange = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    target: number,
    disable: number,
  ) => {
    if (disable === target) {
      e.preventDefault();
    } else {
      setPage(target);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={cn(
          'page-item',
          { disabled: currentPage === 1 },
        )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={(e) => handlePageChange(e, currentPage - 1, 0)}
          >
            «
          </a>
        </li>

        {pages.map((_el, i) => (
          <li
            key={generateKey('pageLink', i)}
            className={cn(
              'page-item',
              { active: (i + 1) === currentPage },
            )}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${i + 1}`}
              onClick={(e) => handlePageChange(e, i + 1, currentPage)}
            >
              {i + 1}
            </a>
          </li>
        ))}

        <li className={cn(
          'page-item',
          { disabled: currentPage === pages.length },
        )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pages.length}
            onClick={(e) => handlePageChange(
              e,
              currentPage + 1,
              pages.length + 1,
            )}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {pages[currentPage - 1].map((pageItem, i) => (
          <li data-cy="item" key={generateKey('item', i)}>
            {pageItem}
          </li>
        ))}
      </ul>
    </>
  );
};
