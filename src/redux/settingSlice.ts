import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserInfoState } from '@/type/userInfo';

// 초기 상태 정의
const initialState: UserInfoState = {
  user: {
    id: null,
    email: '',
    nickname: '',
    profileImageUrl: '',
    createdAt: '',
    updatedAt: '',
  },
};

// 사용자 정보를 관리하는 슬라이스 정의(-> 슬라이스: 리듀서와 액션들을 묶은 객체)
const userInfoSlice = createSlice({
  name: 'userInfo', // 슬라이스 이름
  initialState, // 초기 상태로 설정한 initialState 사용
  reducers: {
    // setUserInfo 액션을 정의해서 상태를 변경하는 함수
    setUserInfo: (state, action: PayloadAction<{ user: User }>) => {
      const { user } = action.payload; // action.payload로 전달된 user 정보를 가져옴(payload: 액션이 어떤 데이터를 처리할지에 대한 정보)
      state.user = user; // 새로운 user로 상태 갱신
    },
    // resetUserInfo 액션을 정의해서 상태를 초기 상태로 리셋하는 함수(로그아웃때 활용 가능)
    resetUserInfo: (state) => {
      state.user = initialState.user; // 상태의 user 초기화
    },
  },
});
const userInfoReducer = userInfoSlice.reducer; // userInfoSlice에서 생성된 reducer를 export

export const { setUserInfo, resetUserInfo } = userInfoSlice.actions; // 액션 export 해서 다른 컴포넌트에서 사용
export default userInfoReducer; // 리듀서를 store에 포함시켜서 상태관리하기 위해 export
