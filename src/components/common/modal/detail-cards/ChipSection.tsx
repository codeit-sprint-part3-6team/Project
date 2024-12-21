import styles from '@/components/common/modal/detail-cards/ChipSection.module.css';
import Chip from '@/components/common/chip/Chip';

interface ChipSectionProps {
  columnTitle: string;
  tags: string[];
  cardId: number;
}

function ChipSection({ columnTitle, tags, cardId }: ChipSectionProps) {
  return (
    <div className={styles['chip-section']}>
      <div className={styles.status}>
        <Chip chipType="status">{columnTitle}</Chip>
      </div>
      <span className={styles.bar} />
      <div className={styles.tags}>
        {tags.map((tag) => (
          <Chip key={`${cardId}_tag_${tag}`} chipType="tag">
            {tag}
          </Chip>
        ))}
      </div>
    </div>
  );
}

export default ChipSection;
