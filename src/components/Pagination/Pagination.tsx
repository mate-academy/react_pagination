import { v4 } from "uuid";

export const Pagination = ({
    total,
    perPage,
    currentPage,
    onPageChange,
}) => {

    const numPages = Math.ceil(total / perPage);

    const numPagesArray = [];

    for(let varAux = 1; varAux < numPages + 1; varAux++) {
        numPagesArray.push(varAux);
    }

    return(
        <>
        <ul key={v4()} className="pagination">
            <li key={v4()} className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
                <a 
                    onClick={() => {
                        if(currentPage !== 1) {
                            onPageChange(currentPage - 1);
                        }
                    }}
                    className="page-link" href="#prev" data-cy="prevLink" aria-disabled={currentPage === 1 ? 'true' : 'false'}>
                    «
                </a>
            </li>
            {
                numPagesArray.map((numPage) => {
                    return(
                        <>
                        
                        <li
                            onClick={() => {
                                onPageChange(numPage)
                            }}
                            className={`page-item${numPage === currentPage ? ' active' : ''}`}
                        >
                            <a data-cy="page-link" className="page-link" href={`#${numPage}`}>{numPage}</a>
                        </li>
                        
                        </>
                    )
                })
            }
            <li className="page-item">
                <a
                    data-cy="nextLink"
                    className="page-link"
                    href="#next"
                    aria-disabled={currentPage === numPagesArray.length ? 'true' : 'false'}
                    onClick={() => {
                        if(currentPage !== numPagesArray.length) {
                            onPageChange(currentPage + 1);
                        }
                    }}
                >
                    »
                </a>
            </li>
        </ul>
        </>
    )

};
