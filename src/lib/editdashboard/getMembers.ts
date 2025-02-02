import instance from '../instance';

interface GetMembersParams {
  page: number;
  size: number;
  dashboardId: number;
}

export interface GetMembersResponse {
  members: {
    id: number;
    userId: number;
    email: string;
    nickname: string;
    profileImageUrl: string;
    createdAt: string;
    updatedAt: string;
    isOwner: boolean;
  }[];
  totalCount: number;
}

export default async function getMembers(
  params: GetMembersParams,
): Promise<GetMembersResponse> {
  try {
    const { data } = await instance.get<GetMembersResponse>(`/11-6/members`, {
      params,
    });
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || '멤버조회에 실패했습니다.',
      );
    }
    throw new Error('멤버조회 요청 중 문제가 발생했습니다.');
  }
}
