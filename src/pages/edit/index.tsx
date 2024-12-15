import Sidebar from '@/components/common/sidebar/Sidebar';
import styles from './edit.module.css';
import ReturnButton from '@/components/product/edit/ReturnButton';
import MainTitle from '@/components/product/edit/MainTitle'

export default function EditPage() {
	return (
		<main className={styles.container}>
			<Sidebar />
			<div className={styles.main_container}>
				<ReturnButton />
				<div className={styles.main_section}>
					<MainTitle />
				</div>
			</div>
		</main>
	);
}
