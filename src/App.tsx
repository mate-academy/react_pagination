import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination/Pagination';
import { Settings } from './components/Settings/Settings';

const App: React.FC = () => {
  const [totalElements, setTotalElements] = useState<number>(42);
  const [elementsPerPage, setElementsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [withInfo, setWithInfo] = useState<boolean>(true);

  return (
    <div className="App">
      <h1>Pagination</h1>
      <Pagination
        total={totalElements}
        perPage={elementsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        withInfo={withInfo}
      />
      <Settings
        totalElements={totalElements}
        setTotalElements={setTotalElements}
        elementsPerPage={elementsPerPage}
        setElementsPerPage={setElementsPerPage}
        withInfo={withInfo}
        setWithInfo={setWithInfo}
      />
    </div>
  );
};

export default App;
