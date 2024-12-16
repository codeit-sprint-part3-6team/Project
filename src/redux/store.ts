import { configureStore } from '@reduxjs/toolkit';
import storeUserInfo from './settingSlice';

const loadState = () => {
  try {
    const storedState = sessionStorage.getItem('userState');
    if (!storedState) return undefined;

    return JSON.parse(storedState);
  } catch (error) {
    console.error('Failed to load state:', error);
    return undefined;
  }
};

const store = configureStore({
  reducer: {
    userInfo: storeUserInfo,
  },
  preloadedState: loadState(),
});

// Redux Store 상태 변경 시 sessionStorage에 저장
store.subscribe(() => {
  try {
    const stateToSave = JSON.stringify(store.getState());
    sessionStorage.setItem('userState', stateToSave);
  } catch (error) {
    console.error('Failed to save state:', error);
  }
});
export default store;
