import styles from './styles.module.css';

type DropdownItemProps = {
  recommendation: string;
  debouncedInput: string;
  addTodo: (todo: string) => void;
};

const DropdownItem = ({ recommendation, debouncedInput, addTodo }: DropdownItemProps) => {
  const inputRegex = new RegExp(`${debouncedInput}`, 'i');
  const inputGlobalRegex = new RegExp(`${debouncedInput}`, 'gi');

  return (
    <li
      key={recommendation}
      className={styles.dropdownItem}
      onClick={() => addTodo(recommendation)}
    >
      {recommendation.split(inputRegex).map((normal, i) => {
        const array = recommendation.match(inputGlobalRegex);
        return (
          <>
            {i > 0 && <span className={styles.highlight}>{array && array[i - 1]}</span>}
            {normal}
          </>
        );
      })}
    </li>
  );
};
export default DropdownItem;
