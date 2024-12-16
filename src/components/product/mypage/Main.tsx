import ReturnButton from '@/components/common/button/ReturnButton';
import ModifyProfile from './ModifyProfile';
import ChangePassword from './ChangePassword';
import styles from './Main.module.css';

export default function MyPageMain() {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <ReturnButton />
        <ModifyProfile />
        <ChangePassword />
      </div>
    </div>
  );
}
