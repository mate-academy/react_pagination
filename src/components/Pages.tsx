import React from 'react';
import classNames from 'classnames';

type Props = {
  total: number[],
  currentPage: number,
  onPageChange: React.Dispatch<React.SetStateAction<number>>
};

export const Pages: React.FC<Props> = (props) => {
  const {
    onPageChange,
    total,
    currentPage,
  } = props;

  return (
    <>
      {total.map(item => (
        <li
          key={item}
          className={classNames(
            'page-item',
            { active: currentPage === item },
          )}
        >
          <a
            className="page-link"
            data-cy="pageLink"
            href={`#${item}`}
            onClick={() => onPageChange(item)}
          >
            {item}
          </a>
        </li>
      ))}
    </>
  );
};
