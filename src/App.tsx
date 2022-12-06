import { useState, FC } from 'react';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';
import './App.css';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: FC = () => {
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const perPageOptions = [3, 5, 10, 20];
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = items.slice(indexOfFirstRecord,
    indexOfLastRecord);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setCurrentPage(1);
    setRecordsPerPage(+value);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${indexOfFirstRecord + 1}`
        + ` - ${indexOfLastRecord > items.length ? items.length : indexOfLastRecord}`
        + ` of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={recordsPerPage}
            onChange={handleSelect}
          >
            {perPageOptions.map(itemsOnPage => (
              <option value={itemsOnPage} key={itemsOnPage}>
                {itemsOnPage}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        total={items.length}
        perPage={recordsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <ul>
        {currentRecords.map(record => (
          <li data-cy="item" key={record}>{record}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
