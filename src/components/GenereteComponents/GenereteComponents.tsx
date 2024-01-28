import classNames from 'classnames';

export const GeneratePages = (
  totalPages:number,
  currentPage:number,
  handlePageChange:(pageNum:number) => void,
) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i += 1) {
    const page = (
      <li
        key={i}
        className={classNames('page-item', { active: i === currentPage })}
      >
        <a
          data-cy="pageLink"
          className="page-link"
          href={`#${i}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </a>
      </li>
    );

    pages.push(page);
  }

  return pages;
};

export default GeneratePages;
