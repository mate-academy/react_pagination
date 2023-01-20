/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const [active, setActive] = useState(0);
  const [prevButton, setPrevButton] = useState(true);
  const [nextButton, setNextButton] = useState(false);

  const visiblePages = Math.ceil(total / perPage);

  useEffect(() => {
    if (active !== 0) {
      setPrevButton(false);
    } else {
      setPrevButton(true);
    }

    if (active !== visiblePages - 1) {
      setNextButton(false);
    } else {
      setNextButton(true);
    }
  }, [active]);

  useEffect(() => {
    setActive(0);
    onPageChange(1);
  }, [perPage]);

  return (
    <ul className="pagination">
      <li className={cn(
        'page-item',
        {
          disabled: prevButton,
        },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={prevButton}
          onClick={() => {
            setActive(state => state - 1);
            onPageChange(currentPage - 1);
          }}
        >
          «
        </a>
      </li>

      {[...Array(visiblePages)].map((x, i) => {
        console.log(x);

        return (
          <li
            className={cn(
              'page-item',
              {
                active: i === active,
              },
            )}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${i + 1}`}
              onClick={() => {
                setActive(i);
                onPageChange(i + 1);
              }}
            >
              {i + 1}
            </a>
          </li>
        );
      })}

      <li className={cn(
        'page-item',
        {
          disabled: nextButton,
        },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={nextButton}
          onClick={() => {
            setActive(state => state + 1);
            onPageChange(currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
