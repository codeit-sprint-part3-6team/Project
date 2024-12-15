import ReturnBox from './ReturnBox';
import ModifyProfile from './ModifyProfile';
import ChangePassword from './ChangePassword';
import styles from './Main.module.css';

export default function MyPageMain() {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <ReturnBox />
        <ModifyProfile />
        <ChangePassword />
      </div>
    </div>
  );
}
