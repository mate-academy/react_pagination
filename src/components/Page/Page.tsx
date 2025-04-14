import cn from 'classnames';

interface PageProps {
  num: number;
  pageIndex: number;
  setPageIndex: (number: number) => void;
}

export const Page: React.FC<PageProps> = ({ num, pageIndex, setPageIndex }) => {
  const handlePageClick = (numId: number) => {
    if (numId === num) {
      setPageIndex(num);
    }
  };

  return (
    /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
    <li
      className={cn('page-item', { active: num === pageIndex })}
      onClick={() => handlePageClick(num)}
    >
      <a data-cy="pageLink" className="page-link" href={`#${num}`}>
        {num}
      </a>
    </li>
  );
};
