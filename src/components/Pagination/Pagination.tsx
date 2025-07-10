import { items } from '../../App';
import '../../App.css';

interface Props {
  perPage: number;
  currentPage: number;
  onPageChange: (page: string) => void;
}

export const Pagination = ({ perPage, currentPage, onPageChange }: Props) => {
  const pageQuantity = Math.ceil(items.length / +perPage);

  const passedItems = perPage * currentPage - perPage; // items those we have passed in previous pages
  // from passedItems to passedItems + perPage we must show items

  const firstFiveElements = items.slice(passedItems, passedItems + perPage);

  const getNumberPage = (addres: string) => {
    const arrAddres = addres.split('/');

    onPageChange(arrAddres[arrAddres.length - 1]);
  };

  const turnRight = () => {
    const newNumberPage = currentPage + 1;

    onPageChange(`#${newNumberPage}`);
  };

  const turnLeft = () => {
    const newNumberPage = currentPage - 1;

    onPageChange(`#${newNumberPage}`);
  };

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={() => turnLeft()}
          >
            «
          </a>
        </li>

        {Array.from({ length: pageQuantity }).map((_, i) => {
          return (
            <li
              key={i}
              className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${i + 1}`}
                onClick={event => getNumberPage(event.currentTarget.href)}
              >
                {i + 1}
              </a>
            </li>
          );
        })}

        <li
          className={`page-item ${currentPage === pageQuantity ? 'disabled' : ''}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pageQuantity ? 'true' : 'false'}
            onClick={() => turnRight()}
          >
            »
          </a>
        </li>
      </ul>

      {firstFiveElements.map(item => {
        return (
          <li data-cy="item" key={item}>
            {item}
          </li>
        );
      })}
    </>
  );
};
