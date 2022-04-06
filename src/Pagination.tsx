/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import classNames from 'classnames';

interface Props {
  total: number,
  perPage: number,
  page: number,
  onPageChange: (presentPage: number) => void,
  onPrevBtn: (presentPage: number) => void,
  onNextBtn: (presentPage: number) => void,
}

const Pagination: React.FC<Props> = ({
  total,
  perPage,
  page,
  onPageChange,
  onPrevBtn,
  onNextBtn,
}) => {
  // Make an Array of numbers from the total variable
  const fromNumToArr = () => {
    const arrOfNumbers: number[] = [];

    for (let i = 1; i <= Math.ceil(total / perPage); i += 1) {
      arrOfNumbers.push(i);
    }

    return arrOfNumbers;
  };

  // Array of numbers which display pagination buttons
  const displayPagination = fromNumToArr();

  return (
    <nav
      aria-label="Page navigation example"
      className="nav-bar"
    >
      <ul className="pagination">

        <a
          href="#"
          aria-label="Previous"
          className={classNames('pagination__prev', {
            disabled: page <= 1,
          })}
          onClick={() => onPrevBtn(page)}
        >
          <span aria-hidden="true">&laquo;</span>
        </a>

        {displayPagination.map(el => (
          <li
            key={el}
            className={classNames('pagination__item', {
              active: el === page,
            })}
          >
            <a
              href="#"
              className="pagination__link"
              onClick={() => onPageChange(el)}
            >
              {el}
            </a>
          </li>
        ))}

        <a
          className={classNames('pagination__next', {
            disabled: page >= 9,
          })}
          href="#"
          aria-label="Next"
          onClick={() => onNextBtn(page)}
        >
          <span aria-hidden="true">&raquo;</span>
        </a>

      </ul>
    </nav>
  );
};

export default Pagination;
