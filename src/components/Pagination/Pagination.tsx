import cn from 'classnames';

type Props = {
  items: string[],
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: React.Dispatch<React.SetStateAction<number>>,
};

export const Pagination = ({
  items,
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}: Props) => {
  const pages = [];

  for (let i = 0; i < total; i += perPage) {
    pages.push(items.slice(
      i,
      i + perPage < total ? i + perPage : total,
    ));
  }

  const getRandKey = (name:string, num: number) => {
    return `${name}_${num}_${Math.floor(Math.random() * 100)}`;
  };

  return (
    <>
      <ul className="pagination">
        <li className={cn(
          'page-item',
          { disabled: currentPage === 1 },
        )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={(e) => {
              if (currentPage !== 1) {
                onPageChange(prevState => prevState - 1);
              } else {
                e.preventDefault();
              }
            }}
          >
            «
          </a>
        </li>
        {pages.map((_el, i) => (
          <li
            key={getRandKey('pageLink', i)}
            className={`page-item${i === currentPage - 1 ? ' active' : ''}`}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${i + 1}`}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(i + 1);
              }}
            >
              {i + 1}
            </a>
          </li>
        ))}
        <li className={cn(
          'page-item',
          { disabled: currentPage === pages.length },
        )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pages.length}
            onClick={(e) => {
              if (currentPage !== pages.length) {
                onPageChange(prevState => prevState + 1);
              } else {
                e.preventDefault();
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {pages[currentPage - 1].map((pageItem, i) => (
          <li data-cy="item" key={getRandKey('item', i)}>
            {pageItem}
          </li>
        ))}
      </ul>
    </>
  );
};
