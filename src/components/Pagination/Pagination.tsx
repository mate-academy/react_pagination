import { v4 as uuid4 } from 'uuid';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { getNumbers } from '../../utils';

type Props = {
  items: string[]
  perPageSelector: string
  onPageChange: (pageNumber: number) => void
};

export const Pagination: React.FC<Props> = ({
  items, perPageSelector, onPageChange,
}) => {
  const [activePage, setActivePage] = useState(1);

  const amountPages = Math.ceil(items.length / +perPageSelector);
  const arrayPages = getNumbers(1, amountPages);
  const itemsOnPage = items
    .slice((activePage - 1) * +perPageSelector, activePage * +perPageSelector);

  useEffect(() => {
    setActivePage(1);
  }, [perPageSelector]);

  useEffect(() => {
    onPageChange(+activePage);
  }, [activePage]);

  return (
    <>
      <ul className="pagination">
        <li className={classNames('page-item', { disabled: activePage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
            onClick={() => setActivePage(activePage - 1)}
          >
            «
          </a>
        </li>
        {arrayPages.map(page => (
          <li
            key={uuid4()}
            className={classNames('page-item', { active: page === activePage })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => setActivePage(page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li className={classNames('page-item', {
          disabled: activePage === amountPages,
        })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="true"
            onClick={() => setActivePage(activePage + 1)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemsOnPage.map((item) => (
          <li key={uuid4()} data-cy="item">{`Item ${item}`}</li>
        ))}
      </ul>
    </>
  );
};
