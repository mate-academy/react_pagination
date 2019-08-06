import React from 'react';
import propTypes from 'prop-types';

const Navigation = ({ todosInPages, activePage, changeActivePage }) => (
  <ul className="navigation">
    <li>
      <button
        type="button"
        onClick={() => changeActivePage(activePage - 1)}
        disabled={activePage === 1}
        className="navigation-but"
      >
        {`<-`}
      </button>
    </li>
    {
      todosInPages.map(page => (
        <li>
          <button
            type="button"
            onClick={() => changeActivePage(page.pageNumber)}
            disabled={page.pageNumber === activePage}
            className="navigation-but"
          >
            {page.pageNumber}
          </button>
        </li>
      ))
    }

    <li>
      <button
        type="button"
        onClick={() => changeActivePage(activePage + 1)}
        disabled={activePage === todosInPages.length}
        className="navigation-but"
      >
        {`->`}
      </button>
    </li>
  </ul>
);

Navigation.propTypes = {
  todosInPages: propTypes.shape().isRequired,
  activePage: propTypes.number.isRequired,
  changeActivePage: propTypes.func.isRequired,
};

export default Navigation;
