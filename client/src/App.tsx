// react
import { useEffect } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { chatActions } from './redux/chatSlice';
import { selectLogged } from './redux/userSlice';

// pages
import Chat from './pages/Chat/Chat';
import Login from './pages/Login/Login';

const App = () => {
  const dispatch = useDispatch();
  const logged = useSelector(selectLogged);

  useEffect(() => {
    dispatch(chatActions.startConnecting());
  }, [dispatch]);

  return <div className="App">{!logged ? <Login /> : <Chat />}</div>;
};

export default App;
