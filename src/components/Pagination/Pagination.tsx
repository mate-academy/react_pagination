interface Props {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}: Props) => {
  const countPages = Math.ceil(total / perPage);
  // Для случая total === 0 показываем хотя бы 1 страницу в UI
  const arrayPages =
    countPages === 0
      ? [1]
      : Array.from({ length: countPages }, (_, i) => i + 1);
  const isFirstPage = currentPage === 1;
  const isLastPage = countPages === 0 || currentPage >= countPages;

  // Показываем пагинацию только если больше 1 страницы И есть элементы
  if (countPages === 1 && total > 0) {
    return null;
  }

  return (
    <ul className="pagination">
      <li className={`page-item ${isFirstPage ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          {...(isFirstPage && { 'aria-disabled': 'true' })}
          onClick={e => {
            e.preventDefault();
            if (!isFirstPage) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {arrayPages.map(item => (
        <li
          className={`page-item ${currentPage === item ? 'active' : ''}`}
          key={item}
          onClick={e => {
            e.preventDefault();
            // Не переключаем страницы если нет элементов или уже на нужной странице
            if (item !== currentPage && total > 0) {
              onPageChange(item);
            }
          }}
        >
          <a data-cy="pageLink" className="page-link" href={`#${item}`}>
            {item}
          </a>
        </li>
      ))}
      <li className={`page-item ${isLastPage ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          {...(isLastPage && { 'aria-disabled': 'true' })}
          onClick={e => {
            e.preventDefault();
            if (!isLastPage) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
