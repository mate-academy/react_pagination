import classNames from 'classnames';
import React from 'react';
import './Pagination.scss';

type Props = {
  total: number;
  perPage: number;
  page: number;
  onPageChange: (number: number) => void;
  onClickNextButton: () => void;
  onclickPrevButton: () => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  page,
  onPageChange,
  onClickNextButton,
  onclickPrevButton,
}) => {
  const pageQuantity = Math.ceil(total / perPage);
  const startRange = perPage * (page - 1) + 1;
  const endRange = pageQuantity === page ? total : page * perPage;
  const isHiddenButton = (value: number) => (value !== 1
  && value !== page
  && value !== page + 1
  && value !== page - 1
  && value < pageQuantity);

  const arrTotal = [];

  for (let i = 1; i <= pageQuantity; i += 1) {
    arrTotal.push(i);
  }

  return (
    <>
      <nav className="navigation">
        <h3>{`${startRange} - ${endRange} of ${total}`}</h3>

        <ul className="pagination">
          <li className="pagination__item">
            <button
              type="button"
              className="pagination__button"
              disabled={page === 1}
              onClick={onclickPrevButton}
            >
              &laquo;
            </button>
          </li>

          {arrTotal.map(number => (
            <>
              {(number === page + 2 || number === page - 2) && (
                <li key={`spread-${number}`} className="pagination__item">
                  <button
                    type="button"
                    className="
                    pagination__button
                    pagination__button-spread"
                    hidden={number === page - 2
                      ? page < 4
                      : page >= pageQuantity - 2}
                  >
                    ...
                  </button>
                </li>
              )}

              <li key={`item-${number}`} className="pagination__item">
                <button
                  type="button"
                  className={classNames(
                    'pagination__button',
                    { active: page === number },
                  )}
                  hidden={isHiddenButton(number)}
                  onClick={() => onPageChange(number)}
                >
                  {number}
                </button>
              </li>
            </>
          ))}

          <li className="pagination__item">
            <button
              type="button"
              className="pagination__button"
              disabled={page === pageQuantity}
              onClick={onClickNextButton}
            >
              &raquo;
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};
