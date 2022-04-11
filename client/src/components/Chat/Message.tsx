import './Message.css';

import React from 'react';
import { useSelector } from 'react-redux';

import { selectUserUid } from '../../redux/userSlice';
import { iMessage } from '../../lib/types';
import { Avatar } from '../Avatar/Avatar';

const Message = ({ data }: { data: iMessage }) => {
  const userUid = useSelector(selectUserUid);

  const time = new Date(data.timestamp!).toTimeString().substring(0, 5);

  const sender = userUid === data.userKey;

  const style = sender ? `message__sender` : `message__receiver`;

  return (
    <div className="message">
      {!sender && <Avatar litera={data.senderName!.charAt(0)} />}
      <div className={'message__text ' + style}>
        <div>{data.content}</div>
        <small className="message__time">{time}</small>
      </div>
      {sender && <Avatar litera={data.senderName!.charAt(0)} />}
    </div>
  );
};

export default Message;
