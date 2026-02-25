import { getNumbers } from '../../utils';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const items: string[] = getNumbers(1, 42).map(n => `Item ${n}`);

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: Props) => {
  // const [selectedNum, setSelectedNum] = useState('3');
  // const perPage: number = Number(selectedNum);
  const pages: number = Math.ceil(total / perPage);
  const arrSelectedNum: number[] = Array.from(
    { length: pages },
    (_, i) => i + 1,
  );

  const startIdx: number = 1 + perPage * (currentPage - 1);
  const finishIdx: number = Math.min(total, currentPage * perPage);

  const currentItems: string[] = items.filter((item, idx) => {
    return idx >= startIdx - 1 && idx <= finishIdx - 1;
  });

  const moveArrows = (direct: string) => {
    switch (direct) {
      case 'prev':
        if (currentPage !== 1) {
          onPageChange(currentPage - 1);
          break;
        }

        break;

      case 'next':
        if (currentPage !== pages) {
          onPageChange(currentPage + 1);
          break;
        }

        break;
    }
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={cn('page-item', {
            disabled: currentPage === 1,
          })}
          onClick={() => moveArrows('prev')}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
          >
            «
          </a>
        </li>

        {arrSelectedNum.map((num, idx) => {
          return (
            <li
              key={idx}
              className={cn('page-item', {
                active: num === currentPage,
              })}
              onClick={() => onPageChange(num)}
            >
              <a data-cy="pageLink" className="page-link" href={`#${num}`}>
                {num}
              </a>
            </li>
          );
        })}

        <li
          className={cn('page-item', {
            disabled: currentPage === pages,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pages}
            onClick={() => moveArrows('next')}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {currentItems.map((item, idx) => {
          return (
            <li data-cy="item" key={idx}>
              {item}
            </li>
          );
        })}
      </ul>
    </>
  );
};
