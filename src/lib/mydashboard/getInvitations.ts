import instance from '../instance';

interface GetInvitationsParams {
  size: number;
  cursorId: number;
  title?: string;
}

interface GetInvitationsResponse {
  cursorId: number;
  invitations: Invitaion[];
}

interface Invitaion {
  id: number;
  inviter: {
    nickname: string;
    email: string;
    id: number;
  };
  dashboard: {
    title: string;
    id: number;
  };
  invitee: {
    nickname: string;
    email: string;
    id: number;
  };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export default async function getinvitations(
  params: GetInvitationsParams,
): Promise<GetInvitationsResponse> {
  try {
    const { data } = await instance.get<GetInvitationsResponse>(
      `/11-6/invitations/`,
      {
        params,
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
