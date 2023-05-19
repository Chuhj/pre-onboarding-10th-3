import { FiMoreHorizontal } from 'react-icons/fi';
import { ImSpinner8 } from 'react-icons/im';
import styles from './styles.module.css';
import { forwardRef } from 'react';
import DropdownItem from '../DropdownItem';

type DropdownProps = {
  recommendations: string[];
  debouncedInput: string;
  hasNextPage: boolean;
  isLoading: boolean;
  addTodo: (todo: string) => void;
};

const Dropdown = forwardRef(
  (
    { recommendations, debouncedInput, hasNextPage, isLoading, addTodo }: DropdownProps,
    ref: React.ForwardedRef<HTMLElement>
  ) => {
    return (
      <div className={`${styles.dropdownContainer} ${recommendations.length < 1 && styles.hidden}`}>
        <ul className={styles.dropdown}>
          {recommendations.map((recommendation) => (
            <DropdownItem
              recommendation={recommendation}
              debouncedInput={debouncedInput}
              addTodo={addTodo}
            />
          ))}
          <li className={styles.lastItem} ref={ref as React.ForwardedRef<HTMLLIElement>}>
            {hasNextPage && !isLoading && <FiMoreHorizontal className={styles.more} />}
            {isLoading && <ImSpinner8 className="spinner" />}
          </li>
        </ul>
      </div>
    );
  }
);

export default Dropdown;
