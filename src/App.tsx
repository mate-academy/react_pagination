import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from './components/Pagination';

const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const perPage = parseInt(searchParams.get('perPage') || '5', 10);
  const totalItems = 42;

  const handlePageChange = (page: number) => {
    setSearchParams(prevParams => {
      const newSearchParams = new URLSearchParams(prevParams);

      newSearchParams.set('page', page.toString());

      return newSearchParams;
    });
  };

  const handlePerPageChange = (newPerPage: number) => {
    setSearchParams(prevParams => {
      const newSearchParams = new URLSearchParams(prevParams);

      newSearchParams.set('perPage', newPerPage.toString());
      newSearchParams.set('page', '1');

      return newSearchParams;
    });
  };

  return (
    <div>
      <Pagination
        total={totalItems}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
      />
    </div>
  );
};

export default App;
