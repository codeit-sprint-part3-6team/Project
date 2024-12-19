import { ColorSelectorProps } from '@/type/Color';
import Check from 'public/ic/ic_whitecheck.svg';
import styles from './ColorSelector.module.css';

export default function ColorSelector({ selectedColor, setSelectedColor, customStyle } : ColorSelectorProps) {
	const colors = [
		{ code: '#7AC555', style: styles.colorGreen },
		{ code: '#760DDE', style: styles.colorPurple },
		{ code: '#FFA500', style: styles.colorOrange },
		{ code: '#76A5EA', style: styles.colorBlue },
		{ code: '#E876EA', style: styles.colorPink },
	];

	return (
		<div className={styles.container}>
			{colors.map(({ code, style }) => (
				<button
					key={code}
					className={`${style} ${styles.button}`}
					onClick={() => setSelectedColor(code)}
				>
					{selectedColor === code && (
						<Check className={styles.check}/>
					)}
				</button>
			))}
		</div>
	);
}
