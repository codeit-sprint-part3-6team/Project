import instance from '../instance';

interface GetDashboardsParams {
  cursorId?: number;
  page: number;
  size: number;
  navigationMethod: 'infiniteScroll' | 'pagination';
}

interface Dashboard {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

interface GetDashboardsResponse {
  cursorId: number | null;
  totalCount: number;
  dashboards: Dashboard[];
}

export default async function getDashboards(
  teamId: string,
  params: GetDashboardsParams,
): Promise<GetDashboardsResponse> {
  try {
    // 서버 요청
    const { data } = await instance.get<GetDashboardsResponse>(
      `/${teamId}/dashboards/`,
      {
        params: {
          ...params,
          navigationMethod: params.navigationMethod || 'infiniteScroll',
        },
      },
    );
    return data;
  } catch (error: any) {
    if (error.response) {
      console.error('API 응답 에러:', error.response.data);
    }
    throw new Error(
      error.response?.data?.message || '정보를 불러오는데 실패했습니다.',
    );
  }
}
