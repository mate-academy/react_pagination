import classNames from 'classnames';
import { getNumbers } from '../../utils';
import { StepButton } from '../../StepButton';

interface Props {
  total: number,
  itemsPerPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
}

enum Direction {
  Prev = 'prev',
  Next = 'next',
}

export const Pagination: React.FC<Props> = ({
  total,
  itemsPerPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pages = getNumbers(1, Math.ceil(total / itemsPerPage));

  return (
    <ul className="pagination">
      <StepButton
        direction={Direction.Prev}
        currentPage={currentPage}
        pages={pages}
        onPageChange={(page) => {
          onPageChange(page);
        }}
      />

      {pages.map(page => (
        <li
          key={page}
          className={classNames('page-item', {
            active: page === currentPage,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => {
              onPageChange(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}

      <StepButton
        direction={Direction.Next}
        currentPage={currentPage}
        pages={pages}
        onPageChange={(page) => {
          onPageChange(page);
        }}
      />
    </ul>
  );
};
