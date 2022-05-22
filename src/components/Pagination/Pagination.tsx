import { FC, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import './Pagination.scss';

type Props = {
  totalPages: number,
  perPage: number,
  // page: number | 1,
  onPageChange: (newCurrPage: number) => void,
  onPerPageChange: (newPerPage: number) => void,
  // prevPage: () => void,
  // nextPage: () => void,
  withInfo: boolean | true,
};

export const Pagination: FC<Props> = (props) => {
  const {
    totalPages,
    perPage,
    onPageChange,
    onPerPageChange,
    withInfo,
  } = props;

  const [queryParams] = useSearchParams();

  const newPage = Number(queryParams.get('page')) || 1;
  const newPerPage = Number(queryParams.get('perPage')) || 5;

  useEffect(() => {
    onPageChange(newPage);
    onPerPageChange(newPerPage);
  }, [queryParams]);

  const numberOfButtons = Math.ceil(totalPages / perPage);
  const buttons = useMemo(() => {
    return Array.from({ length: numberOfButtons }, (_, index) => index + 1);
  }, [totalPages, perPage]);

  let currPage = newPage;
  const currPerPage = newPerPage;

  if (currPage > numberOfButtons) {
    currPage = numberOfButtons;
  }

  if (currPage < 1) {
    currPage = 1;
  }

  const prevButton = (currPage - 1) < 0 ? 1 : (currPage - 1);
  const nextButton = (currPage + 1) > numberOfButtons
    ? numberOfButtons
    : (currPage + 1);
  const lastButton = numberOfButtons;
  const firstButton = 1;

  const isLastButton = currPage === numberOfButtons;

  const isVisibleButtons = (button: number) => {
    const first5Buttons = (button <= 5 && currPage <= 3);
    const last5Buttons = (button >= (numberOfButtons - 4)
          && currPage >= (numberOfButtons - 2));

    return button === currPage
        || button === firstButton
        || button === prevButton
        || button === nextButton
        || button === lastButton
        || first5Buttons
        || last5Buttons;
  };

  const threeDots = numberOfButtons + 8230;

  const visibleButtons = useMemo(() => {
    let filtered = buttons.filter(isVisibleButtons);

    if (prevButton > 2 && numberOfButtons > 5) {
      const firstBtn = filtered && filtered.shift();

      filtered = firstBtn
        ? [firstBtn, threeDots, ...filtered]
        : filtered;
    }

    if (nextButton < (buttons.length - 1) && numberOfButtons > 5) {
      const lastBtn = filtered && filtered.pop();

      filtered = lastBtn
        ? [...filtered, threeDots, lastBtn]
        : filtered;
    }

    return filtered;
  }, [isVisibleButtons]);

  const onPage = Math.ceil(totalPages / numberOfButtons);
  const firstItemOnPage = (currPage * onPage - onPage) + 1;
  let lastItemOnPage = currPage * onPage;

  if (isLastButton) {
    lastItemOnPage = totalPages;
  }

  return (
    <>
      <h1 className="content">
        {withInfo
          ? `${firstItemOnPage} - ${lastItemOnPage} of ${totalPages}`
          : 'Choose page'}
      </h1>

      <nav className="pagination">
        <Link
          to={{ pathname: '/', search: `?page=${prevButton}&perPage=${perPage}` }}
          className={classNames(
            'pagination__prev-btn pagination__btn',
            { 'pagination__btn--disabled': currPage === 1 },
          )}
        >
          {'<'}
        </Link>

        <div className="pagination__buttons">
          {visibleButtons.map((button, index) => {
            if (button === threeDots) {
              return (
                <button
                  type="button"
                  className="pagination__btn pagination__btn--disabled"
                  key={button + String(index)}
                  disabled
                >
                  &#8230;
                </button>
              );
            }

            return (
              <Link
                to={{ pathname: '/', search: `?page=${button}&perPage=${perPage}` }}
                className={classNames(
                  'pagination__item pagination__btn',
                  { 'pagination__btn--disabled': button === currPage },
                )}
                key={button}
              >
                {button}
              </Link>
            );
          })}
        </div>

        <Link
          className={classNames(
            'pagination__next-btn pagination__btn',
            { 'pagination__btn--disabled': isLastButton },
          )}
          to={{ pathname: '/', search: `?page=${nextButton}&perPage=${perPage}` }}
        >
          {'>'}
        </Link>
      </nav>

      <div className="pagination__settings">
        <p className="pagination__settings-title">
          Items on a page:
        </p>
        <select
          className="pagination__select"
          value={currPerPage}
          onChange={({ target }) => {
            onPerPageChange(+target.value);
          }}
        >
          <option>3</option>
          <option>5</option>
          <option>10</option>
          <option>20</option>
        </select>
      </div>
    </>
  );
};
