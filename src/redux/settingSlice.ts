import { createSlice } from '@reduxjs/toolkit';

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    user: {
      id: '',
      email: '',
      nickname: '',
      profileImageUrl: '',
      createdAt: '',
      updatedAt: '',
    },
  },
  reducers: {
    setUserInfo: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },
    resetUserInfo: (state) => {
      state.user = {
        id: '',
        email: '',
        nickname: '',
        profileImageUrl: '',
        createdAt: '',
        updatedAt: '',
      };
    },
  },
});

export const { setUserInfo, resetUserInfo } = userInfoSlice.actions; // 액션 이름 구분
export default userInfoSlice.reducer;
