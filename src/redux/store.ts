import { configureStore } from '@reduxjs/toolkit';
import { UserInfoState } from '@/type/userInfo';
import userInfoReducer from './settingSlice';

// 최초 세션 스토리지에서 상태를 로드하는 함수
const loadState = () => {
  try {
    const storedState = sessionStorage.getItem('userState');
    if (!storedState) return undefined;

    return JSON.parse(storedState);
  } catch (error) {
    console.error('상태를 불러오는데 실패했어요요:', error);
    return undefined;
  }
};

// 스토어 설정
const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
  },
  preloadedState: loadState(), // 새로 고침 되어도 이전 상태 유지지
});

// 상태와 디스패치 타입 정의
export type RootState = {
  userInfo: UserInfoState;
};
export type AppDispatch = typeof store.dispatch;

// Redux Store 상태 변경 시 sessionStorage에 저장
store.subscribe(() => {
  try {
    const stateToSave = JSON.stringify(store.getState());
    sessionStorage.setItem('userState', stateToSave);
  } catch (error) {
    console.error('상태를 저장하는데 실패했어요:', error);
  }
});
export default store;
