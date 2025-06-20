import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, useSearchParams } from 'react-router-dom';

const getNumbers = (start: number, end: number): number[] => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pageNumbers = getNumbers(1, totalPages);

  const handleClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul
      className="flex justify-center items-center
      space-x-2 pagination font-sans mt-8"
    >
      {/* Botão "Anterior" */}
      <li
        className={`page-item rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <a
          data-cy="prevLink"
          className={`page-link block py-2 px-4 bg-blue-500 text-white rounded-lg transition duration-300 ease-in-out hover:bg-blue-600 ${
            currentPage === 1
              ? 'bg-gray-400 hover:bg-gray-400 pointer-events-none'
              : ''
          }`}
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={handlePrevClick}
        >
          «
        </a>
      </li>
      {/* Números das páginas */}
      {pageNumbers.map(number => (
        <li
          key={number}
          className={`page-item rounded-lg ${currentPage === number ? 'shadow-inner' : ''}`}
        >
          <a
            data-cy="pageLink"
            // AQUI ESTAVA O ERRO! Expressão ternária duplicada removida.
            // Antes: ${currentPage === number ? 'bg-blue-700 text-white font-bold' : 'bg-blue-500 text-white hover:bg-blue-600'}
            //          ? 'bg-blue-700 text-white font-bold'
            //          : 'bg-blue-500 text-white hover:bg-blue-600'}`
            // Agora:
            className={`page-link block py-2 px-4 rounded-lg transition duration-300 ease-in-out ${
              currentPage === number ? 'bg-blue-700 text-white font-bold' : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            href={`#${number}`}
            onClick={() => handleClick(number)}
          >
            {number}
          </a>
        </li>
      ))}

      {/* Botão "Próximo" */}
      <li
        className={`page-item rounded-lg
        ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <a
          data-cy="nextLink"
          className={`page-link block py-2 px-4 bg-blue-500 text-white
            rounded-lg transition duration-300 ease-in-out hover:bg-blue-600
            ${currentPage === totalPages ? 'bg-gray-400 hover:bg-gray-400 pointer-events-none' : ''}
          `}
          href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={handleNextClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};

const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const initialPerPage = parseInt(searchParams.get('perPage') || '5', 10);

  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [perPage, setPerPage] = useState<number>(initialPerPage);

  const totalItems = 42;
  const items = getNumbers(1, totalItems).map(n => `Item ${n}`);

  useEffect(() => {
    const params = new URLSearchParams();

    if (currentPage !== 1) {
      params.set('page', String(currentPage));
    }

    if (perPage !== 5) {
      params.set('perPage', String(perPage));
    }

    setSearchParams(params);
  }, [currentPage, perPage, setSearchParams]); // Dependências do useEffect

  const handlePageChange = useCallback(
    (page: number) => {
      if (page !== currentPage) {
        setCurrentPage(page);
      }
    },
    [currentPage],
  );

  const handlePerPageChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newPerPage = parseInt(event.target.value, 10);

      setPerPage(newPerPage);
      setCurrentPage(1);
    },
    [],
  );

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, totalItems);
  // Extrai os itens que devem ser exibidos na página atual.
  const currentItems = items.slice(startIndex, endIndex);

  // Constrói o texto informativo da paginação, ex: "Página 1 (itens 1 - 5 de 42)".
  const startItemNumber = startIndex + 1;
  const endItemNumber = endIndex;
  const infoText = `Page ${currentPage} (items ${startItemNumber} - ${endItemNumber} of ${totalItems})`;

  return (
    <div
      className="min-h-screen bg-gray-100
      flex flex-col items-center py-8 font-sans"
    >
      <div
        className="container max-w-4xl mx-auto
        p-6 bg-white shadow-lg rounded-xl"
      >
        <h1
          className="text-3xl font-bold
          text-gray-800 mb-6 text-center"
        >
          Items with Pagination
        </h1>

        <p
          className="lead text-lg text-gray-600 mb-6
          text-center"
          data-cy="info"
        >
          {infoText}
        </p>

        <div className="flex items-center space-x-4 mb-8 justify-center">
          <div className="relative inline-block w-48">
            <select
              data-cy="perPageSelector"
              id="perPageSelector"
              className="block appearance-none w-full bg-white
              border border-gray-300 hover:border-gray-400 px-4 py-2
              pr-8 rounded-lg shadow leading-tight focus:outline-none
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
              text-gray-700"
              value={perPage}
              onChange={handlePerPageChange}
            >
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
            <div
              className="pointer-events-none absolute
              inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657
                  8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
          <label htmlFor="perPageSelector" className="text-lg text-gray-700">
            itens por página
          </label>
        </div>

        {/* Componente Pagination:
            Ele recebe as props necessárias para exibir os controles de paginação.
            O `onPageChange` é o callback que o App usa para saber quando a página foi alterada.
        */}
        <Pagination
          total={totalItems}
          perPage={perPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />

        {/* Exibe os itens da página atual */}
        <ul className="list-disc pl-5 mt-8 space-y-2 text-gray-800">
          {currentItems.map((item, index) => (
            <li key={startIndex + index} data-cy="item" className="text-lg">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// --- Componente Wrapper para React Router ---
// Este componente envolve o `App` com o `BrowserRouter` (renomeado para `Router`)
// para que os hooks de roteamento (como `useSearchParams`) funcionem corretamente.
const WrappedApp: React.FC = () => (
  <Router>
    <App />
  </Router>
);

// Exporta o WrappedApp como o componente padrão.
export default WrappedApp;
