import classNames from 'classnames';

type Props = {
  pages: number[];
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const TilePages: React.FC<Props> = ({
  pages,
  currentPage,
  onPageChange,
}) => {
  return (
    <>
      {pages.map((item, index) => {
        return (
          <li
            key={item}
            className={classNames('page-item', {
              active: currentPage === index + 1,
            })}
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
        );
      })}
    </>
  );
};
