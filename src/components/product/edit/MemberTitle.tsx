import styles from './MemberTitle.module.css';
import CDSButton from '@/components/common/button/CDSButton';

export default function MemberTitle() {
	// 페이지네이션 구현
	const handleClick = (e) => {
    console.log(e);
  };

	return (
		<section className={styles.title_container}>
			<div className={styles.member_section}>
				<h1 className={styles.title}>구성원</h1>
				<div className={styles.button}>
					<CDSButton btnType="pagination_prev" onClick={handleClick} disabled />
					<CDSButton btnType="pagination_next" onClick={handleClick} />
				</div>
			</div>
			<div className={styles.name_section}>
				<h2 className={styles.sub_title}>이름</h2>
				{/* 이름 추가가 필요 */}
			</div>
		</section>
	)
}