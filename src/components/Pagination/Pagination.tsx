import classNames from 'classnames';

type Props = {
  renderSteps: string[],
  setStep: (step: number) => void,
  setList: (items: string[]) => void,
  selecetCount: number,
  step: number,
  items: string[],
  returnNumber: (str: string) => string
};

export const Pagination: React.FC<Props> = ({
  renderSteps, setStep, setList, selecetCount, step, items, returnNumber,
}) => {
  const onPrevHandler = () => {
    if (step > 1) {
      setStep(step - 1);
      setList(items
        .slice(selecetCount * (step - 2),
          selecetCount * (step - 2) + selecetCount));
    }
  };

  const onNextHandler = () => {
    if (step < items.length / +selecetCount) {
      setStep(step + 1);
      setList(items
        .slice(selecetCount * (step),
          selecetCount * (step) + selecetCount));
    }
  };

  const onClickHandler = (index: number) => {
    setStep(index + 1);
    setList(items
      .slice(selecetCount * index,
        selecetCount * index + selecetCount));
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', {
        disabled: step <= 1,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={step <= 1}
          onClick={onPrevHandler}
        >
          «
        </a>
      </li>
      {
        renderSteps.map((el: string, index: number) => {
          return (
            <li
              className={classNames('page-item', {
                active: step === index + 1,
              })}
              key={el}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${returnNumber(el)}`}
                onClick={() => onClickHandler(index)}
              >
                {returnNumber(el)}
              </a>
            </li>
          );
        })
      }
      <li className={classNames('page-item', {
        disabled: step >= items.length / +selecetCount,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={step >= items.length / +selecetCount}
          onClick={onNextHandler}
        >
          »
        </a>
      </li>
    </ul>
  );
};
