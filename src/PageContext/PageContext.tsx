import React, { useMemo, useState } from 'react';

const initialValues = {
  total: 42,
  perPage: 5,
  currentPage: 1,
  setCurrentPage: () => {},
};

export const PageContext
  = React.createContext<PageContextValue>(initialValues);

type Props = {
  children: React.ReactNode,
};

interface PageContextValue {
  total: number,
  perPage: number,
  currentPage: number,
  setCurrentPage: (page: number) => void,
}

export const PageProvider: React.FC<Props> = ({ children }) => {
  const [total, setTotal] = useState(initialValues.total);
  const [perPage, setPerPage] = useState(initialValues.perPage);
  const [currentPage, setCurrentPage] = useState(initialValues.currentPage);

  const value = useMemo(() => ({
    total,
    perPage,
    currentPage,
    setCurrentPage,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [total, perPage, currentPage]);

  return (
    <PageContext.Provider value={value}>
      {children}
    </PageContext.Provider>
  );
};
