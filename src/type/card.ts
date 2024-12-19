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

export type {
  GetCardParams,
  GetCardDetailParams,
  GetCardsResponse,
  Card,
  CardInfo,
  CardInfoState,
};
