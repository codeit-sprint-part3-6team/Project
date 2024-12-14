import Landingimage2 from 'public/images/img_landingimage2.svg';
import Landingimage3 from 'public/images/img_landingimage3.svg';
import styles from './Main.module.css';

export default function Module() {
  return (
    <main className={styles.main_container}>
      <section className={styles.main_section}>
        <div className={styles.main_contentsection}>
          <div className={styles.main_text}>
            <h1 className={styles.main_title}>Point 1</h1>
            <p className={styles.main_explanation}>
              일의 우선순위를
              <br />
              관리하세요
            </p>
          </div>
          <div className={styles.main_imgsection}>
            <Landingimage2 className={styles.main_image} />
          </div>
        </div>
      </section>
      <section className={styles.main_reverse_section}>
        <div className={styles.main_reverese_contentsection}>
          <div className={styles.main_imgsection}>
            <Landingimage3 className={styles.main_reverse_img} />
          </div>
          <div className={styles.main_reverse_text}>
            <h1 className={styles.main_reverse_title}>Point 2</h1>
            <p className={styles.main_reverse_explanation}>
              해야 할 일을
              <br />
              등록하세요
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
