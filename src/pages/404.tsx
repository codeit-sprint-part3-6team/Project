import React, { useState } from 'react';
import { useRouter } from 'next/router';
import CDSButton from '@/components/common/button/CDSButton';
import Error from 'public/images/img_404.svg';
import styles from '@/styles/404.module.css';

export default function NotFound() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsLoading(true);
    router.push('/signin');
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <section>
          <Error width={500} height={500} className={styles.image} />
        </section>
        <section>
          <div className={styles['text-box']}>
            <h1>페이지가 없거나 접근할 수 없어요</h1>
            <h2>입력하신 주소가 맞는지 다시 확인해주세요!</h2>
          </div>
          <div className={styles['button-box']}>
            <CDSButton
              btnType="modal_colored"
              onClick={handleClick}
              disabled={isLoading}
            >
              돌아가기
            </CDSButton>
          </div>
        </section>
      </div>
    </div>
  );
}
