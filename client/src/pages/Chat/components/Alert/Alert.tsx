import styles from './Alert.module.css';

export const Alert = ({ text }: { text: string }) => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>{text}</div>
    </div>
  );
};
