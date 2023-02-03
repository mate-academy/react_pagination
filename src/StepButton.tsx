import classNames from 'classnames';
import { useEffect, useState } from 'react';

enum Direction {
  Prev = 'prev',
  Next = 'next',
}

interface Props {
  direction: Direction
  currentPage: number,
  pages: number[],
  onPageChange: (page: number) => void,

}

export const StepButton: React.FC<Props> = ({
  direction,
  currentPage,
  pages,
  onPageChange,
}) => {
  const [prev, setPrev] = useState(currentPage - 1);
  const [next, setNext] = useState(currentPage + 1);

  useEffect(() => {
    setNext(currentPage + 1);
    setPrev(currentPage - 1);
  }, [currentPage]);

  const edgePages = { prev: 1, next: pages.length };
  const isAnEdgePage = currentPage === edgePages[direction];

  const page = {
    prev,
    next,
  }[direction];

  const button = {
    prev: '«',
    next: '»',
  }[direction];

  return (
    <li
      className={classNames('page-item', {
        disabled: isAnEdgePage,
      })}
    >
      <a
        data-cy={`${direction}Link`}
        className="page-link"
        href={`#${direction}`}
        aria-disabled={isAnEdgePage}
        onClick={() => {
          if (!isAnEdgePage) {
            onPageChange(page);
          }
        }}
      >
        {button}
      </a>
    </li>
  );
};
