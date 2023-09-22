import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number,
  itemsPerPage: number,
  items: number[],
  currentPage: number,
  onPageChange: (value: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  itemsPerPage,
  items,
  currentPage,
  onPageChange = () => { },
}) => {
  const pages = getNumbers(1, Math.ceil(total / itemsPerPage));

  return (
    <>
      <ul className="pagination">
        <li className="page-item disabled">
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
            onClick={() => onPageChange(currentPage - 1)}
          >
            «
          </a>
        </li>

        {pages.map(el => (
          <li className={cn('page-item', { active: el === currentPage })}>
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${el}`}
              onClick={(event) => {
                event.preventDefault();
                onPageChange(el);
              }}
            >
              {el}
            </a>
          </li>
        ))}

        <li className="page-item">
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
            onClick={() => onPageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.map(item => (
          <li data-cy="item">{`Item ${item}`}</li>
        ))}
      </ul>
    </>
  );
};
