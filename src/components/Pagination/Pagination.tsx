import classNames from 'classnames';

interface PaginationProps {
  total: string[]; // Тепер це масив елементів, а не число
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = Math.ceil(total.length / perPage); // Загальна кількість сторінок
  const pageNumbers = Array.from({ length: pages }, (_, index) => index + 1);

  // Визначаємо індекси елементів для поточної сторінки
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, total.length);

  // Масив елементів для поточної сторінки
  const currentItems = total.slice(startIndex, endIndex); // Вибірка елементів на поточній сторінці

  return (
    <>
      <ul className="pagination">
        {/* Кнопка "Попередня сторінка" */}
        <li
          className={classNames('page-item', { disabled: currentPage === 1 })}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
          >
            «
          </a>
        </li>

        {/* Рендер сторінок */}
        {pageNumbers.map(page => (
          <li
            className={classNames('page-item', {
              active: page === currentPage,
            })}
            key={page}
            onClick={() => onPageChange(page)}
          >
            <a data-cy="pageLink" className="page-link" href={`#${page}`}>
              {page}
            </a>
          </li>
        ))}

        {/* Кнопка "Наступна сторінка" */}
        <li
          className={classNames('page-item', {
            disabled: currentPage === pages,
          })}
          onClick={() => currentPage < pages && onPageChange(currentPage + 1)}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pages}
          >
            »
          </a>
        </li>
      </ul>

      {/* Відображення елементів для поточної сторінки */}
      <ul>
        {currentItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
