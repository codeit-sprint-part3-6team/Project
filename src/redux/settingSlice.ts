import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserInfoState } from '@/type/userInfo';

// 초기 상태 정의
const initialState: UserInfoState = {
  user: {
    id: '',
    email: '',
    nickname: '',
    profileImageUrl: '',
    createdAt: '',
    updatedAt: '',
  },
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<{ user: User }>) => {
      const { user } = action.payload;
      state.user = user;
    },
    resetUserInfo: (state) => {
      state.user = initialState.user;
    },
  },
});
const userInfoReducer = userInfoSlice.reducer;

export const { setUserInfo, resetUserInfo } = userInfoSlice.actions; // 액션 이름 구분
export default userInfoReducer;
