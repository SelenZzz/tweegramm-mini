import styles from './Avatar.module.css';

export const Avatar = ({ litera }: { litera: string }) => {
  return (
    <div className={styles.container}>
      <div>{litera}</div>
    </div>
  );
};
