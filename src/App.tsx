import React from 'react';
import './App.css';
import { useState } from 'react';
import { getNumbers } from './utils';

import { Options } from './components/Options';
import { Pagination } from './components/Pagination';
import { Items } from './components/Items';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const totalItems = 42;
const items = getNumbers(1, totalItems).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [isActiveOption, setIsActiveOption] = useState<number>(5);
  const [isActivePage, setIsActivePage] = useState<number>(1);

  const startItemToShow = isActivePage * isActiveOption - isActiveOption;
  const lastItemToShow =
    isActivePage * isActiveOption <= 42 ? isActivePage * isActiveOption : 42;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${isActivePage} (items ${startItemToShow + 1} - ${lastItemToShow} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <Options
            active={isActiveOption}
            activePage={isActivePage}
            onChangePage={setIsActivePage}
            onChangeOption={setIsActiveOption}
          />
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={totalItems}
        perPage={isActiveOption}
        currentPage={isActivePage}
        onPageChange={setIsActivePage}
      />

      <Items
        activePage={isActivePage}
        itemsPerPage={isActiveOption}
        total={items}
      />
    </div>
  );
};

export default App;
