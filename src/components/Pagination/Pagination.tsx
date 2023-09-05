import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  currentPage: number,
  perPage: number
  handlePageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  currentPage,
  perPage,
  handlePageChange,
}) => {
  const PageChange = (page: number) => {
    if (page !== currentPage) {
      handlePageChange(page);
    }
  };

  const prevLinkClick = () => {
    if (currentPage !== 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const countPages = Math.ceil(total / perPage);
  const items = getNumbers(1, total).map(n => `Item ${n}`);
  const arrayOfPage: number[] = getNumbers(1, countPages);
  const currentItemsOnPage = items.slice(
    (currentPage - 1) * perPage, (currentPage * perPage),
  );

  const nextLinkClick = () => {
    if (currentPage !== countPages) {
      handlePageChange(currentPage + 1);
    }
  };
  // console.log('countPages', countPages);
  // console.log('arrayOfPage', arrayOfPage);
  // console.log('currentItemsOnPage', currentItemsOnPage);
  // const arrayOfDigits = Array.from(String(countPages), Number);
  // console.log('arrayOfDigits', arrayOfDigits);

  return (
    <>
      <ul className="pagination">
        <li className={classNames('page-item',
          { disabled: currentPage === 1 })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={prevLinkClick}
          >
            «
          </a>
        </li>
        {arrayOfPage.map(page => (
          <li
            key={page}
            className={classNames(
              'page-item', { active: page === currentPage },
            )}
          >
            <a
              data-cy="pageLink"
              className={classNames('page-link')}
              href={`#${page}`}
              onClick={() => PageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={classNames(
            'page-item', { disabled: currentPage === countPages },
          )}
        >
          <a
            data-cy="nextLink"
            className={classNames('page-link')}
            href="#next"
            aria-disabled={currentPage === countPages}
            onClick={nextLinkClick}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {currentItemsOnPage.map(item => (
          <li
            key={item}
            data-cy="item"
          >
            {item}
          </li>
        ))}
      </ul>
    </>

  );
};
