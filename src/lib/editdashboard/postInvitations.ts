import instance from '../instance';

interface PostInvitationsParams {
  dashboardId: number;
}

interface PostInvitationsResponse {
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
  color: string;
  createdAt: string;
  updatedAt: string;
}

export default async function postInvitations(
  params: PostInvitationsParams,
): Promise<PostInvitationsResponse> {
  try {
    const { dashboardId } = params;

    const { data } = await instance.post<PostInvitationsResponse>(
      `/11-6/dashboards/${dashboardId}/invitations`,
      {
        dashboardId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || '초대에 실패했습니다.');
    }
    throw new Error('초대 요청 중 문제가 발생했습니다.');
  }
}
