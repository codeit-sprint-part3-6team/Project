import instance from '../instance';

export interface PutInvitationsParams {
  invitationId: number;
  inviteAccepted: boolean;
}

export interface PutInvitationsResponse {
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

export default async function putInvitations(
  params: PutInvitationsParams,
): Promise<PutInvitationsResponse> {
  const { invitationId, inviteAccepted } = params;

  try {
    const { data } = await instance.put<PutInvitationsResponse>(
      `/11-6/invitations/${invitationId}`,
      { inviteAccepted },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    return data;
  } catch (error) {
    if (error.response) {
      console.log('API 응답 에러:', error.response.data);
    }
    throw new Error(
      error.response?.data?.message || '초대 응답에 실패했습니다.',
    );
  }
}
