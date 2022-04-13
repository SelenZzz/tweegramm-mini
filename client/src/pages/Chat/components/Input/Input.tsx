import styles from './Input.module.css';

// react
import React, { useEffect, useRef, useState } from 'react';

// redux
import { useDispatch } from 'react-redux';
import { chatActions } from '../../../../redux/chatSlice';

// icons
import { SendRounded } from '@material-ui/icons';

export const Input = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const content = input.trim();
    if (content) dispatch(chatActions.submitMessage({ content: content }));
    setInput('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <form>
          <input
            ref={inputRef}
            placeholder="Message..."
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button className={styles.send} onClick={(event) => sendMessage(event)}>
            <SendRounded />
          </button>
        </form>
      </div>
    </div>
  );
};
