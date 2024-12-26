import { motion } from 'framer-motion';
import Landingimage4 from 'public/images/img_landingimage4.svg';
import Landingimage5 from 'public/images/img_landingimage5.svg';
import Landingimage6 from 'public/images/img_landingimage6.svg';
import styles from './BottomMain.module.css';

export default function BottomMain() {
  return (
    <div className={styles['main-container']}>
      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 0.3,
        }}
      >
        생산성을 높이는 다양한 설정 ⚡️
      </motion.h1>
      <motion.div
        className={styles['main-section']}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 0.6,
        }}
      >
        <div className={styles['card-container']}>
          <div className={styles['card-image-section']}>
            <Landingimage4 className={styles['card-image']} />
          </div>
          <div className={styles['text-section']}>
            <h2 className={styles['text-title']}>대시보드 설정</h2>
            <p className={styles['text-explanation']}>
              대시보드 사진과 이름을 변경할 수 있어요.
            </p>
          </div>
        </div>
        <div className={styles['card-container']}>
          <div className={styles['card-image-section']}>
            <Landingimage5 className={styles['card-image']} />
          </div>
          <div className={styles['text-section']}>
            <h2 className={styles['text-title']}>초대</h2>
            <p className={styles['text-explanation']}>
              새로운 팀원을 초대할 수 있어요.
            </p>
          </div>
        </div>
        <div className={styles['card-container']}>
          <div className={styles['card-image-section']}>
            <Landingimage6 className={styles['card-image']} />
          </div>
          <div className={styles['text-section']}>
            <h2 className={styles['text-title']}>구성원</h2>
            <p className={styles['text-explanation']}>
              구성원을 초대하고 내보낼 수 있어요.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
