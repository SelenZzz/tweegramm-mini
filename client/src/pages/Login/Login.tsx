import styles from './Login.module.css';
import cx from 'classnames';

// react
import React, { useEffect, useRef, useState } from 'react';

// redux
import { useDispatch } from 'react-redux';
import { userActions } from '../../redux/userSlice';

// utils
import { face as faceEmoji } from './faces';
import { useUsername } from '../../hooks/useUsername';
import { iUser } from '../../lib/types';

const Login = () => {
  const dispatch = useDispatch();
  const { username, setUsername } = useUsername();

  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLInputElement>(null);

  const buttonActive = username?.length > 0;

  useEffect(() => {
    if (username) buttonRef.current?.focus();
    else inputRef.current?.focus();
  }, []);

  const loginUser = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    const user: iUser = { username: username };
    dispatch(userActions.setUsername({ user: user }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {faceEmoji}
        <h1>Tweegramm</h1>
      </div>
      <form className={styles.form}>
        <input
          ref={inputRef}
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername({ username: e.target.value })}
        />
        <input
          ref={buttonRef}
          className={cx(styles.submit, buttonActive && styles.submitActive)}
          disabled={!buttonActive}
          type="submit"
          onClick={(event) => loginUser(event)}
          value="Join"
        />
      </form>
    </div>
  );
};

export default Login;
