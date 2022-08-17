import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: CallableFunction,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const lastPageId = Math.ceil(total / perPage);
  const handlePageChange = (step:number) => {
    onPageChange((prevPage: number) => prevPage + step);
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled="true"
          onClick={() => {
            // eslint-disable-next-line
            console.log('click');
            handlePageChange(-1);
          }}
        >
          «
        </a>
      </li>
      {getNumbers(1, lastPageId).map(number => (
        <li
          className={`page-item ${number === currentPage ? 'active' : ''}`}
          key={`elem${number}`}
        >
          <a
            href={`#${number}`}
            data-cy="pageLink"
            className="page-link"
            onClick={() => {
              handlePageChange(+number - currentPage);
            }}
          >
            {number}
          </a>
        </li>
      ))}
      <li className={`page-item ${currentPage === lastPageId ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
          onClick={() => {
            // eslint-disable-next-line
            console.log(currentPage === lastPageId);
            handlePageChange(1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
