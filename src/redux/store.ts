import { configureStore } from '@reduxjs/toolkit';
import { UserInfoState } from '@/type/userInfo';
import { DashboardState } from '@/type/dashboard';
import { CardInfoState } from '@/type/card';
import userInfoReducer from './settingSlice';
import dashboardReducer from './dashboardSlice';
import cardInfoReducer from './cardSlice';
import renderReducer from './renderSlice';

// 스토리지 선택 함수 (localStorage 또는 sessionStorage)
const getStorage = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    return token ? localStorage : sessionStorage;
  }
  return null;
};

// 초기 상태를 스토리지에서 로드하는 함수
const loadState = () => {
  try {
    const storage = getStorage();
    if (storage) {
      const storedState = storage.getItem('userState');
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
    userInfo: userInfoReducer,
    dashboard: dashboardReducer,
    cardInfo: cardInfoReducer,
    render: renderReducer,
  } as any,
  preloadedState: loadState() as { userInfo: UserInfoState }, // 새로 고침 되어도 이전 상태 유지
});

// 상태와 디스패치 타입 정의
export type RootState = {
  render: any;
  userInfo: UserInfoState;
  dashboard: DashboardState;
  cardInfo: CardInfoState;
};
export type AppDispatch = typeof store.dispatch;

// Redux Store 상태 변경 시 스토리지에 저장
store.subscribe(() => {
  try {
    const storage = getStorage();
    if (storage) {
      const stateToSave = JSON.stringify(store.getState()); // store의 상태를 문자열로 변환
      storage.setItem('userState', stateToSave);
    }
  } catch (error) {
    console.error('상태를 저장하는데 실패했어요:', error);
  }
});

export default store;
