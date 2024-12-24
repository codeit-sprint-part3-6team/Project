import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColumnState, ColumnData } from '@/type/card';

// 초기 상태 정의
const initialState: ColumnState = {
  cardListInfo: {
    cursorId: 0,
    totalCount: 0,
    cards: [
      {
        id: 0,
        title: '',
        description: '',
        tags: [],
        dueDate: '',
        assignee: {
          profileImageUrl: '',
          nickname: '',
          id: 0,
        },
        imageUrl: '',
        teamId: '',
        columnId: 0,
        createdAt: '',
        updatedAt: '',
      },
    ],
  },
};

const cardListSlice = createSlice({
  name: 'cardList',
  initialState,
  reducers: {
    setCardList: (state, action: PayloadAction<ColumnData>) => {
      state.cardListInfo = action.payload;
    },
    resetCardList: (state) => {
      state.cardListInfo = initialState.cardListInfo;
    },
  },
});
const cardListReducer = cardListSlice.reducer;

export const { setCardList, resetCardList } = cardListSlice.actions;
export default cardListReducer;
