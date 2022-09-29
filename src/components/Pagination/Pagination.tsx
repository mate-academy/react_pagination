import classNames from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total:number;
  perPage:string;
  currentPage:number;
  onPageChange(page:number) : void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const lastItem = Math.ceil(total / Number(perPage));
  const items = getNumbers(1, lastItem);

  const handlePrev = () => {
    if (currentPage < 1) {
      return;
    }

    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage > total) {
      return;
    }

    onPageChange(currentPage + 1);
  };

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: currentPage === 1,
        })}
      >
        <a
          data-cy="prevLink"
          href="#prev"
          aria-disabled="true"
          className="page-link"
          onClick={handlePrev}
        >
          «
        </a>
      </li>
      {items.map((item) => (
        <li
          key={item}
          className={classNames('page-item', {
            active: item === currentPage,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href="#1"
            onClick={() => onPageChange(item)}
          >
            {item}
          </a>
        </li>
      ))}
      <li
        className={classNames('page-item', {
          disabled: currentPage === lastItem,
        })}
      >
        <a
          data-cy="nextLink"
          href="#next"
          aria-disabled="false"
          className="page-link"
          onClick={handleNext}
        >
          »
        </a>
      </li>
    </ul>
  );
};
