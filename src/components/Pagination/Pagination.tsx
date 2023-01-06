import classNames from 'classnames';
import { Page } from '../../types/Page';
import { getNumbers } from '../../utils';

export const Pagination: React.FC<Page> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  getArrayItems,
}) => {
  const numbersOfpages = Math.ceil(total / perPage);
  const pagesLinksArray = getNumbers(1, numbersOfpages);

  return (
    <>
      <ul className="pagination">
        <li className={
          classNames('page-item', { disabled: currentPage === 1 })
        }
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage !== 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            «
          </a>
        </li>

        {pagesLinksArray.map(page => (
          <li
            key={page}
            className={
              classNames('page-item', { active: currentPage === page })
            }
          >
            <a
              key={page}
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}

        <li className={
          classNames('page-item', { disabled: currentPage === numbersOfpages })
        }
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === numbersOfpages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {
          getArrayItems(perPage, currentPage, total)
            .map(item => (
              <li key={item} data-cy="item">{`Item ${item}`}</li>
            ))
        }
      </ul>
    </>
  );
};
