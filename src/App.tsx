import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { useSearchParams } from 'react-router-dom';

// ===============================================================
// in build/TODO premium version:
// change related to the integration of React Router
// you can use commented code below instead but import { useState }
// ===============================================================

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || 5;

  const total = items.length;

  const startIndex = (page - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, total);
  const visibleItems = items.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setSearchParams({
      page: String(newPage),
      perPage: String(perPage),
    });
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      page: '1',
      perPage: event.target.value,
    });
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {page} (items {startIndex + 1} - {endIndex} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            className="form-control"
            id="perPageSelector"
            value={perPage}
            onChange={handlePerPageChange}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={total}
        perPage={perPage}
        currentPage={page}
        onPageChange={handlePageChange}
      />

      <ul>
        {visibleItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const items = getNumbers(1, 42).map(n => `Item ${n}`);

// export const App: React.FC = () => {
//   const [page, setPage] = useState(1);
//   const [perPage, setPerPage] = useState(5);

//   const total = items.length;

//   const startIndex = (page - 1) * perPage;
//   const endIndex = Math.min(startIndex + perPage, total);
//   const visibleItems = items.slice(startIndex, endIndex);

//   const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setPerPage(Number(event.target.value));
//     setPage(1);
//   };

//   return (
//     <div className="container">
//       <h1>Items with Pagination</h1>

//       <p className="lead" data-cy="info">
//         Page {page} (items {startIndex + 1} - {endIndex} of {total})
//       </p>

//       <div className="form-group row">
//         <div className="col-3 col-sm-2 col-xl-1">
//           <select
//             data-cy="perPageSelector"
//             id="perPageSelector"
//             className="form-control"
//             value={perPage}
//             onChange={handlePerPageChange}
//           >
//             <option value="3">3</option>
//             <option value="5">5</option>
//             <option value="10">10</option>
//             <option value="20">20</option>
//           </select>
//         </div>

//         <label htmlFor="perPageSelector" className="col-form-label col">
//           items per page
//         </label>
//       </div>

//       <Pagination
//         total={total}
//         perPage={perPage}
//         currentPage={page}
//         onPageChange={newPage => setPage(newPage)}
//       />

//       <ul>
//         {visibleItems.map(item => (
//           <li key={item} data-cy="item">
//             {item}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

export default App;
