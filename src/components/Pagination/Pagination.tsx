import { getNumbers } from '../../utils';

interface IPagination {
  perPage: number;
  total: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  getCurrentItems: () => string[];
}

export const Pagination = ({ page, setPage, perPage, total, getCurrentItems }: IPagination) => {

  // Número total de páginas
  const listNumbers = Math.ceil(total / perPage);

  // Geração dos números de páginas
  const pageNumbers = getNumbers(1, listNumbers);

  // Função para obter os itens da página atual


  // Mudar para a próxima página
  const goToNextPage = () => setPage((prev) => Math.min(prev + 1, listNumbers));

  // Mudar para a página anterior
  const goToPreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));

  // Mudar para uma página específica
  const goToPage = (pageNumber: number) => setPage(pageNumber);

  return (
    <div>
      {/* Navegação da paginação */}
      <ul className="pagination">
        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={page === 1}
            onClick={(e) => {
              e.preventDefault();
              goToPreviousPage();
            }}
          >
            «
          </a>
        </li>

        {/* Renderizando números das páginas */}
        {pageNumbers.map(pageNumber => (
          <li key={pageNumber} className={`page-item ${pageNumber === page ? 'active' : ''}`}>
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${pageNumber}`}
              onClick={(e) => {
                e.preventDefault();
                goToPage(pageNumber);
              }}
            >
              {pageNumber}
            </a>
          </li>
        ))}

        <li className={`page-item ${page === listNumbers ? 'disabled' : ''}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={page === listNumbers}
            onClick={(e) => {
              e.preventDefault();
              goToNextPage();
            }}
          >
            »
          </a>
        </li>
      </ul>

      {/* Renderizando itens da página atual */}
      <ul>
        {getCurrentItems().map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
