interface Props {
  option: number;
}

export const Option: React.FC<Props> = ({ option }) => {
  return <option value={option}>{option}</option>;
};
