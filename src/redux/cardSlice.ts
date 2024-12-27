import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardInfoState, CardInfo } from '@/type/card';

// 초기 상태 정의
const initialState: CardInfoState = {
  cardDetailInfo: {
    id: 0,
    title: '',
    description: '',
    tags: [],
    dueDate: '',
    assignee: {
      id: 0,
      nickname: '',
      profileImageUrl: null,
    },
    imageUrl: '',
    teamId: '',
    columnId: 0,
    createdAt: '',
    updatedAt: '',
  },
};

const cardInfoSlice = createSlice({
  name: 'cardInfo',
  initialState,
  reducers: {
    setCardInfo: (state, action: PayloadAction<CardInfo>) => {
      state.cardDetailInfo = action.payload;
    },
  },
});
const cardInfoReducer = cardInfoSlice.reducer;

export const { setCardInfo } = cardInfoSlice.actions;
export default cardInfoReducer;
