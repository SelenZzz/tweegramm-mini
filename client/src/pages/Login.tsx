import './Login.css';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../redux/userSlice';
import { iUser } from '../lib/types';
import face from '../components/Login/faces';

const Login = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState<string>('');

  const loginUser = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (username) {
      const user: iUser = { name: username };
      dispatch(userActions.setUsername({ user: user }));
    }
  };
  return (
    <div className="login">
      <div className="login__title">
        {face}
        <h1>Tweegramm</h1>
      </div>
      <form className="login__form">
        <input placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <button type="submit" onClick={(event) => loginUser(event)} title="Join">
          Join
        </button>
      </form>
    </div>
  );
};

export default Login;
