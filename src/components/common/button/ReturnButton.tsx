import { useRouter } from 'next/router';
import Back from 'public/ic/ic_left.svg';
import styles from './ReturnButton.module.css';

export default function ReturnButton() {
	const router = useRouter();

	const handleClick = () => {
		router.back();
  };

  return (
    <div
      className={styles.returnButton}
      onClick={handleClick}
    >
      <Back className={styles.icon} />
      돌아가기
    </div>
  );
}
