import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getNumbers } from '../../utils';
import { items } from '../../items';
import { getSearchWith } from '../../searchHelper';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
}) => {
  const [searchParams] = useSearchParams();

  const buttonCount = total % perPage === 0
    ? Math.floor(total / perPage)
    : Math.floor((total / perPage) + 1);

  const pageNumbers = getNumbers(1, buttonCount);

  const visibleItems = items
    .slice(currentPage * perPage - perPage, currentPage * perPage);

  const handlePrevClick = () => {
    if (currentPage === 1) {
      return searchParams.toString();
    }

    return getSearchWith(searchParams, 'page', currentPage - 1).toString();
  };

  const handleNextClick = () => {
    if (currentPage === buttonCount) {
      return searchParams.toString();
    }

    return getSearchWith(searchParams, 'page', currentPage + 1).toString();
  };

  const handleBtnClick = (number: number) => {
    return getSearchWith(searchParams, 'page', number).toString();
  };

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', {
          disabled: currentPage === 1,
        })}
        >
          <Link
            data-cy="prevLink"
            className="page-link"
            to={{ search: handlePrevClick() }}
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
          >
            «
          </Link>
        </li>

        {pageNumbers.map(number => (
          <li
            key={number}
            className={cn('page-item', {
              active: number === currentPage,
            })}
          >
            <Link
              data-cy="pageLink"
              className="page-link"
              to={{ search: handleBtnClick(number) }}
            >
              {number}
            </Link>
          </li>
        ))}

        <li className={cn('page-item', {
          disabled: currentPage === buttonCount,
        })}
        >
          <Link
            data-cy="nextLink"
            className="page-link"
            to={{ search: handleNextClick() }}
            aria-disabled={currentPage === buttonCount ? 'true' : 'false'}
          >
            »
          </Link>
        </li>
      </ul>

      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
};
