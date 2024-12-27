import styles from '@/components/dashboard/comment/SkeletonComment.module.css';

function SkeletonComment() {
  return (
    <div className={styles.comment}>
      <div className={styles.profile} />
      <div className={styles.wrap}>
        <div className={styles['title-section']}>
          <span className={styles.nickname} />
          <span className={styles.date} />
        </div>
        <div className={styles.content} />
        <div className={styles['btn-area']}>
          <div className={styles.btn} />
          <div className={styles.btn} />
        </div>
      </div>
    </div>
  );
}

export default SkeletonComment;
