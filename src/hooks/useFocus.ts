import { useRef } from 'react';

const useFocus = <T extends HTMLInputElement>() => {
  const ref = useRef<T>(null);
  const setFocus = () => {
    ref.current && ref.current.focus();
  };

  return { ref, setFocus };
};

export default useFocus;
