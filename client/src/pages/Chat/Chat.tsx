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
  // TODO: Write in message
  // TODO: Write in message in realtime
  const messagesEndRef = useRef<HTMLInputElement>(null);

  const messages = useSelector(selectMessages);

  const mapMessages = () => {
    const nextMessage = (from: number) => {
      for (let i = from; i < messages.length; i++) {
        const m = messages[i];
        if ('senderName' in m) return m;
      }
      return null;
    };

    return messages.map((m, index) => {
      if ('senderName' in m)
        return <Message key={index} data={m} displayAvatar={nextMessage(index + 1)?.userKey !== m.userKey} />;
      if ('username' in m) return <Alert key={index} text={`${m.username} has joined the chat`} />;
      return null;
    });
  };

  // scroll down on new message
  useEffect(() => {
    messagesEndRef.current!.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.container}>
      <div className={styles.messages}>
        <Alert text={'You have joined the chat'} />
        {mapMessages()}
        <div ref={messagesEndRef} style={{ marginBottom: 5 }} />
      </div>
      <Input />
    </div>
  );
};

export default Chat;
