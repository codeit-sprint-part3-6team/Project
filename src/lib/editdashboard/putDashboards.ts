import instance from '../instance';

interface PutDashboardsParams {
  title: string;
  color: string;
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

export default async function putDashboards(
  params: PutDashboardsParams,
): Promise<PutDashboardsResponse> {
  try {
    const { title, color, dashboardId } = params;

    const { data } = await instance.put<PutDashboardsResponse>(
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
      console.log('API 응답 에러:', error.response.data);
    }
    throw new Error(
      error.response?.data?.message || '대시보드 수정에 실패했습니다.',
    );
  }
}
