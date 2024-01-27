import React, { useMemo, useState } from 'react';

const initialValues = {
  startIndex: 0,
  endIndex: 5,
  total: 42,
  perPage: 5,
  pages: 9,
  currentPage: 1,
  setTotal: () => {},
  setCurrentPage: () => {},
  setItemsPerPage: () => {},
};

export const PageContext
  = React.createContext<PageContextValue>(initialValues);

type Props = {
  children: React.ReactNode,
};

interface PageContextValue {
  startIndex: number,
  endIndex: number,
  pages: number,
  total: number,
  perPage: number,
  currentPage: number,
  setTotal: React.Dispatch<React.SetStateAction<number>>,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>,
}

export const PageProvider: React.FC<Props> = ({ children }) => {
  const [total, setTotal] = useState(initialValues.total);
  const [itemsPerPage, setItemsPerPage] = useState(initialValues.perPage);
  const [currentPage, setCurrentPage] = useState(initialValues.currentPage);

  const value = useMemo(() => ({
    startIndex: (currentPage - 1) * itemsPerPage,
    endIndex: (currentPage - 1) * itemsPerPage + itemsPerPage,
    pages: Math.max(Math.ceil(total / itemsPerPage), 1),
    total,
    perPage: itemsPerPage,
    currentPage,
    setTotal,
    setCurrentPage,
    setItemsPerPage,
  }), [total, itemsPerPage, currentPage, setCurrentPage, setItemsPerPage]);

  return (
    <PageContext.Provider value={value}>
      {children}
    </PageContext.Provider>
  );
};
