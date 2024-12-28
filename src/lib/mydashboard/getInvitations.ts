import { Invitaion } from '@/type/dashboard';
import instance from '../instance';

export interface GetInvitationsParams {
  size: number;
  cursorId: number;
  title?: string;
}

export interface GetInvitationsResponse {
  cursorId: number;
  invitations: Invitaion[];
}

export default async function getinvitations(
  params: GetInvitationsParams,
): Promise<GetInvitationsResponse> {
  try {
    const { data } = await instance.get<GetInvitationsResponse>(
      `/11-6/invitations/`,
      {
        params: {
          ...params,
          title: params.title?.trim() ? params.title : undefined,
        },
      },
    );
    return data;
  } catch (error) {
    if (error.response) {
      console.error('API 응답 에러:', error.response.data);
    }
    throw new Error(
      error.response?.data?.message || '정보를 불러오는데 실패했습니다.',
    );
  }
}
