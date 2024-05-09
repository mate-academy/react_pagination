import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

function getButtons(total: number, perPage: number) {
  const numberButtons = Math.ceil(total / perPage);
  const arr: number[] = [];

  for (let i = 1; i <= numberButtons; i++) {
    arr.push(i);
  }

  return arr;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  return (
    <ul className="pagination">
      <li className="page-item disabled">
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled="true"
          data-page={currentPage - 1}
          onClick={event =>
            onPageChange(
              parseInt((event.target as HTMLAnchorElement).dataset.page ?? '1'),
            )
          }
        ></a>
      </li>
      {getButtons(total, perPage).map((buttonNumber: number) => (
        <li className="page-item active" key={buttonNumber}>
          <a
            data-cy="pageLink"
            className="page-link"
            href="#{buttonNumber}"
            data-page={buttonNumber}
            onClick={event =>
              onPageChange(
                parseInt(
                  (event.target as HTMLAnchorElement).dataset.page ?? '1',
                ),
              )
            }
          >
            {buttonNumber}
          </a>
        </li>
      ))}

      <li className="page-item">
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
          data-page={currentPage + 1}
          onClick={event =>
            onPageChange(
              parseInt((event.target as HTMLAnchorElement).dataset.page ?? '1'),
            )
          }
        >
          »
        </a>
      </li>
    </ul>
  );
};
