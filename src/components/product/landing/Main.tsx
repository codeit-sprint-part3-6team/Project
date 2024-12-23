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
            <h1 className={styles['main-title']}>Point 1</h1>
            <p className={styles['main-explanation']}>
              일의 우선순위를
              <br />
              관리하세요
            </p>
          </div>
          <div className={styles['main-imgsection']}>
            <Landingimage2 className={styles['main-image']} />
          </div>
        </div>
      </section>
      <section className={styles['main-reverse-section']}>
        <div className={styles['main-reverese-contentsection']}>
          <div className={styles['main-imgsection']}>
            <Landingimage3 className={styles['main-reverse-img']} />
          </div>
          <div className={styles['main-reverse-text']}>
            <h1 className={styles['main-reverse-title']}>Point 2</h1>
            <p className={styles['main-reverse-explanation']}>
              해야 할 일을
              <br />
              등록하세요
            </p>
          </div>
        </div>
      </section>
      <BottomMain />
    </main>
  );
}
