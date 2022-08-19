import classNames from 'classnames';
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
  const pageAmount = Math.ceil(total / perPage);
  const handlePageChange = (step:number) => {
    onPageChange((prevPage: number) => prevPage + step);
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => {
            handlePageChange(-1);
          }}
        >
          «
        </a>
      </li>
      {getNumbers(1, pageAmount).map(number => (
        <li
          className={
            classNames('page-item', { active: number === currentPage })
          }
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
      <li className={
        classNames('page-item', { disabled: currentPage === pageAmount })
      }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageAmount ? 'true' : 'false'}
          onClick={() => {
            handlePageChange(1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
