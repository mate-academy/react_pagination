import { useState } from 'react';

interface Props {
  initialValue?: string;
  onChange?: (value: string) => void;
}

const OPTIONS = ['3', '5', '10', '20'];

export const PerPageSelector = ({ initialValue = '5', onChange }: Props) => {
  const [selected, setSelected] = useState<string>(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelected(value);

    if (onChange) {
      onChange(value);
    }
  };

  return (
    <select
      data-cy="perPageSelector"
      id="perPageSelector"
      className="form-control"
      onChange={handleChange}
      value={selected}
    >
      {OPTIONS.map(value => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};
