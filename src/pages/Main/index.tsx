import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import InputTodo from '@/components/InputTodo';
import TodoList from '@/components/TodoList';
import { getTodoList } from '@/apis/todo';
import { TodoType } from '@/types/todo';
import styles from './styles.module.css';

const Main = () => {
  const [todoListData, setTodoListData] = useState<TodoType[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await getTodoList();
      setTodoListData(data || []);
    })();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <Header />
        <InputTodo setTodos={setTodoListData} />
        <TodoList todos={todoListData} setTodos={setTodoListData} />
      </div>
    </div>
  );
};

export default Main;
