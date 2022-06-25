import { useEffect, useState } from 'react';

type Props = {
  total: number;
  onSelect: (id: number) => void;
};

export const Pagination: React.FC <Props> = ({ total, onSelect }) => {
  const pages = [];
  const [selectedPage, setSelectedPage] = useState(1);

  useEffect(() => {
    onSelect(selectedPage - 1);
  }, [selectedPage]);

  for (let i = 1; i <= total; i += 1) {
    pages.push(i);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <button
            className="page-link"
            aria-label="Previous"
            type="button"
            onClick={() => {
              if (selectedPage === 1) {
                return;
              }

              setSelectedPage((prev) => {
                const current = prev - 1;

                return current;
              });
            }}
            disabled={selectedPage === 1}
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        <li>
          <ul className="pagination">
            {pages.map((page) => (
              <li className="page-item">
                <button
                  type="button"
                  className={
                    selectedPage === page ? 'page-link active' : 'page-link'
                  }
                  onClick={() => {
                    setSelectedPage(page);
                  }}
                >
                  {page}
                </button>
              </li>
            ))}
          </ul>
        </li>
        <li className="page-item">
          <button
            className="page-link"
            aria-label="Next"
            type="button"
            onClick={() => {
              setSelectedPage((prev) => {
                const current = prev + 1;

                return current;
              });
            }}
            disabled={selectedPage === total}
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};
