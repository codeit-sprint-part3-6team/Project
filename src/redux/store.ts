import { configureStore } from '@reduxjs/toolkit';
import { UserInfoState } from '@/type/userInfo';
import userInfoReducer from './settingSlice';

// 최초 세션 스토리지에서 상태를 로드하는 함수
const loadState = () => {
  try {
    // 브라우저 환경에서만 sessionStorage를 사용하도록 조건 추가
    if (typeof window !== 'undefined') {
      const storedState = sessionStorage.getItem('userState');
      if (!storedState) return undefined;

      return JSON.parse(storedState); // 문자열로 저장된 JSON을 객체로 변환하여 반환
    }
    return undefined;
  } catch (error) {
    console.error('상태를 불러오는데 실패했어요:', error);
    return undefined;
  }
};

// 스토어 설정
const store = configureStore({
  reducer: {
    userInfo: userInfoReducer, // userInfo 상태를 처리하는 리듀서를 설정
  },
  preloadedState: loadState() as { userInfo: UserInfoState }, // 새로 고침 되어도 이전 상태 유지
});

// 상태와 디스패치 타입 정의
export type RootState = {
  userInfo: UserInfoState;
};
export type AppDispatch = typeof store.dispatch;

// Redux Store 상태 변경 시 sessionStorage에 저장
store.subscribe(() => {
  try {
    const stateToSave = JSON.stringify(store.getState()); // store의 상태를 문자열로 변환
    sessionStorage.setItem('userState', stateToSave);
  } catch (error) {
    console.error('상태를 저장하는데 실패했어요:', error);
  }
});

export default store;
