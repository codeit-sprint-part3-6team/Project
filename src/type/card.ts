interface GetCardParams {
  teamId: string;
  size?: number;
  cursorId?: number;
  columnId: number;
}

interface GetCardDetailParams {
  cardId: number;
}

interface Card {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    id: number;
    nickname: string;
    profileImageUrl: string | null;
  };
  imageUrl: string;
  teamId: string;
  dashboardId: number;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

interface GetCardsResponse {
  cards: Card[];
  totalCount: number;
  cursorId: number;
}

interface CardInfo {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
  imageUrl: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
  dashboardId: number;
}

interface CardInfoState {
  cardDetailInfo: CardInfo;
}

// Assignee 타입 정의
interface AssigneeList {
  profileImageUrl: string;
  nickname: string;
  id: number;
}

// Card 타입 정의
interface CardList {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: AssigneeList;
  imageUrl: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

// 상태 관리용 타입 정의
interface ColumnData {
  cursorId: number;
  totalCount: number;
  cards: CardList[];
}

// 리덕스 상태 타입 정의
interface ColumnState {
  cardListInfo: ColumnData;
}

export type {
  GetCardParams,
  GetCardDetailParams,
  GetCardsResponse,
  Card,
  CardInfo,
  CardInfoState,
  ColumnState,
  ColumnData,
};
