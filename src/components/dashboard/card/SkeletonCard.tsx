import styles from '@/components/dashboard/card/SkeletonCard.module.css';

function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={styles['card-image']} />
      <div className={styles['content-section']}>
        <div className={styles['card-title']} />
        <div className={styles['description-section']}>
          <div className={styles['card-tags']} />
          <div className={styles['card-date']}>
            <div className={styles['icon-calendar']} />
            <span className={styles.date} />
          </div>
          <div className={styles.badge} />
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard;
