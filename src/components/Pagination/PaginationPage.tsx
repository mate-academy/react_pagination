import classNames from 'classnames';

type Props = {
  page: number;
  currentPage: number;
  onClick: (page: number) => void;
};

export const PaginationPage = ({ page, currentPage, onClick }: Props) => {
  return (
    <li
      key={page}
      className={classNames('page-item', { active: page === currentPage })}
      onClick={() => onClick(page)}
    >
      <a data-cy="pageLink" className="page-link" href={`#${page}`}>
        {page}
      </a>
    </li>
  );
};
