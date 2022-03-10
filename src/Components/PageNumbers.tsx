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
  const dottedButton = (id: number) => {
    return (
      <li key={id}>
        <button
          type="button"
          className="buttons__button"
        >
          ...
        </button>
      </li>
    );
  };

  const numberedButton = (id: number) => {
    return (
      <li key={id}>
        <button
          type="button"
          className={currentPage === id ? 'buttons__button active' : 'buttons__button'}
          onClick={() => {
            setPage(id);
          }}
        >
          {id}
        </button>
      </li>
    );
  };

  const renderButton = (button: number) => {
    if (button === 1) {
      return (
        <>
          {numberedButton(button)}

          {button !== currentPage
            && currentPage !== 2
            && (
              dottedButton(button + 1)
            )}
        </>
      );
    }

    if (button === pages.length) {
      return (
        <>
          {button !== currentPage
            && currentPage !== pages.length - 1
            && (
              dottedButton(button - 1)
            )}
          {numberedButton(button)}
        </>
      );
    }

    if (button === currentPage - 1
      || button === currentPage + 1
      || button === currentPage
    ) {
      return (
        numberedButton(button)
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
            numberedButton(page)
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
