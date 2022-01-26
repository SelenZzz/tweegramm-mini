import './App.css';

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { chatActions } from './redux/chatSlice';
import { selectLogged } from './redux/userSlice';

import Chat from './pages/Chat';
import Login from './pages/Login';

const App = () => {
  const dispatch = useDispatch();
  const logged = useSelector(selectLogged);

  useEffect(() => {
    dispatch(chatActions.startConnecting());
  }, [dispatch]);

  return <div className="App">{!logged ? <Login /> : <Chat />}</div>;
};

export default App;
