import classNames from 'classnames';

type Props = {
  pageNumber: number[],
  paginate: (page: number) => void,
  currentPage: number,
};

export const GetPages: React.FC<Props> = ({
  pageNumber,
  paginate,
  currentPage,
}) => {
  return (
    <>
      {pageNumber.map(page => {
        return (
          <li
            className={classNames('page-item', {
              active: page === currentPage,
            })}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              key={page}
              onClick={() => paginate(page)}
            >
              {page}
            </a>
          </li>
        );
      })}
    </>
  );
};
