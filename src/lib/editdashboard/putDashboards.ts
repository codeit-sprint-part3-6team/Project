import instance from '../instance';

interface PutDashboardsParams {
  title: string;
  color: string;
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

export default async function putDashboards(
  params: PutDashboardsParams,
): Promise<PutDashboardsResponse> {
  try {
    const { title, color, dashboardId } = params;

    const { data } = await instance.post<PutDashboardsResponse>(
      `/11-6/dashboards/${dashboardId}`,
      {
        title,
        color,
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
      throw new Error(
        error.response.data.message || '대시보드 수정에 실패했습니다.',
      );
    }
    throw new Error('대시보드 수정 중 문제가 발생했습니다.');
  }
}
