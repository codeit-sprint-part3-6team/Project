import styles from './MemberTitle.module.css';
import CDSButton from '@/components/common/button/CDSButton';

export default function InviteTitle() {
	const handleClick = (e) => {
    console.log(e);
  };

	return (
		<section className={styles.title_container}>
			<div className={styles.member_section}>
				<h1 className={styles.title}>초대 내역</h1>
				<div className={styles.button}>
					{/* + 초대하기로 변경이 필요 */}
					<CDSButton btnType="normal_colored" onClick={handleClick}>
						수락
					</CDSButton>
				</div>
			</div>
			<div className={styles.name_section}>
				<h2 className={styles.sub_title}>이메일</h2>
				{/* 이메일 추가가 필요 */}
			</div>
		</section>
	)
}