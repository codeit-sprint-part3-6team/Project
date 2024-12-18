interface GetCommentsParmas {
  size?: number;
  cursorId?: number;
  cardId: number;
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: {
    id: number;
    nickname: string;
    profileImageUrl: string | null;
  };
}

interface GetCommentsResponse {
  comments: Comment[];
  cursorId: number | null;
}

export type { GetCommentsParmas, GetCommentsResponse };
