import styles from '@/components/dashboard/column/SkeletionColumn.module.css';
import SkeletonCard from '../card/SkeletonCard';

function SkeletonColumn() {
  return (
    <div className={styles.column}>
      <div className={styles['column-title-section']}>
        <div className={styles['column-title']}>
          <span className={styles['title-text']} />
          <span className={styles['column-size']} />
        </div>
        <div className={styles['btn-edit-column']} />
      </div>
      <div className={styles['btn-add']} />
      <div className={styles['card-section']}>
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonCard key={`skeleton_${index}`} />
        ))}
      </div>
    </div>
  );
}

export default SkeletonColumn;
