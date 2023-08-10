type Props = {
  view: () => string[];
};

export const Items: React.FC<Props> = ({
  view,
}) => {
  const items = view();

  return (
    <ul>
      {
        items.map(item => {
          if (item) {
            return (
              <li data-cy="item" key={item}>
                {item}
              </li>
            );
          }

          return null;
        })
      }
    </ul>
  );
};
