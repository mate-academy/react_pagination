import React from 'react';
import classNames from 'classnames';
import './PaginationUl.scss';

type Props = {
  selectedPage: number,
  setselectedPage: (num: number) => void,
  totalElements: number,
  totalPages: number,
};

export const PaginationUl: React.FC<Props> = (props) => {
  const {
    selectedPage,
    setselectedPage,
    totalElements,
    totalPages,
  } = props;
  const pageArr = new Array(totalPages - 1);

  for (let i = 0; i < totalPages; i += 1) {
    pageArr[i] = i + 1;
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { target } = e;
    const { value } = e.currentTarget;

    setselectedPage(+value);
    // eslint-disable-next-line no-console
    console.log(value, target, selectedPage, setselectedPage, totalElements);
  };

  const handlePrev = () => {
    if (selectedPage > 1) {
      const nextPage = selectedPage - 1;

      setselectedPage(nextPage);
    }
  };

  const handleNext = () => {
    if (selectedPage < totalPages) {
      const nextPage = selectedPage + 1;

      setselectedPage(nextPage);
    }
  };

  return (
    <ul className="paginationUl">
      <button
        type="button"
        className={classNames('paginationUl__button', {
          paginationUl__disabele: selectedPage === 1,
        })}
        onClick={handlePrev}
      >
        &lArr;
      </button>
      {pageArr.map(page => (
        <button
          className={classNames('paginationUl__button', {
            paginationUl__active: page === selectedPage,
          })}
          type="button"
          key={page}
          value={page}
          onClick={handleClick}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        className={classNames('paginationUl__button', {
          paginationUl__disabele: selectedPage === totalPages,
        })}
        onClick={handleNext}
      >
        &rArr;
      </button>
    </ul>
  );
};
