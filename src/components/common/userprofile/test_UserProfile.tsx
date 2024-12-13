import { useEffect, useState } from 'react';
import axios from '../../../pages/api/axios';
import UserProfile from './UserProfile';

function TestUserProfile() {
  const [user, setUser] = useState<any>();

  const getData = async () => {
    const response = await axios.get('/users/me', {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDk1MSwidGVhbUlkIjoiMTEtNiIsImlhdCI6MTczNDA4MjM2MCwiaXNzIjoic3AtdGFza2lmeSJ9.1OCu1v8l8V9qtW1sghPM-O7NmEL_LuyIDFqPgb1lhWI',
      },
    });
    const data = response.data;
    setUser(data);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!user) return;

  return (
    <>
      <h1>프로필 이미지를 등록하지 않은 경우</h1>
      <UserProfile nickname={user.nickname} profileImageUrl={null} />

      <br />

      <h1>대시보드 수정, 생성</h1>
      <UserProfile
        nickname={user.nickname}
        profileImageUrl={user.profileImageUrl}
      />

      <br />

      <h1>헤더</h1>
      <UserProfile
        nickname={user.nickname}
        profileImageUrl={user?.profileImageUrl}
        type="header"
      />

      <br />

      <h1>대시보드 상세</h1>
      <UserProfile
        nickname={user.nickname}
        profileImageUrl={user?.profileImageUrl}
        type="dashboard_detail"
        onlyImg={true}
      />

      <br />

      <h1>할 일 상세 모달</h1>
      <UserProfile
        nickname={user.nickname}
        profileImageUrl={user?.profileImageUrl}
        type="todo_detail"
      />

      <br />

      <h1>할 일 생성 모달 </h1>
      <UserProfile
        nickname={user.nickname}
        profileImageUrl={user?.profileImageUrl}
        type="todo_create"
      />
    </>
  );
}

export default TestUserProfile;
