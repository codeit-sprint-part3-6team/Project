import instance from '@/lib/instance';

export interface PostCardData {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}

export interface PostCardResponse {
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

const postCard = async (data: PostCardData): Promise<PostCardResponse> => {
  try {
    const res = await instance.post(`/11-6/cards/`, data);
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error('API 응답 에러:', error.response.data);
    }
    throw new Error(
      error.response?.data?.message || '정보를 저장하는는데 실패했습니다.',
    );
  }
};

export default postCard;
