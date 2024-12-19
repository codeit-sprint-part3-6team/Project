import instance from '../instance';

interface GetDashboardsInvitationsParams {
  page: number;
  size: number;
  dashboardId: number;
}

interface GetDashboardsInvitationsResponse {
  totalCount: number;
  invitations: {
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
  };
}

export default async function postInvitations(
  params: GetDashboardsInvitationsParams,
): Promise<GetDashboardsInvitationsResponse> {
  try {
    const { data } = await instance.get<GetDashboardsInvitationsResponse>(
      `/11-6/members`,
      {
        params,
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
