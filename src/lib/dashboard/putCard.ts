import instance from '@/lib/instance';

export interface PutCardData {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}

export interface PutCardResponse {
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
}

const putCard = async (
  data: PutCardData,
  cardId: number,
): Promise<PutCardResponse> => {
  try {
    const res = await instance.put(`/11-6/cards/${cardId}`, data);
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error('API 응답 에러:', error.response.data);
    }
    throw new Error(
      error.response?.data?.message || '정보를 수정정하는데 실패했습니다.',
    );
  }
};

export default putCard;
