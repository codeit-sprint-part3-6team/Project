import React from 'react';
import Email from 'public/images/img_email.svg';
import Facebook from 'public/ic/ic_facebook.svg';
import Instagram from 'public/ic/ic_instagram.svg';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles['footer-container']}>
      <p className={styles['footer-copyright']}>©codeit - 2023</p>
      <div className={styles['footer-section']}>
        <p>Privacy Policy</p>
        <p>FAQ</p>
      </div>
      <div className={styles['footer-social']}>
        <Link
          href="https://mail.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Email className={styles['footer-icon']} />
        </Link>
        <Link
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook className={styles['footer-icon']} />
        </Link>
        <Link
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram className={styles['footer-icon']} />
        </Link>
      </div>
    </footer>
  );
}
