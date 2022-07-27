import React, { useEffect, useState } from 'react';
import './App.css';
import Pagination from './components/Pagination';

const App: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems] = useState(42);
  const [info, setInfo] = useState(`${1}-${itemsPerPage} of ${totalItems}`);

  const handlePageChange = (pageFromComponent: number) => {
    setSelectedPage(pageFromComponent);
  };

  const handlePerPageChange = (perPageFromComponent: number) => {
    setItemsPerPage(perPageFromComponent);
  };

  const updateInfo = () => {
    for (let i = 1; i < totalItems; i += 1) {
      const start = selectedPage * itemsPerPage - (itemsPerPage - 1);
      const finish = ((selectedPage * itemsPerPage) < totalItems)
        ? selectedPage * itemsPerPage
        : totalItems;

      setInfo(`${start}-${finish} of ${totalItems}`);
    }
  };

  useEffect(() => {
    updateInfo();
  });

  return (
    <div>
      <h1>Pagination</h1>

      <Pagination
        total={totalItems}
        perPage={itemsPerPage}
        page={selectedPage}
        handlePageChange={handlePageChange}
        handlePerPageChange={handlePerPageChange}
        withInfo={info}
      />
    </div>
  );
};

export default App;
