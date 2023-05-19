import { useCallback, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { ImSpinner8 } from 'react-icons/im';
import { deleteTodo } from '@/apis/todo';
import { TodoType } from '@/types/todo';
import styles from './styles.module.css';

type TodoItemProps = {
  id: string;
  title: string;
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

const TodoItem = ({ id, title, setTodos }: TodoItemProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveTodo = useCallback(async () => {
    try {
      setIsLoading(true);
      await deleteTodo(id);

      setTodos((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }, [id, setTodos]);

  return (
    <li className={styles.item}>
      <span>{title}</span>
      <div className={styles.itemOption}>
        {!isLoading ? (
          <button onClick={() => handleRemoveTodo()}>
            <FaTrash className={styles.btnTrash} />
          </button>
        ) : (
          <ImSpinner8 className="spinner" />
        )}
      </div>
    </li>
  );
};

export default TodoItem;
