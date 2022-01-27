import './Chat.css';

import { useEffect, useRef } from 'react';

import { useSelector } from 'react-redux';
import { selectMessages } from '../redux/chatSlice';

import Message from '../components/Chat/Message';
import Input from '../components/Chat/Input';
import Alert from '../components/Chat/Alert';

const Chat = () => {
  // TODO: Add user list with avatars
  // TODO: Alert on user join
  // TODO: Write in message
  // TODO: Write in message in realtime
  const messagesEndRef = useRef<HTMLInputElement>(null);

  const messages = useSelector(selectMessages);

  // scroll down on new message
  useEffect(() => {
    messagesEndRef.current!.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat__messages">
        <Alert text={'You have joined the chat'} />
        {messages.map((m) => {
          return <Message key={m.uid} data={m} />;
        })}
        <div ref={messagesEndRef} />
      </div>
      <Input />
    </div>
  );
};

export default Chat;
