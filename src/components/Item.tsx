type Props = {
  number: number;
};

export const Item = ({ number }: Props) => (
  <li data-cy="item"> Item {number}</li>
);
