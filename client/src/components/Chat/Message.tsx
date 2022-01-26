import './Message.css';

import React from 'react';
import { useSelector } from 'react-redux';

import { selectUserUid } from '../../redux/userSlice';
import { iMessage } from '../../lib/types';

const Message = ({ data }: { data: iMessage }) => {
  const userUid = useSelector(selectUserUid);

  const time = new Date(data.timestamp!).toTimeString().substring(0, 5);

  const style = userUid === data.userKey ? `message__sender` : `message__receiver`;

  return (
    <div className="message">
      <div className={'message__text ' + style}>
        <div>{data.content}</div>
        <small className="message__time">{time}</small>
      </div>
    </div>
  );
};

export default Message;
