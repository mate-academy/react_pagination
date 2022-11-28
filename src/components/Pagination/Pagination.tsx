import classname from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: string[],
  perPage: number,
  currentPage: number,
  onPageChange: (item: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total, perPage, onPageChange, currentPage,
}) => {
  const numberOfLinks = Math.ceil(42 / perPage);
  const pageNumber = getNumbers(1, numberOfLinks);

  const handlePreviousPage = () => {
    if (currentPage === 1) {
      return;
    }

    onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage === numberOfLinks) {
      return;
    }

    onPageChange(currentPage + 1);
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={classname({
            'page-item': true,
            disabled: currentPage === 1,
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={handlePreviousPage}
          >
            «
          </a>
        </li>
        {pageNumber.map(item => (
          <li
            key={item}
            className={classname({
              'page-item': true,
              active: item === currentPage,
            })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${item}`}
              onClick={() => onPageChange(item)}
            >
              {item}
            </a>
          </li>
        ))}

        <li
          className={classname({
            'page-item': true,
            disabled: currentPage === numberOfLinks,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === numberOfLinks}
            onClick={handleNextPage}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {total.map(item => (
          <li
            data-cy="item"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
