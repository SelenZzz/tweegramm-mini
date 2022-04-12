import styles from './Input.module.css';

// react
import React, { useState } from 'react';

// redux
import { useDispatch } from 'react-redux';
import { chatActions } from '../../../../redux/chatSlice';

// icons
import { IconButton } from '@material-ui/core';
import { SendRounded } from '@material-ui/icons';

export const Input = () => {
  const dispatch = useDispatch();

  const [input, setInput] = useState<string>('');

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
          <input placeholder="Message..." type="text" value={input} onChange={(event) => setInput(event.target.value)} />
          <IconButton onClick={(event) => sendMessage(event)} type="submit">
            <SendRounded />
          </IconButton>
        </form>
      </div>
    </div>
  );
};
