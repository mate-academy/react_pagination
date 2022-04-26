/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import './Paginator.scss';

type Props = {
  total: number,
  perPage: number,
  page: number,
  onChangePage: (item: string) => void,
};

export const Paginator:React.FC<Props> = ({
  total,
  perPage,
  page,
  onChangePage,
}) => {
  const [items, setItems] = useState<string[]>(['1']);
  const count = Math.ceil(total / perPage);

  useEffect(() => {
    setItems(['1']);

    if ((page - 1) > 2) {
      setItems((current: string[]) => [...current, '...']);
    }

    for (let i = 2; i <= count; i++) {
      if (i >= (page - 1) && i <= (page + 1)) {
        setItems((current: string[]) => [...current, i.toString()]);
      }
    }

    if ((page + 2) < count) {
      setItems((current: string[]) => [...current, '...']);
    }

    if (count > (page + 1)) {
      setItems((current: string[]) => [...current, count.toString()]);
    }
  }, [total, perPage, page]);

  return (
    <ul className="pagination">
      <li>
        <button
          type="button"
          onClick={() => onChangePage((page - 1).toString())}
          disabled={page === 1}
        >
          Prev
        </button>
      </li>
      {items.map(item => (
        <li>
          {(item === '...')
            ? <span>{item}</span>
            : (
              <button
                type="button"
                onClick={() => onChangePage(item)}
                className={classnames({ active: item === page.toString() })}
                disabled={item === page.toString()}
              >
                {item}
              </button>
            )}
        </li>
      ))}
      <li>
        <button
          type="button"
          onClick={() => onChangePage((page + 1).toString())}
          disabled={page === Math.ceil(total / perPage)}
        >
          Next
        </button>
      </li>
    </ul>
  );
};
