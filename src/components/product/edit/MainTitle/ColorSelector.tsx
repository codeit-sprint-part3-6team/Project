import { ColorSelectorProps } from '@/type/Color';
import Check from 'public/ic/ic_whitecheck.svg';
import styles from './ColorSelector.module.css';

export default function ColorSelector({
  selectedColor,
  setSelectedColor,
}: ColorSelectorProps) {
  const colors = [
    { code: '#7ac555', style: styles.colorGreen },
    { code: '#760dde', style: styles.colorPurple },
    { code: '#ffa500', style: styles.colorOrange },
    { code: '#76a5ea', style: styles.colorBlue },
    { code: '#e876ea', style: styles.colorPink },
  ];

  return (
    <div className={styles.container}>
      {colors.map(({ code, style }) => (
        <button
          type="button"
          key={code}
          className={`${style} ${styles.button}`}
          onClick={() => setSelectedColor(code)}
        >
          {selectedColor === code && <Check className={styles.check} />}
        </button>
      ))}
    </div>
  );
}
