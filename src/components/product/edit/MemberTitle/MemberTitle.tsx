// import { useEffect, useState } from 'react';
import CDSButton from '@/components/common/button/CDSButton';
import { DashboardMember } from '@/type/edit_dashboard';
import MemberList from './MemberList';
import styles from './MemberTitle.module.css';

export default function MemberTitle() {
  // 페이지네이션 구현
  const handleClick = (e) => {
    console.log(e);
  };

  // mock데이터를 api로 변경하는 것이 최종 목표
  const mockMembers: DashboardMember[] = [
    {
      id: 1,
      email: 'john.doe@example.com',
      nickname: 'John Doe',
      profileImageUrl: '/path/to/profile1.jpg',
      createdAt: '2023-12-01T12:34:56Z',
      updatedAt: '2023-12-01T12:34:56Z',
      isOwner: false,
      userId: 101,
    },
    {
      id: 2,
      email: 'jane.smith@example.com',
      nickname: 'Jane Smith',
      profileImageUrl: '/path/to/profile2.jpg',
      createdAt: '2023-12-01T12:34:56Z',
      updatedAt: '2023-12-01T12:34:56Z',
      isOwner: false,
      userId: 102,
    },
    {
      id: 3,
      email: 'alice.johnson@example.com',
      nickname: 'Alice Johnson',
      profileImageUrl: null,
      createdAt: '2023-12-01T12:34:56Z',
      updatedAt: '2023-12-01T12:34:56Z',
      isOwner: false,
      userId: 103,
    },
    {
      id: 4,
      email: 'alice.johnson@example.com',
      nickname: 'Alice Johnson',
      profileImageUrl: null,
      createdAt: '2023-12-01T12:34:56Z',
      updatedAt: '2023-12-01T12:34:56Z',
      isOwner: false,
      userId: 103,
    },
  ];

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
        <MemberList members={mockMembers} />
      </div>
    </section>
  );
}
