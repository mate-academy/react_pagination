type Props = {
  pages: number[],
  setPage: (currentPage: number) => void,
  setPrevPage: () => void,
  setNextPage: () => void,
  currentPage: number,
};

export const PageNumbers: React.FC<Props> = ({
  pages,
  setPage,
  setPrevPage,
  setNextPage,
  currentPage,
}) => {
  const renderButton = (button: number) => {
    if (button === 1) {
      return (
        <>
          <li key={button}>
            <button
              type="button"
              className={currentPage === button ? 'buttons__button active' : 'buttons__button'}
              onClick={() => {
                setPage(button);
              }}
            >
              {button}
            </button>
          </li>
          {button !== currentPage
            && currentPage !== 2
            && pages.length >= 4
            && (
              <li key={button + 1}>
                <button
                  type="button"
                  className="buttons__button"
                >
                  ...
                </button>
              </li>
            )}
        </>
      );
    }

    if (button === pages.length) {
      return (
        <>
          {button !== currentPage
            && currentPage !== pages.length - 1
            && pages.length >= 4
            && (
              <li key={button - 1}>
                <button
                  type="button"
                  className="buttons__button"
                >
                  ...
                </button>
              </li>
            )}
          <li key={button}>
            <button
              type="button"
              className={currentPage === button ? 'buttons__button active' : 'buttons__button'}
              onClick={() => {
                setPage(button);
              }}
            >
              {button}
            </button>
          </li>
        </>
      );
    }

    if (button === currentPage - 1
      || button === currentPage + 1
      || button === currentPage
    ) {
      return (
        <li key={button}>
          <button
            type="button"
            className={currentPage === button ? 'buttons__button active' : 'buttons__button'}
            onClick={() => {
              setPage(button);
            }}
          >
            {button}
          </button>
        </li>
      );
    }

    return null;
  };

  return (
    <ul className="buttons">
      <li key={-1}>
        <button
          disabled={currentPage === 1}
          type="button"
          className="buttons__button prev"
          onClick={setPrevPage}
        >
          Prev
        </button>
      </li>
      {pages.map((page: number) => {
        if (pages.length <= 5) {
          return (
            <li key={page}>
              <button
                type="button"
                className={currentPage === page ? 'buttons__button active' : 'buttons__button'}
                onClick={() => {
                  setPage(page);
                }}
              >
                {page}
              </button>
            </li>
          );
        }

        return renderButton(page);
      })}
      <li key={pages.length + 2}>
        <button
          disabled={currentPage === pages.length}
          type="button"
          className="buttons__button"
          onClick={setNextPage}
        >
          Next
        </button>
      </li>
    </ul>
  );
};
