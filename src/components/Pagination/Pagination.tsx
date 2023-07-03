import { GetPages } from './Pages';
import { Step } from './Step';

type Props = {
  items: string[],
  pageNumber: number[],
  paginate: (page: number) => void,
  currentPage: number,
};

export const Pagination: React.FC<Props> = ({
  items,
  pageNumber,
  currentPage,
  paginate,
}) => {
  return (
    <>
      <ul className="pagination">

        <Step
          paginate={paginate}
          pageNumber={pageNumber}
          currentPage={currentPage}
          direction="back"
        />

        <GetPages
          paginate={paginate}
          pageNumber={pageNumber}
          currentPage={currentPage}
        />

        <Step
          paginate={paginate}
          pageNumber={pageNumber}
          currentPage={currentPage}
          direction="forward"
        />
      </ul>

      <ul>
        {items.map(item => <li data-cy="item" key={item}>{item}</li>)}
      </ul>
    </>
  );
};
