type Props = {
  items: string[];
  perPageSelector: string;
  selectedPage: number;
  setSelectedPage: React.Dispatch<React.SetStateAction<number>>;
};

export const Pagination: React.FC<Props> = (
  {
    items,
    perPageSelector,
    selectedPage,
    setSelectedPage,
  },
) => {
  const numberOfPages = Math.ceil(items.length / Number(perPageSelector));

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${selectedPage === 1 && 'disabled'}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
            onClick={() => {
              if (selectedPage === 1) {
                return;
              }

              setSelectedPage(prev => prev - 1);
            }}
          >
            «
          </a>
        </li>
        {
          items
            .filter((_, index) => index < numberOfPages)
            .map((el, index) => (
              <li
                className={`page-item ${selectedPage === index + 1 && 'active'}`}
                key={el}
              >
                <a
                  data-cy="pageLink"
                  className="page-link"
                  href={`#${index + 1}`}
                  onClick={() => {
                    setSelectedPage(index + 1);
                  }}
                >
                  {index + 1}
                </a>
              </li>
            ))
        }
        <li className={`page-item ${selectedPage === numberOfPages && 'disabled'}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
            onClick={() => {
              if (selectedPage === numberOfPages) {
                return;
              }

              setSelectedPage(prev => prev + 1);
            }}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
