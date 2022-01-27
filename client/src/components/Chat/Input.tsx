import './Input.css';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { chatActions } from '../../redux/chatSlice';

import { IconButton } from '@material-ui/core';
import { SendRounded } from '@material-ui/icons';

const Input = () => {
  const dispatch = useDispatch();

  const [input, setInput] = useState<string>('');

  const sendMessage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const content = input.trim();
    if (content) dispatch(chatActions.submitMessage({ content: content }));
    setInput('');
  };

  return (
    <div className="textInput__container">
      <div className="textInput">
        <form>
          <input placeholder="Message..." type="text" value={input} onChange={(e) => setInput(e.target.value)} />
          <IconButton onClick={(event) => sendMessage(event)} type="submit">
            <SendRounded />
          </IconButton>
        </form>
      </div>
    </div>
  );
};

export default Input;
