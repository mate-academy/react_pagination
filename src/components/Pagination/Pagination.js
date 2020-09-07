import React, { useState } from 'react';
import './Pagination.css';

const listFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const Pagination = () => {
  const [wholeList] = useState(
    listFromServer.map((li, i) => `${i + 1}. ${li}`),
  );
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const getVisibleList = () => {
    const visibleList = [];

    for (let counter = 0, i = perPage * (currentPage - 1);
      counter < perPage;
      counter += 1, i += 1) {
      if (wholeList[i]) {
        visibleList.push(wholeList[i]);
      }
    }

    return visibleList;
  };

  const getButtons = () => {
    const buttons = [];

    for (let i = 1; i <= wholeList.length / perPage; i += 1) {
      buttons.push(
        <button
          type="button"
          key={i}
          className={i === currentPage
            ? 'button button--selected'
            : 'button'}
          onClick={switchPage}
        >
          {i}
        </button>,
      );
    }

    return buttons;
  };

  const changePerPage = (event) => {
    setPerPage(event.target.value);
    setCurrentPage(1);
  };

  const switchPage = (event) => {
    switch (event.target.textContent) {
      case '< Назад': setCurrentPage(currentPage - 1); break;
      case 'Далее >': setCurrentPage(currentPage + 1); break;
      default: setCurrentPage(Number(event.target.innerText));
    }
  };

  return (
    <section className="pagination">
      <select className="set-per-page" defaultValue={10}>
        <option value={5} onClick={changePerPage}>5</option>
        <option value={10} onClick={changePerPage}>10</option>
        <option value={20} onClick={changePerPage}>20</option>
      </select>

      <ul className="list">
        {getVisibleList()
          .map(li => <li key={parseInt(li, 10)}>{li}</li>)
        }
      </ul>

      <nav>
        {currentPage !== 1 && (
          <button
            type="button"
            className="button side-button"
            onClick={switchPage}
          >
            {'< Назад'}
          </button>
        )}

        {getButtons().filter((button, i, arr) => (
          i === 0
          || i === currentPage - 2
          || i === currentPage - 1
          || i === currentPage
          || i === arr.length - 1
          || (currentPage === 1 && i === 2)
          || (currentPage === 1 && i === 3)
          || (currentPage === 2 && i === 3)
          || (currentPage === arr.length
            && i === arr.length - 3)
          || (currentPage === arr.length
            && i === arr.length - 4)
          || (currentPage === arr.length - 1
            && i === arr.length - 4)
        ))}

        {currentPage !== wholeList.length / perPage && (
          <button
            type="button"
            className="button side-button"
            onClick={switchPage}
          >
            {'Далее >'}
          </button>
        )}
      </nav>
    </section>
  );
};

export default Pagination;
