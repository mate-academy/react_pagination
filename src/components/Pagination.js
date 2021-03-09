import React from 'react';
import className from 'classnames';
import PropTypes from 'prop-types';

export const Pagination = ({
  totalPosts,
  perPage,
  selectedPage,
  onPageChange,
  onNext,
  onPrev,
  onPerPageChange,
}) => {
  const availableButtons = Array(Math.ceil(totalPosts.length / perPage))
    .fill(1)
    .map((el, index) => el + index);
  let visibleButtons;

  function createNavigationLi(num, key) {
    return (
      <li
        key={key}
        className={className(
          'page-item',
          { active: +selectedPage === num },
        )}
      >
        <a
          className="page-link"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onPageChange(e);
          }}
        >
          {num}
        </a>
      </li>
    );
  }

  function createButtonLi(disable, label, btnSymbol, eventCallback) {
    return (
      <li
        className={className(
          'page-item',
          { disabled: +selectedPage === disable },
        )}
      >
        <a
          className="page-link"
          href="/"
          aria-label={label}
          onClick={(e) => {
            e.preventDefault();
            eventCallback();
          }}
        >
          <span aria-hidden="true">{btnSymbol}</span>
        </a>
      </li>
    );
  }

  function createVisibleButtons() {
    if (availableButtons.length > 3) {
      if (+selectedPage <= 3) {
        visibleButtons = (
          <>
            {
              availableButtons.filter(el => el < +selectedPage + 2)
                .map(btn => createNavigationLi(btn, btn))
            }
            {createNavigationLi('...')}
            {createNavigationLi(availableButtons.length)}
          </>
        );
      }

      if (+selectedPage >= 4) {
        visibleButtons = (
          <>
            {createNavigationLi(1)}
            {createNavigationLi('...')}
            {
              [...availableButtons]
                .slice(2, availableButtons.length - 2)
                .filter(
                  el => el >= +selectedPage - 1 && el <= +selectedPage + 1,
                ).map(btn => createNavigationLi(btn, btn))
            }
            {createNavigationLi('...')}
            {createNavigationLi(availableButtons.length)}
          </>
        );
      }

      if (+selectedPage >= availableButtons.length - 2) {
        visibleButtons = (
          <>
            {createNavigationLi(1)}
            {createNavigationLi('...')}
            {
              availableButtons.filter(el => el > +selectedPage - 2)
                .map(btn => createNavigationLi(btn, btn))
            }
          </>
        );
      }
    } else {
      visibleButtons = (
        <>
          {availableButtons.map(btn => createNavigationLi(btn, btn))}
        </>
      );
    }

    return visibleButtons;
  }

  return (
    <>
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          {createButtonLi(1, 'Previous', '«', onPrev)}
          {createVisibleButtons()}
          {createButtonLi(+availableButtons.length, 'Next', '»', onNext)}
        </ul>
      </nav>

      <select onClick={e => onPerPageChange(e)} defaultValue={5}>
        <option>3</option>
        <option>5</option>
        <option>10</option>
        <option>20</option>
      </select>
    </>
  );
};

Pagination.propTypes = {
  totalPosts: PropTypes.arrayOf(PropTypes.number).isRequired,
  perPage: PropTypes.number,
  selectedPage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onPerPageChange: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  perPage: 5,
  selectedPage: 1,
};
