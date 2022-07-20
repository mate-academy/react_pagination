import classNames from 'classnames';
import React, { useState } from 'react';

interface Props {
  total: number
  perPage: number
  pages: number
}

export const Paginator: React.FC<Props> = ({ total, perPage, pages }) => {
  const [selPage, setSelPage] = useState(0);

  const arrPage = Array.from(Array(pages).keys());

  return (
    <>
      <h1>
        {`${(perPage * (selPage + 1)) - perPage + 1} - ${

          (perPage * (selPage + 1) > total ? total : perPage * (selPage + 1))} of ${total}`}

      </h1>

      <nav aria-label="...">
        <ul className="pagination">
          <li className={classNames(
            'page-item', {
              disabled: selPage === 0,
            },
          )}
          >
            <button
              type="button"
              className="page-link"
              onClick={() => setSelPage(prevSelPage => prevSelPage - 1)}
            >
              Previous
            </button>
          </li>
          {arrPage.map(page => (
            <li className="page-item" key={page}>
              <button
                type="button"
                className={classNames(
                  'page-link', {
                    active: selPage === page,
                  },
                )}
                onClick={() => setSelPage(page)}
              >
                {page + 1}
              </button>
            </li>
          ))}
          <li className={classNames(
            'page-item', {
              disabled: selPage === pages - 1,
            },
          )}
          >
            <button
              type="button"
              className="page-link"
              onClick={() => setSelPage(prevSelPage => prevSelPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};
