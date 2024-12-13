import styles from './Header.module.css';
import NavBar from './NavBar';

export default function Header() {
  return (
    <header className={styles.container}>
      <NavBar />
    </header>
  );
}
