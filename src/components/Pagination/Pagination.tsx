import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  itemsList: string[];
  onPageChange: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  itemsList,
  onPageChange,
}) => {
  const tabsNumber = Math.ceil(total / perPage);

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames('page-item', {
            disabled: currentPage === 1,
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={
              currentPage > 1 ? () => onPageChange(currentPage - 1) : () => null
            }
          >
            «
          </a>
        </li>
        {new Array(tabsNumber).fill(0).map((_, index) => (
          <li
            className={classNames('page-item', {
              active: index + 1 === currentPage,
            })}
            key={index}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${index + 1}`}
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </a>
          </li>
        ))}
        <li
          className={classNames('page-item', {
            disabled: currentPage === tabsNumber,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === tabsNumber ? true : false}
            onClick={
              currentPage < tabsNumber
                ? () => onPageChange(currentPage + 1)
                : () => null
            }
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemsList.map((_, i) => (
          <li key={i} data-cy="item">
            {itemsList[i]}
          </li>
        ))}
      </ul>
    </>
  );
};
