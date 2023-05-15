import TodoItem from '@/components/TodoItem';
import { TodoType } from '@/types/todo';
import styles from './styles.module.css';

type TodoListProps = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

const TodoList = ({ todos, setTodos }: TodoListProps) => {
  return todos.length ? (
    <ul>
      {todos.map(({ id, title }) => (
        <TodoItem key={id} id={id} title={title} setTodos={setTodos} />
      ))}
    </ul>
  ) : (
    <div className={styles.emptyList}>...</div>
  );
};
export default TodoList;
