import Back from 'public/ic/ic_left.svg';
import styles from './ReturnBox.module.css';

export default function ReturnBox() {
  return (
    <section className={styles[`return-box`]}>
      <Back width={20} height={20} className={styles[`back-image`]} />
      <p className={styles.return}>돌아가기</p>
    </section>
  );
}
