import instance from '../instance';

interface GetInvitationsParams {
  page: number;
  size: number;
  dashboardId: number;
}

interface GetInvitationsResponse {
  totalCount: number;
  invitations: Array<{
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
  }>;
}

export default async function getInvitations({
  page,
  size,
  dashboardId,
}: GetInvitationsParams): Promise<GetInvitationsResponse> {
  try {
    const { data } = await instance.get<GetInvitationsResponse>(
      `/11-6/dashboards/${dashboardId}/invitations`,
      {
        params: { page, size },
      },
    );
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || '초대목록 요청에 실패했습니다.',
      );
    }
    throw new Error('초대목록 요청 중 문제가 발생했습니다.');
  }
}
