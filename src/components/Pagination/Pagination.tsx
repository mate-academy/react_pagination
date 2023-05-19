import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onChange,
}) => {
  const [current, setCurrent] = useState<number>(1);

  useEffect(() => {
    setCurrent(currentPage);
  }, [currentPage]);

  const pagesAmount = useMemo(
    () => Math.ceil(total / perPage),
    [total, perPage],
  );
  const pages = useMemo(() => getNumbers(1, pagesAmount), [pagesAmount]);

  const leftButtonDisabled = useMemo(() => current === 1, [current]);
  const rightButtonDisabled = useMemo(
    () => current === pagesAmount,
    [current, pagesAmount],
  );

  const handleChange = useCallback(() => {
    setCurrent((prevState) => {
      onChange(prevState);

      return prevState;
    });
  }, [onChange]);

  const handleLeftButtonClick = useCallback(() => {
    if (!leftButtonDisabled) {
      setCurrent(current - 1);

      handleChange();
    }
  }, [current, leftButtonDisabled]);

  const handleRightButtonCLick = useCallback(() => {
    if (!rightButtonDisabled) {
      setCurrent(current + 1);

      handleChange();
    }
  }, [current, rightButtonDisabled]);

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: leftButtonDisabled })}>
        <a
          data-cy="prevLink"
          className="page-link "
          href="#prev"
          aria-disabled="true"
          onClick={handleLeftButtonClick}
        >
          «
        </a>
      </li>
      {pages.map((page) => (
        <li className={classNames('page-item', { active: page === current })}>
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => {
              setCurrent(page);
              handleChange();
            }}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={classNames('page-item', { disabled: rightButtonDisabled })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
          onClick={handleRightButtonCLick}
        >
          »
        </a>
      </li>
    </ul>
  );
};
