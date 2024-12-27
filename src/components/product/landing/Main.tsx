import { motion } from 'framer-motion';
import Landingimage2 from 'public/images/img_landingimage2.svg';
import Landingimage3 from 'public/images/img_landingimage3.svg';
import styles from './Main.module.css';
import BottomMain from './BottumMain';

export default function Module() {
  return (
    <main className={styles['main-container']}>
      <section className={styles['main-section']}>
        <div className={styles['main-contentsection']}>
          <div className={styles['main-text']}>
            <motion.h1
              className={styles['main-title']}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.2,
              }}
            >
              Point 1
            </motion.h1>
            <motion.p
              className={styles['main-explanation']}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.4,
              }}
            >
              일의 우선순위를
              <br />
              관리하세요
            </motion.p>
          </div>
          <motion.div
            className={styles['main-imgsection']}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1,
              delay: 1,
            }}
          >
            <Landingimage2 className={styles['main-image']} />
          </motion.div>
        </div>
      </section>

      <section className={styles['main-section']}>
        <div className={styles['main-reverese-contentsection']}>
          <motion.div
            className={styles['main-imgsection']}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.6,
            }}
          >
            <Landingimage3 className={styles['main-reverse-img']} />
          </motion.div>
          <div className={styles['main-reverse-text']}>
            <motion.h1
              className={styles['main-reverse-title']}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.8,
              }}
            >
              Point 2
            </motion.h1>
            <motion.p
              className={styles['main-reverse-explanation']}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 1,
              }}
            >
              해야 할 일을
              <br />
              등록하세요
            </motion.p>
          </div>
        </div>
      </section>
      <BottomMain />
    </main>
  );
}
