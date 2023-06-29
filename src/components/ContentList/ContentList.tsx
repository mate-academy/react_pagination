type Props = {
  total: number;
  perPage: number;
  currentPage: number;
};

export const ContentList: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
}) => {
  const startCounting = (currentPage - 1) * perPage;
  const setContentItems = () => {
    const arrayLI = [];
    let finalLINumber = perPage;

    if (startCounting + perPage > total) {
      finalLINumber = total - startCounting;
    }

    for (let i = 1; i <= finalLINumber; i += 1) {
      arrayLI.push(
        <li data-cy="item" key={`Item ${i}`}>
          {`Item ${startCounting + i}`}
        </li>,
      );
    }

    return arrayLI;
  };

  return (
    <ul>
      {setContentItems()}
    </ul>
  );
};
