import Whitelogo from 'public/images/img_whitelogo.svg';
import Whitetextlogo from 'public/images/img_whitetextlogo.svg';
import Link from 'next/link';

import styles from './NavBar.module.css';

export default function NavBar() {
  return (
    <nav className={styles.nav_container}>
      <div className={styles.nav_section}>
        <div className={styles.navlogo_container}>
          <Link href="/">
            <Whitelogo className={styles.logo} />
          </Link>
          <Whitetextlogo className={styles.textlogo} />
        </div>
        <div className={styles.link_container}>
          <Link href="/signin">로그인</Link>
          <Link href="/signup">회원가입</Link>
        </div>
      </div>
    </nav>
  );
}
