import styles from '@/components/dashboard/card/Card.module.css';
import Chip from '@/components/common/chip/Chip';
import CardImage from '@/components/dashboard/card/CardImage';
import CalendarIcon from 'public/ic/ic_calendar.svg';
import formatDate from '@/utils/formatDate';

interface CardProps {
  imageUrl: string;
  id: number;
  title: string;
  tags: string[];
  dueDate: string;
}

function Card({ imageUrl, id, title, tags, dueDate }: CardProps) {
  return (
    <button type="button" className={styles.card}>
      <CardImage image={imageUrl} name={title} />
      <div className={styles['card-title']}>{title}</div>
      <div className={styles['card-tags']}>
        {tags.map((tag) => (
          <Chip key={`${id}_tag_${tag}`} chipType="tag">
            {tag}
          </Chip>
        ))}
      </div>
      <div className={styles['card-date']}>
        <CalendarIcon className={styles['icon-calendar']} />
        <span className={styles.date}>{formatDate(dueDate)}</span>
      </div>
    </button>
  );
}

export default Card;
