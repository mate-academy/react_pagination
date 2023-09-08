import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number,
  perPage: number,
  currentItem: number,
  onPageChange: (page: number) => void,
}

export const Pagination: React.FC<Props> = (props) => {
  const {
    total,
    perPage,
    currentItem,
    onPageChange,
  } = props;

  const maxItemOnCurPage = currentItem + perPage - 1 > total
    ? total : currentItem + perPage - 1;

  const handlePageClick = (page: number) => {
    const newCurrentItem = 1 + perPage * (page - 1);

    if (currentItem !== newCurrentItem) {
      onPageChange(newCurrentItem);
    }
  };

  const handleNextPageClick = () => {
    if (maxItemOnCurPage === total) {
      return;
    }

    onPageChange(currentItem + perPage);
  };

  const handlePrevPageClick = () => {
    if (currentItem === 1) {
      return;
    }

    onPageChange(currentItem - perPage);
  };

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', {
          disabled: currentItem === 1,
        })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentItem === 1}
            onClick={handlePrevPageClick}
          >
            «
          </a>
        </li>
        {getNumbers(1, Math.ceil(total / perPage))
          .map(page => (
            <li
              className={cn('page-item', {
                active: page === Math.ceil(maxItemOnCurPage / perPage),
              })}
              key={page}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${page}`}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </a>
            </li>
          ))}
        <li className={cn('page-item', {
          disabled: maxItemOnCurPage === total,
        })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={maxItemOnCurPage === total}
            onClick={handleNextPageClick}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {getNumbers(currentItem, maxItemOnCurPage)
          .map(item => (
            <li
              data-cy="item"
              key={item}
            >
              {`Item ${item}`}
            </li>
          ))}
      </ul>
    </>
  );
};
