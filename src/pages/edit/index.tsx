import Sidebar from '@/components/common/sidebar/Sidebar';
import styles from './edit.module.css';
import ReturnButton from '@/components/product/edit/ReturnButton';

export default function EditPage() {
	return (
		<div className={styles.container}>
			<Sidebar />
			<div className={styles.text_container}>
				<ReturnButton />
			</div>
		</div>
	);
}
