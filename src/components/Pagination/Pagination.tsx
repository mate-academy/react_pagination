import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  nextPage: React.MouseEventHandler<HTMLAnchorElement> | undefined,
  prevPage: React.MouseEventHandler<HTMLAnchorElement> | undefined,
  setPage: (num: number) => void,
  totalPages: number,
  page: number,
};

export const Pagination: React.FC<Props> = ({
  nextPage,
  prevPage,
  setPage,
  totalPages,
  page,
}) => {
  const buttons = getNumbers(1, totalPages);

  return (
    <ul className="pagination">
      <li className={classNames('page-item',
        { disabled: page === 1 })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled="true"
          onClick={prevPage}
        >
          «
        </a>
      </li>

      {buttons.map(el => (
        <li
          key={el}
          className={classNames('page-item', { active: page === el })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${el}`}
            onClick={() => setPage(el)}
          >
            {el}
          </a>
        </li>
      ))}

      <li className={classNames('page-item',
        { disabled: page === totalPages })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
          onClick={nextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
