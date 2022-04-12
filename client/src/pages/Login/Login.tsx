import styles from './Login.module.css';

// react
import React, { useState } from 'react';

// redux
import { useDispatch } from 'react-redux';
import { userActions } from '../../redux/userSlice';

// utils
import { iUser } from '../../lib/types';
import { face as faceEmoji } from './faces';

const Login = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState<string>('');

  const loginUser = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (username) {
      const user: iUser = { username: username };
      dispatch(userActions.setUsername({ user: user }));
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {faceEmoji}
        <h1>Tweegramm</h1>
      </div>
      <form className={styles.form}>
        <input placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <button type="submit" onClick={(event) => loginUser(event)} title="Join">
          Join
        </button>
      </form>
    </div>
  );
};

export default Login;
