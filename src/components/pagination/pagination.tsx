// import React from 'react';
import React, { useState } from 'react';
import { PaginationUl } from '../PaginationUl/PaginationUl';
import './pagination.scss';

export const Pagination: React.FC = () => {
  const totalElements = 42;
  const varElementsPerPage = [3, 5, 10, 20];
  const [elementsOnPage, setElementsOnPage] = useState(5);
  const [selectedPage, setselectedPage] = useState(1);
  const totalPages = Math.ceil(totalElements / elementsOnPage);

  // eslint-disable-next-line no-console
  console.log(totalElements, elementsOnPage, totalPages, setselectedPage);
  const handlElementsPerPageChange
  = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setElementsOnPage(+event.target.value);
    setselectedPage(1);
  };

  return (
    <div className="pagination">
      {/* <h1>Pagination111</h1> */}
      <p className="pagination__text">
        {elementsOnPage * selectedPage
         - (elementsOnPage - 1)}
        {' - '}
        { totalElements < elementsOnPage * selectedPage
          ? totalElements : elementsOnPage * selectedPage}
        {` of ${totalElements}`}
      </p>
      <PaginationUl
        selectedPage={selectedPage}
        setselectedPage={setselectedPage}
        totalElements={totalElements}
        totalPages={totalPages}
      />
      <h3>Amount of elements per Page</h3>
      <select
        className="pagination__select"
        value={elementsOnPage}
        onChange={handlElementsPerPageChange}
      >
        {varElementsPerPage.map(elem => (
          <option key={elem} value={elem}>{elem}</option>))}
      </select>
    </div>
  );
};
