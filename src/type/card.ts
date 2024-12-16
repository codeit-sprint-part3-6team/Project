interface GetCardParams {
  teamId: string;
  size?: number;
  cursorId?: number;
  columnId: number;
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

export type { GetCardParams, GetCardsResponse };
