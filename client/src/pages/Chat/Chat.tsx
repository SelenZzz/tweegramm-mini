import styles from './Chat.module.css';

// react
import { useEffect, useRef } from 'react';

// redux
import { useSelector } from 'react-redux';
import { selectMessages } from '../../redux/chatSlice';

// components
import { Message } from './components/Message/Message';
import { Input } from './components/Input/Input';
import { Alert } from './components/Alert/Alert';

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
    <div className={styles.container}>
      <div className={styles.messages}>
        <Alert text={'You have joined the chat'} />
        {messages.map((m) => {
          return <Message key={m.uid} data={m} />;
        })}
        <div ref={messagesEndRef} style={{ marginBottom: 5 }} />
      </div>
      <Input />
    </div>
  );
};

export default Chat;
