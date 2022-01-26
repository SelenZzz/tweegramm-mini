import './Chat.css';

import { useSelector } from 'react-redux';
import { selectMessages } from '../redux/chatSlice';

import Message from '../components/Chat/Message';
import Input from '../components/Chat/Input';
import Alert from '../components/Chat/Alert';

const Chat = () => {
  const messages = useSelector(selectMessages);
  // TODO: Add user list with avatars
  // TODO: Alert on user join
  // TODO: Write in message
  // TODO: Write in message in realtime
  return (
    <div className="chat">
      <div className="chat__messages">
        <Alert text={'You have joined the chat'} />
        {messages.map((m) => {
          return <Message key={m.uid} data={m} />;
        })}
      </div>
      <Input />
    </div>
  );
};

export default Chat;
