import instance from '../instance';

interface PutDashboardsParams {
  dashboardId: number;
}

interface PutDashboardsResponse {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  craatedByMe: boolean;
  userId: number;
}

export default async function postInvitations(
  params: PutDashboardsParams,
): Promise<PutDashboardsResponse> {
  try {
    const { dashboardId } = params;

    const { data } = await instance.post<PutDashboardsResponse>(
      `/11-6/dashboards/{dashboardId}`,
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
