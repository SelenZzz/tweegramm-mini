import styles from './Message.module.css';
import cx from 'classnames';

// redux
import { useSelector } from 'react-redux';
import { selectUserUid } from '../../../../redux/userSlice';

// components
import { Avatar } from '../../../../components/Avatar/Avatar';

// utils
import { iMessage } from '../../../../lib/types';

export const Message = ({ data, displayAvatar }: { data: iMessage; displayAvatar?: boolean }) => {
  const userUid = useSelector(selectUserUid);

  const time = new Date(data.timestamp!).toTimeString().substring(0, 5);

  const sender = userUid === data.userKey;

  const messageStyle = sender ? styles.sender : styles.receiver;

  return (
    <div className={styles.message}>
      {displayAvatar && !sender && (
        <div className={styles.avatar}>
          <Avatar litera={data.senderName!.charAt(0)} />
        </div>
      )}
      <div className={cx(styles.text, messageStyle)}>
        <div>{data.content}</div>
        <small className={styles.time}>{time}</small>
      </div>
    </div>
  );
};
