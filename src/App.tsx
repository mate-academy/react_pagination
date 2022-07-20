import { FC, useState } from 'react';

import './App.scss';

import { Pagination } from './components/Pagination';

const App: FC = () => {
  const [page, setPage] = useState(1);
  const total = 42;

  return (
    <Pagination
      total={total}
      page={page}
      setPage={setPage}
      withInfo
    />
  );
};

export default App;
