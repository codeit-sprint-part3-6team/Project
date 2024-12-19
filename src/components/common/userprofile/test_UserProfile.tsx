import { useEffect, useState } from 'react';
import axios from 'axios';
import UserProfile from './UserProfile';

function TestUserProfile() {
  const [user, setUser] = useState<any>();

  const getData = async () => {
    const response = await axios.get(
      'https://sp-taskify-api.vercel.app/11-6/users/me',
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDk1MSwidGVhbUlkIjoiMTEtNiIsImlhdCI6MTczNDA4MjM2MCwiaXNzIjoic3AtdGFza2lmeSJ9.1OCu1v8l8V9qtW1sghPM-O7NmEL_LuyIDFqPgb1lhWI',
        },
      },
    );
    const { data } = response;
    setUser(data);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!user) {
    return null;
  }

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
        type="dashboard-detail"
        onlyImg
      />

      <br />

      <h1>할 일 상세 모달</h1>
      <UserProfile
        nickname={user.nickname}
        profileImageUrl={user?.profileImageUrl}
        type="todo-detail"
      />

      <br />

      <h1>할 일 생성 모달 </h1>
      <UserProfile
        nickname={user.nickname}
        profileImageUrl={user?.profileImageUrl}
        type="todo-create"
      />
    </>
  );
}

export default TestUserProfile;
