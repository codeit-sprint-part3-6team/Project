import React from 'react';
import Email from 'public/images/img_email.svg';
import Facebook from 'public/ic/ic_facebook.svg';
import Instagram from 'public/ic/ic_instagram.svg';
import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer_container}>
      <p className={styles.footer_copyright}>©codeit - 2023</p>
      <div className={styles.footer_section}>
        <p>Privacy Policy</p>
        <p>FAQ</p>
      </div>
      <div className={styles.footer_social}>
        <Link
          href="https://mail.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Email className={styles.footer_icon} />
        </Link>
        <Link
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook className={styles.footer_icon} />
        </Link>
        <Link
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram className={styles.footer_icon} />
        </Link>
      </div>
    </footer>
  );
}
