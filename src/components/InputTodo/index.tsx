import { useCallback, useEffect, useRef, useState } from 'react';
import { ImSpinner8 } from 'react-icons/im';
import Dropdown from '@/components/Dropdown';
import { createTodo } from '@/apis/todo';
import { search } from '@/apis/search';
import useFocus from '@/hooks/useFocus';
import useDebounce from '@/hooks/useDebounce';
import { TodoType } from '@/types/todo';
import { ReactComponent as SearchIcon } from '@/assets/SearchIcon.svg';
import styles from './styles.module.css';

type InputTodoProps = {
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

const InputTodo = ({ setTodos }: InputTodoProps) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);

  const observerTargetRef = useRef<HTMLElement>(null);
  const nextPageRef = useRef(1);

  const debouncedInput = useDebounce(inputText);
  const { ref, setFocus } = useFocus();

  const addTodo = useCallback(
    async (todo: string) => {
      try {
        const newItem = { title: todo };
        const { data } = await createTodo(newItem);

        if (data) {
          return setTodos((prev) => [...prev, data]);
        }
      } catch (error) {
        console.error(error);
        alert('Something went wrong.');
      } finally {
        setInputText('');
        setRecommendations([]);
      }
    },
    [setTodos]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value.trim());
  };

  const loadNextPage = useCallback(async () => {
    if (nextPageRef.current <= 1 || !hasNextPage) return;

    try {
      setIsLoading(true);
      const { data } = await search({ query: debouncedInput, page: nextPageRef.current });
      const { result } = data;
      setRecommendations((prev) => [...prev, ...result]);
      if (result.length > 0) {
        nextPageRef.current += 1;
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedInput, hasNextPage]);

  useEffect(() => {
    if (!observerTargetRef.current) return;

    const io = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        loadNextPage();
      }
    });

    io.observe(observerTargetRef.current);

    return () => {
      io.disconnect();
    };
  }, [loadNextPage]);

  useEffect(() => {
    if (debouncedInput.length < 1) {
      setRecommendations([]);
      setHasNextPage(false);
      nextPageRef.current = 1;
      return;
    }

    (async function () {
      try {
        setIsLoading(true);
        const { data } = await search({ query: debouncedInput });
        const { result, total, limit, page } = data;
        setRecommendations(result);
        setHasNextPage(page < Math.ceil(total / limit));
        if (result.length > 0) {
          nextPageRef.current = 2;
        }
      } catch (error) {
        alert(error);
      }
      setIsLoading(false);
    })();
  }, [debouncedInput]);

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <SearchIcon className={styles.searchIcon} />
        <input
          className={styles.inputText}
          placeholder="Add new todo..."
          ref={ref}
          value={inputText}
          onChange={handleInputChange}
        />
        {isLoading && <ImSpinner8 className="spinner" />}
      </div>
      <Dropdown
        recommendations={recommendations}
        debouncedInput={debouncedInput}
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        ref={observerTargetRef}
        addTodo={addTodo}
      />
    </div>
  );
};

export default InputTodo;
