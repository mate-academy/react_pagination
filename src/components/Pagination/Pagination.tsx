import { FC, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import './Pagination.scss';

type Props = {
  totalPages: number,
  perPage: number | 5,
  page: number | 1,
  onPageChange: (newCurrPage: number) => void,
  onPerPageChange: (newPerPage: number) => void,
  prevPage: () => void,
  nextPage: () => void,
  withInfo: boolean | true,
};

export const Pagination: FC<Props> = (props) => {
  const {
    totalPages,
    perPage,
    page,
    onPageChange,
    onPerPageChange,
    prevPage,
    nextPage,
    withInfo,
  } = props;

  const numberOfButtons = Math.ceil(totalPages / perPage);
  const buttons = useMemo(() => {
    return Array.from({ length: numberOfButtons }, (_, index) => index + 1);
  }, [totalPages, perPage]);

  let currPage = page;

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

  const isLastButton = currPage === numberOfButtons;

  const isVisibleButtons = (button: number) => {
    const first5Buttons = (button <= 5 && currPage <= 3);
    const last5Buttons = (button >= (numberOfButtons - 4)
      && currPage >= (numberOfButtons - 2));

    return button === currPage
        || button === 1
        || button === prevButton
        || button === nextButton
        || button === lastButton
        || first5Buttons
        || last5Buttons;
  };

  let visibleButtons = buttons.filter(isVisibleButtons);

  const threeDots = numberOfButtons + 8230;

  if (prevButton > 2 && numberOfButtons > 5) {
    const firstBtn = visibleButtons.shift();

    visibleButtons = firstBtn
      ? [firstBtn, threeDots, ...visibleButtons]
      : visibleButtons;
  }

  if (nextButton < (buttons.length - 1) && numberOfButtons > 5) {
    const lastBtn = visibleButtons && visibleButtons.pop();

    visibleButtons = lastBtn
      ? [...visibleButtons, threeDots, lastBtn]
      : visibleButtons;
  }

  const onPage = Math.ceil(totalPages / numberOfButtons);
  const firstItemOnPage = currPage * onPage - onPage + 1;
  let lastItemOnPage = currPage * onPage;

  if (isLastButton) {
    lastItemOnPage = totalPages;
  }

  useEffect(() => {
    onPageChange(currPage);
  }, [currPage]);

  return (
    <>
      {withInfo && (
        <h1 className="content">
          {`${firstItemOnPage} - ${lastItemOnPage} of `}
          {totalPages}
        </h1>
      )}
      <nav className="pagination">
        <button
          type="button"
          className={classNames(
            'pagination__prev-btn pagination__btn',
          )}
          onClick={prevPage}
          disabled={currPage === 1}
        >
          {'<<'}
        </button>

        <div className="pagination__buttons">
          {visibleButtons.map((button, index) => {
            if (button === threeDots) {
              return (
                <button
                  type="button"
                  className="pagination__item-dots pagination__btn"
                  key={button + String(index)}
                  disabled
                >
                  &#8230;
                </button>
              );
            }

            return (
              <button
                type="button"
                className={classNames(
                  'pagination__item pagination__btn',
                )}
                key={button}
                onClick={() => onPageChange(button)}
                disabled={button === currPage}
              >
                {button}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className={classNames(
            'pagination__next-btn pagination__btn',
          )}
          onClick={nextPage}
          disabled={isLastButton}
        >
          {'>>'}
        </button>
      </nav>

      <div className="pagination__settings">
        <p className="pagination__settings-title">
          Items on a page:
        </p>
        <select
          className="pagination__select pagination__btn"
          value={perPage}
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
