import React from 'react';
import { Link } from 'react-router-dom';

const Paginator = (props) => {
  const { currPage, pagesQtty, perPage, withInfo, articlesQtty, perPageChange } = props;

  return (
    <div className="pagination">
      {withInfo
        && <div className="noBtn">
          &nbsp;{(currPage - 1) * perPage + 1} - {currPage * perPage} of {articlesQtty}&nbsp;
        </div>
      }

      {currPage > 1
        ? <Link
            to={`page-${currPage - 1}`}
            className="pagButton"
          >
            &nbsp;&nbsp;&nbsp;&lsaquo; Prev&nbsp;&nbsp;&nbsp;
          </Link>
        : <div className="noBtn">
            &nbsp;&nbsp;&nbsp;&lsaquo; Prev&nbsp;&nbsp;&nbsp;
          </div>
      }

      {currPage > 1 && <Link to="page-1" className="pagButton">1</Link>}

      {currPage >= 4 && <div>&nbsp;...&nbsp;</div>}

      {currPage >= 3 && <Link to={`page-${currPage - 1}`} className="pagButton">{currPage - 1}</Link>}

      <Link to={`page-${currPage}`} className="pagButton active">{currPage}</Link>

      {currPage < pagesQtty && <Link to={`page-${currPage + 1}`} className="pagButton">{currPage + 1}</Link>}

      {currPage < (pagesQtty - 2) && <div>&nbsp;...&nbsp;</div>}

      {currPage < (pagesQtty - 1)  && <Link to={`page-${pagesQtty}`} className="pagButton">{pagesQtty}</Link>}

      {currPage > (pagesQtty - 1)
        ? <div className="noBtn">
            &nbsp;&nbsp;&nbsp;Next &rsaquo;&nbsp;&nbsp;&nbsp;
          </div>
        : <Link
            to={`page-${currPage + 1}`}
            className="pagButton"
          >
            &nbsp;&nbsp;&nbsp;Next &rsaquo;&nbsp;&nbsp;&nbsp;
          </Link>
      }

      <select value={perPage} className="dropDown" onChange={(event) => perPageChange(event.target.value)}>
        <option value="3">&nbsp;3&nbsp;</option>
        <option value="6">&nbsp;6&nbsp;</option>
        <option value="9">&nbsp;9&nbsp;</option>
        <option value="18">&nbsp;18&nbsp;</option>
      </select>
      <br /><br /><br /><br />
    </div>
  );
};

export default Paginator;
